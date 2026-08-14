import React, { useState } from "react";
import { QUIZ_QUESTIONS } from "../../constants/quizData";
import { useReveal } from "../../hooks/useReveal";

export const ReviewSection: React.FC = () => {
  const reveal = useReveal<HTMLElement>(0.08);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState<Record<number, string[]>>({});
  const [solved, setSolved] = useState<Record<number, boolean>>({});
  const question = QUIZ_QUESTIONS[questionIndex];
  const currentAttempts = attempts[questionIndex] ?? [];
  const isSolved = Boolean(solved[questionIndex]);

  const selectOption = (key: "A" | "B" | "C" | "D") => {
    if (isSolved || currentAttempts.includes(key)) return;
    setAttempts((current) => ({ ...current, [questionIndex]: [...currentAttempts, key] }));
    if (key === question.correctAnswer) {
      setSolved((current) => ({ ...current, [questionIndex]: true }));
    }
  };

  return (
    <section
      ref={reveal.ref}
      id="on-tap"
      className={`section-block review-section reveal${reveal.isVisible ? " is-visible" : ""}`}
      aria-labelledby="review-title"
    >
      <div className="content-wrap">
        <div className="review-intro">
          <div>
            <p className="eyebrow">Ôn tập kiến thức</p>
            <h2 id="review-title" className="section-heading">Kiểm tra mức độ nắm bài</h2>
          </div>
          <p className="body-copy">
            Hệ thống câu hỏi củng cố được xây dựng từ nội dung giáo trình và phần chuyên đề. Chọn phương án để nhận phản hồi và phần giải thích đối chiếu.
          </p>
        </div>

        <div className="quiz-workspace">
          <div className="quiz-meta">
            <span>Câu {String(questionIndex + 1).padStart(2, "0")} / {String(QUIZ_QUESTIONS.length).padStart(2, "0")}</span>
            <span>{question.topic}</span>
            <span>Đã hoàn thành {Object.keys(solved).length}/{QUIZ_QUESTIONS.length}</span>
          </div>

          <div className="quiz-question">
            <div>
              <p className="eyebrow">Câu hỏi {question.id}</p>
              <h3>{question.question}</h3>
            </div>

            <div>
              <div className="quiz-options" role="group" aria-label={`Các lựa chọn cho câu ${question.id}`}>
                {question.options.map((option) => {
                  const selected = currentAttempts.includes(option.key);
                  const correct = selected && option.key === question.correctAnswer;
                  const wrong = selected && !correct;
                  return (
                    <button
                      className={`quiz-option${correct ? " is-correct" : ""}${wrong ? " is-wrong" : ""}`}
                      type="button"
                      key={option.key}
                      disabled={isSolved}
                      onClick={() => selectOption(option.key)}
                    >
                      <span className="quiz-option__key">{option.key}</span>
                      <span className="quiz-option__text">{option.text}</span>
                      {correct && <span className="quiz-option__status">Chính xác</span>}
                      {wrong && <span className="quiz-option__status">Chưa chính xác</span>}
                    </button>
                  );
                })}
              </div>

              {currentAttempts.length > 0 && (
                <div className={`quiz-feedback${isSolved ? " is-correct" : ""}`} aria-live="polite">
                  <strong>{isSolved ? "Chính xác · Giải thích" : "Chưa chính xác"}</strong>
                  <p>{isSolved ? question.explanation : "Phương án vừa chọn chưa đúng. Hãy tiếp tục đối chiếu và chọn một phương án khác."}</p>
                </div>
              )}
            </div>
          </div>

          <div className="quiz-controls">
            <div className="quiz-dots" aria-label="Chuyển nhanh câu hỏi">
              {QUIZ_QUESTIONS.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  className={`quiz-dot${index === questionIndex ? " is-current" : ""}${solved[index] ? " is-solved" : ""}`}
                  onClick={() => setQuestionIndex(index)}
                  aria-label={`Câu ${item.id}${solved[index] ? ", đã hoàn thành" : ""}`}
                >
                  {item.id}
                </button>
              ))}
            </div>
            <div className="quiz-nav">
              <button className="outline-action" type="button" disabled={questionIndex === 0} onClick={() => setQuestionIndex((index) => Math.max(0, index - 1))}>Câu trước</button>
              <button className="outline-action" type="button" disabled={questionIndex === QUIZ_QUESTIONS.length - 1} onClick={() => setQuestionIndex((index) => Math.min(QUIZ_QUESTIONS.length - 1, index + 1))}>Câu sau</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
