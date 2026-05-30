import { RelevanceLabel } from "../../generated/prisma/enums";

export const relevanceLabelMap: Record<string, string> = {
  SangatRelevan: "Sangat Relevan",
  CukupRelevan: "Cukup Relevan",
  TidakRelevan: "Tidak Relevan",
};

export interface AIResult {
  finalScore: number;
  similarityScore: number;
  relevanceLabel: RelevanceLabel;
  feedback: string;
}

export interface AnswerReference {
  id: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CorrectionResult {
  id: string;
  question: string;
  gradedAnswer: string;
  finalScore: number;
  similarityScore: number;
  relevanceLabel: string;
  feedback: string;
  answerReferences: AnswerReference[];
  createdAt: Date;
  updatedAt: Date;
}
