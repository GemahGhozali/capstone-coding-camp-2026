import { CorrectionInput } from "./correction.schema";
import { CorrectionResult, relevanceLabelMap } from "./correction.type";
import * as CorrectionRepository from "./correction.repository";
import { generateAIResult } from "../../utils/ai";
import { NotFoundError } from "../../utils/error";

export async function getAllCorrections(userId: string) {
  return CorrectionRepository.findAllCorrections(userId);
}

export async function getCorrectionById(id: string, userId: string): Promise<CorrectionResult> {
  const correction = await CorrectionRepository.findCorrectionById(id, userId);
  if (!correction) throw new NotFoundError("Data koreksi tidak ditemukan");
  return formatCorrectionRelevanceLabel(correction);
}

export async function createCorrection(userId: string, data: CorrectionInput): Promise<CorrectionResult> {
  const aiResult = await generateAIResult(data);
  const correction = await CorrectionRepository.createCorrection(userId, data, aiResult);
  return formatCorrectionRelevanceLabel(correction);
}

export async function updateCorrection(id: string, userId: string, data: CorrectionInput): Promise<CorrectionResult> {
  const correction = await CorrectionRepository.findCorrectionById(id, userId);
  if (!correction) throw new NotFoundError("Data koreksi tidak ditemukan");

  const aiResult = await generateAIResult(data);
  const updatedCorrection = await CorrectionRepository.updateCorrection(id, userId, data, aiResult);
  return formatCorrectionRelevanceLabel(updatedCorrection);
}

export async function deleteCorrection(id: string, userId: string): Promise<void> {
  const correction = await CorrectionRepository.findCorrectionById(id, userId);
  if (!correction) throw new NotFoundError("Data koreksi tidak ditemukan");
  await CorrectionRepository.deleteCorrection(id, userId);
}

function formatCorrectionRelevanceLabel(correction: CorrectionResult): CorrectionResult {
  const relevanceLabel = relevanceLabelMap[correction.relevanceLabel] as string;
  return { ...correction, relevanceLabel };
}
