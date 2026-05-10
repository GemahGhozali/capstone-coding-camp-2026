import toast from "react-hot-toast";
import queryClient from "@/libs/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createCorrection, deleteCorrection, updateCorrection } from "./correction.services";
import { correctionQueryKeys } from "./correction.queries";
import type { CorrectionFormValues } from "../schemas/correction.schema";

export function useCreateCorrection() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CorrectionFormValues) => createCorrection(data),
    onSuccess: (data) => {
      const newCorrectionHistory = {
        id: data.id,
        question: data.question,
        finalScore: data.finalScore,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      // Update correction history
      queryClient.setQueryData(correctionQueryKeys.history, (prevHistory: any) => [newCorrectionHistory, ...(prevHistory ?? [])]);

      // Add new correction data to cache
      queryClient.setQueryData(correctionQueryKeys.details(data.id), data);

      navigate(`/correction/${data.id}`);

      toast.success("Koreksi essay berhasil!");
    },
  });
}

export function useUpdateCorrection(id: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CorrectionFormValues) => updateCorrection(id, data),
    onSuccess: (data) => {
      const updatedCorrectionHistory = {
        id: data.id,
        question: data.question,
        finalScore: data.finalScore,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      // Update correction history
      queryClient.setQueryData(correctionQueryKeys.history, (prevHistory: any) => {
        return prevHistory?.map((history: any) => (history.id === id ? { ...history, ...updatedCorrectionHistory } : history)) ?? [];
      });

      // Update correction details
      queryClient.setQueryData(correctionQueryKeys.details(id), data);

      navigate(`/correction/${data.id}`);

      toast.success("Koreksi ulang essay berhasil!");
    },
  });
}

export function useDeleteCorrection() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => deleteCorrection(id),
    onSuccess: (_, correctionId) => {
      // Delete correction from existing correction history
      queryClient.setQueryData(correctionQueryKeys.history, (prevHistory: any[]) => {
        return prevHistory?.filter((item) => item.id !== correctionId) ?? [];
      });

      queryClient.invalidateQueries({ queryKey: correctionQueryKeys.history });

      navigate("/correction");

      toast.success("Koreksi berhasil dihapus!");
    },
  });
}
