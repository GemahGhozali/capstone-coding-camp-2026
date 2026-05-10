import api from "@/libs/axios";
import type { RegisterFormValues } from "../schemas/register.schema";
import type { LoginFormValues } from "../schemas/login.schema";
import type { AuthResponse, User } from "../types/auth.type";

export async function register(data: RegisterFormValues): Promise<AuthResponse> {
  const response = await api.post("/auth/register", data);
  return response.data.data;
}

export async function login(data: LoginFormValues): Promise<AuthResponse> {
  const response = await api.post("/auth/login", data);
  return response.data.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function refreshToken(): Promise<{ accessToken: string }> {
  const response = await api.post("/auth/refresh");
  return response.data.data;
}

export async function verifyUserAuthentication(): Promise<User> {
  const response = await api.get("/auth/verify");
  return response.data.data;
}
