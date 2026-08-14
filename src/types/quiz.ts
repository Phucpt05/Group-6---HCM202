export interface QuizOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface QuestionData {
  id: number;
  topic: string;
  question: string;
  options: QuizOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}
