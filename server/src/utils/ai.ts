import { AIResult } from "../modules/correction/correction.type";
import { RelevanceLabel } from "../../prisma/generated/enums";

function getRelevanceLabel(score: number): RelevanceLabel {
  if (score >= 76) return RelevanceLabel.SangatRelevan;
  if (score >= 41) return RelevanceLabel.CukupRelevan;
  return RelevanceLabel.TidakRelevan;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const feedbacks = [
  "Jawaban sudah mencakup konsep utama dengan baik, namun kurang menyebutkan contoh konkret.",
  "Jawaban cukup relevan namun beberapa poin penting masih terlewat.",
  "Jawaban kurang mencakup inti dari pertanyaan yang diberikan.",
  "Jawaban sangat baik dan mencakup semua poin penting dengan jelas.",
  "Jawaban sudah benar namun perlu diperluas dengan penjelasan yang lebih detail.",
];

export function generateDummyAIResult(): AIResult {
  const finalScore = randomInt(0, 100);
  const similarityScore = finalScore >= 3 ? finalScore - 3 : finalScore;
  const relevanceLabel = getRelevanceLabel(finalScore);
  const feedback = feedbacks[randomInt(0, feedbacks.length - 1)] as string;

  return { finalScore, similarityScore, relevanceLabel, feedback };
}
