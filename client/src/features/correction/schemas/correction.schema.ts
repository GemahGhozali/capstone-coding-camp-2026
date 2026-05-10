import { z } from "zod";

export const correctionSchema = z.object({
  question: z.string().min(1, "Soal essay wajib diisi!"),
  answerReferences: z.array(z.object({ value: z.string().min(1, "Referensi jawaban wajib diisi") })).min(1, "Minimal ada 1 referensi jawaban!"),
  gradedAnswer: z.string().min(1, "Jawaban yang ingin dikoreksi wajib diisi!"),
});

export type CorrectionFormValues = z.infer<typeof correctionSchema>;
