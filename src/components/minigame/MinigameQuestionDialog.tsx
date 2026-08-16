import React, { useEffect, useState } from "react";
import { QuestionData, QuizOption } from "../../types/quiz";

interface MinigameQuestionDialogProps {
  question: QuestionData;
  onCorrect: () => void;
  onClose: () => void;
}

export const MinigameQuestionDialog: React.FC<MinigameQuestionDialogProps> = ({ question, onCorrect, onClose }) => {
  const [wrongAttempts, setWrongAttempts] = useState<Set<QuizOption["key"]>>(() => new Set());
  const [correctAnswer, setCorrectAnswer] = useState<QuizOption["key"] | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const chooseAnswer = (key: QuizOption["key"]) => {
    if (correctAnswer !== null || wrongAttempts.has(key)) return;
    if (key === question.correctAnswer) {
      setCorrectAnswer(key);
      return;
    }
    setWrongAttempts((current) => new Set(current).add(key));
  };

  return (
    <div className="minigame-modal" role="dialog" aria-modal="true" aria-labelledby="minigame-question-title" onClick={onClose}>
      <div className="minigame-dialog" onClick={(event) => event.stopPropagation()}>
        <header className="minigame-dialog__header">
          <div>
            <p className="eyebrow">Câu {String(question.id).padStart(2, "0")} · {question.topic}</p>
            <h3 id="minigame-question-title">{question.question}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng câu hỏi">×</button>
        </header>

        <div className="minigame-options" role="group" aria-label={`Các phương án câu ${question.id}`}>
          {question.options.map((option) => {
            const isWrong = wrongAttempts.has(option.key);
            const isCorrect = correctAnswer === option.key;
            return (
              <button
                type="button"
                key={option.key}
                className={`minigame-option${isWrong ? " is-wrong" : ""}${isCorrect ? " is-correct" : ""}`}
                disabled={correctAnswer !== null || isWrong}
                aria-pressed={isWrong || isCorrect}
                onClick={() => chooseAnswer(option.key)}
              >
                <span><b>{option.key}.</b> {option.text}</span>
                {isWrong && <strong>Chưa chính xác</strong>}
                {isCorrect && <strong>Đáp án đúng</strong>}
              </button>
            );
          })}
        </div>

        <footer className={`minigame-dialog__feedback${correctAnswer !== null ? " is-correct" : ""}`} aria-live="polite">
          {correctAnswer !== null ? (
            <>
              <div>
                <strong>Chính xác</strong>
                <p>{question.explanation}</p>
              </div>
              <button className="outline-action" type="button" onClick={onCorrect}>Mở mảnh ghép</button>
            </>
          ) : wrongAttempts.size > 0 ? (
            <div>
              <strong>Thử lại</strong>
              <p>Đối chiếu các khái niệm trọng tâm và chọn một phương án khác.</p>
            </div>
          ) : (
            <p>Chọn một phương án. Bạn có thể thử lại nếu trả lời chưa đúng.</p>
          )}
        </footer>
      </div>
    </div>
  );
};
