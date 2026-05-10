import axios from "axios";
import useAuthStore from "@/stores/auth.store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (Attach access token to every request)
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Flag to prevent multiple refresh token request
let isRefreshing = false;
let failedRequestQueue: { resolve: (token: string) => void; reject: (error: unknown) => void }[] = [];

// Process the queue of failed requests after token refresh succeeds or fails
function processQueue(error: unknown, token: string | null) {
  failedRequestQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token!);
    }
  });
  failedRequestQueue = [];
}

// Response interceptor (Handling refresh token request automatically and retry logic)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.error?.code;
    const status = error.response?.status;

    // Reject all other errors immediately except 401 TOKEN_EXPIRED errors
    if (status !== 401 || errorCode !== "TOKEN_EXPIRED") {
      return Promise.reject(error.response.data);
    }

    // Reject if refresh token request is failed (Refresh token is invalid/expired)
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // Queue failed requests if token refresh is already in progress
    // This ensures only ONE refresh token request is sent even if multiple requests fail simultaneously
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    // Begin refresh token request process
    isRefreshing = true;

    try {
      // Send refresh token request to server
      const response = await axiosInstance.post("/auth/refresh");
      const newAccessToken = response.data.data.accessToken;

      // Save new access token to auth store
      useAuthStore.getState().setAccessToken(newAccessToken);

      // Update header Authorization with new access token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Process all queued requests with the new token
      processQueue(null, newAccessToken);

      // Retry the original failed request
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // If refresh fails, reject all queued requests
      processQueue(refreshError, null);

      // Clear user and access token state inside auth store
      useAuthStore.getState().clearAuth();

      // Redirect to login page
      window.location.href = "/auth/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
