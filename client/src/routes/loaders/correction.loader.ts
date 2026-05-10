import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { authUserQueryOptions } from "@/features/auth";
import { correctionHistoryQueryOptions, correctionDetailsQueryOptions } from "@/features/correction";
import queryClient from "@/libs/queryClient";

export async function correctionHistoryLoader() {
  const user = await queryClient.ensureQueryData(authUserQueryOptions());
  if (!user) return redirect("/auth/login");
  return await queryClient.ensureQueryData(correctionHistoryQueryOptions());
}

export async function correctionDetailsLoader({ params }: LoaderFunctionArgs) {
  const user = await queryClient.ensureQueryData(authUserQueryOptions());
  if (!user) return redirect("/auth/login");

  if (!params.correctionId) throw new Error("ID tidak ditemukan");
  return await queryClient.ensureQueryData(correctionDetailsQueryOptions(params.correctionId));
}
