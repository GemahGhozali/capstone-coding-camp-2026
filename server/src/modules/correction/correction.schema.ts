import { z } from "zod";

const answerReferenceSchema = z.string().min(1, "Referensi jawaban tidak boleh ada yang kosong!");

export const correctionSchema = z.object({
  question: z.string("Soal essay wajib diisi!"),
  gradedAnswer: z.string("Jawaban yang ingin dikoreksi wajib diisi!"),
  answerReferences: z.array(answerReferenceSchema, "Referensi jawaban harus berupa array!").min(1, "Minimal ada 1 referensi jawaban!"),
});

export type CorrectionInput = z.infer<typeof correctionSchema>;
