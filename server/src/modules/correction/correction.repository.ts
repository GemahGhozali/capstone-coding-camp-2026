import prisma from "../../libs/prisma";
import { CorrectionInput } from "./correction.schema";
import { AIResult } from "./correction.type";

export async function findAllCorrections(userId: string) {
  return prisma.correction.findMany({
    where: { userId },
    select: {
      id: true,
      question: true,
      finalScore: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function findCorrectionById(id: string, userId: string) {
  return prisma.correction.findFirst({
    where: { id, userId },
    omit: { userId: true },
    include: {
      answerReferences: {
        omit: { correctionId: true },
      },
    },
  });
}

export async function createCorrection(userId: string, data: CorrectionInput, aiResult: AIResult) {
  return prisma.correction.create({
    data: {
      userId,
      question: data.question,
      gradedAnswer: data.gradedAnswer,
      finalScore: aiResult.finalScore,
      relevanceLabel: aiResult.relevanceLabel,
      feedback: aiResult.feedback,
      answerReferences: {
        create: data.answerReferences.map((answer) => ({ answer })),
      },
    },
    omit: { userId: true },
    include: {
      answerReferences: {
        omit: { correctionId: true },
      },
    },
  });
}

export async function updateCorrection(id: string, userId: string, data: CorrectionInput, aiResult: AIResult) {
  return prisma.correction.update({
    where: { id, userId },
    data: {
      question: data.question,
      gradedAnswer: data.gradedAnswer,
      finalScore: aiResult.finalScore,
      relevanceLabel: aiResult.relevanceLabel,
      feedback: aiResult.feedback,
      answerReferences: {
        deleteMany: {},
        create: data.answerReferences.map((answer) => ({ answer })),
      },
    },
    omit: { userId: true },
    include: {
      answerReferences: {
        omit: { correctionId: true },
      },
    },
  });
}

export async function deleteCorrection(id: string, userId: string) {
  return prisma.correction.delete({
    where: { id, userId },
  });
}
