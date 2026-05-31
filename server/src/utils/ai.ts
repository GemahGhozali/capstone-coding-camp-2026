import axios from "axios";
import Groq from "groq-sdk";
import { AIResult } from "../modules/correction/correction.type";
import { RelevanceLabel } from "../generated/prisma/enums";
import { CorrectionInput } from "../modules/correction/correction.schema";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const aiModel = axios.create({ baseURL: process.env.AI_MODEL_REST_API_URL as string });

function getRelevanceLabel(score: number): RelevanceLabel {
  if (score >= 76) return RelevanceLabel.SangatRelevan;
  if (score >= 41) return RelevanceLabel.CukupRelevan;
  return RelevanceLabel.TidakRelevan;
}

async function gradeWithModel(data: CorrectionInput): Promise<{ score: number; similarity: number }> {
  const response = await aiModel.post("/grade", {
    reference_answer: data.answerReferences.join(", "),
    student_answer: data.gradedAnswer,
  });

  return { score: response.data.score, similarity: response.data.similarity };
}

async function generateFeedback(data: CorrectionInput, score: number): Promise<string> {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an objective and consistent automated essay grading system. Your task is to provide feedback in Bahasa Indonesia based on the essay question, reference answers, student answer, and the score given. Provide detailed feedback of 50 words covering: overall answer quality, points that were successfully addressed, and points that are still lacking. Response with plain text only, no JSON, no markdown.`,
      },
      {
        role: "user",
        content: `
          Question: ${data.question}
          Reference Answers:
          ${data.answerReferences.map((answer, i) => `${i + 1}. ${answer}`).join("\n")}
          Student Answer: ${data.gradedAnswer}
          Score given: ${score}/100
          Provide feedback in Bahasa Indonesia based on the information above.
        `,
      },
    ],
    max_tokens: 100,
    temperature: 0.2,
  });

  return response.choices[0]?.message.content!;
}

export async function generateAIResult(data: CorrectionInput): Promise<AIResult> {
  const modelResult = await gradeWithModel(data);
  const feedback = await generateFeedback(data, modelResult.score);

  return {
    finalScore: modelResult.score,
    similarityScore: Math.round(modelResult.similarity * 100),
    relevanceLabel: getRelevanceLabel(modelResult.score),
    feedback,
  };
}
