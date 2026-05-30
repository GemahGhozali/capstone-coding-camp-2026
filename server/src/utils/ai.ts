import Groq from "groq-sdk";
import { AIResult } from "../modules/correction/correction.type";
import { RelevanceLabel } from "../generated/prisma/enums";
import { CorrectionInput } from "../modules/correction/correction.schema";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function getRelevanceLabel(score: number): RelevanceLabel {
  if (score >= 76) return RelevanceLabel.SangatRelevan;
  if (score >= 41) return RelevanceLabel.CukupRelevan;
  return RelevanceLabel.TidakRelevan;
}

export async function generateAIResult(data: CorrectionInput): Promise<AIResult> {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `Kamu adalah sistem penilai essay otomatis yang objektif dan konsisten.
          Selalu response dengan JSON berikut tanpa teks tambahan apapun:
          {
            "finalScore": <integer 0-100>,
            "feedback": "<string 100 kata, evaluasi mendalam mencakup: kualitas jawaban secara keseluruhan, poin-poin yang berhasil dijawab, dan poin yang masih kurang>"
          }
          Gunakan EXACTLY nama field "finalScore" dan "feedback". Jangan gunakan nama field lain.
        `,
      },
      {
        role: "user",
        content: `
          Soal: ${data.question}

          Referensi Jawaban:
          ${data.answerReferences.map((answer, i) => `${i + 1}. ${answer}`).join("\n")}

          Jawaban Siswa: ${data.gradedAnswer}

          Tugas kamu:
          1. Bandingkan jawaban siswa dengan referensi jawaban yang diberikan
          2. Berikan skor akhir (0-100) berdasarkan kelengkapan dan ketepatan jawaban
          3. Berikan feedback yang menjelaskan kualitas jawaban, kelebihan, dan kekurangannya

          Aturan penilaian:
          - Skor 76-100: Jawaban mencakup sebagian besar atau semua poin penting dari referensi
          - Skor 41-75: Jawaban mencakup beberapa poin penting namun masih ada yang terlewat
          - Skor 0-40: Jawaban kurang relevan atau tidak mencakup poin penting dari referensi
        `,
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: 300,
    temperature: 0.2,
  });

  const text = response.choices[0]?.message.content!;
  const parsed: Pick<AIResult, "finalScore" | "feedback"> = JSON.parse(text);

  return { finalScore: parsed.finalScore, similarityScore: parsed.finalScore, relevanceLabel: getRelevanceLabel(parsed.finalScore), feedback: parsed.feedback };
}
