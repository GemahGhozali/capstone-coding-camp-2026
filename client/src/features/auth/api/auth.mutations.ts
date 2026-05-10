import toast from "react-hot-toast";
import queryClient from "@/libs/queryClient";
import useAuthStore from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, logout, register } from "../api/auth.services";
import { authQueryKeys } from "./auth.queries";
import type { RegisterFormValues } from "../schemas/register.schema";
import type { LoginFormValues } from "../schemas/login.schema";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterFormValues) => register(data),
    onSuccess: async (data) => {
      useAuthStore.getState().setAccessToken(data.accessToken);
      useAuthStore.getState().setUser(data.user);

      queryClient.setQueryData(authQueryKeys.user, data.user);

      navigate("/correction");

      toast.success("Registrasi Berhasil!");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginFormValues) => login(data),
    onSuccess: async (data) => {
      useAuthStore.getState().setAccessToken(data.accessToken);
      useAuthStore.getState().setUser(data.user);

      queryClient.setQueryData(authQueryKeys.user, data.user);

      navigate("/correction");

      toast.success("Login Berhasil!");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      clearAuth();
      await navigate("/auth/login");
      queryClient.clear();
    },
  });
}
