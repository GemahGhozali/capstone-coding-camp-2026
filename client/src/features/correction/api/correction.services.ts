import api from "@/libs/axios";
import type { CorrectionFormValues } from "../schemas/correction.schema";
import type { CorrectionHistory, CorrectionDetail } from "../types/correction.type";

function toRequestPayload(data: CorrectionFormValues) {
  return {
    question: data.question,
    gradedAnswer: data.gradedAnswer,
    answerReferences: data.answerReferences.map((answer) => answer.value),
  };
}

export async function getCorrections(): Promise<CorrectionHistory[]> {
  const response = await api.get("/corrections");
  return response.data.data;
}

export async function getCorrectionById(id: string): Promise<CorrectionDetail> {
  const response = await api.get(`/corrections/${id}`);
  return response.data.data;
}

export async function createCorrection(data: CorrectionFormValues): Promise<CorrectionDetail> {
  const response = await api.post("/corrections", toRequestPayload(data));
  return response.data.data;
}

export async function updateCorrection(id: string, data: CorrectionFormValues): Promise<CorrectionDetail> {
  const response = await api.put(`/corrections/${id}`, toRequestPayload(data));
  return response.data.data;
}

export async function deleteCorrection(id: string): Promise<void> {
  await api.delete(`/corrections/${id}`);
}
