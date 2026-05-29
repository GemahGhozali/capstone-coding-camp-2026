export interface CorrectionHistory {
  id: string;
  question: string;
  finalScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface AnswerReference {
  id: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface CorrectionDetail {
  id: string;
  question: string;
  gradedAnswer: string;
  finalScore: number;
  relevanceLabel: string;
  feedback: string;
  answerReferences: AnswerReference[];
  createdAt: string;
  updatedAt: string;
}
