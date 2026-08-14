import React from "react";
import { COLORS, shadow, navBtnStyle } from "../../constants/theme";
import { QUIZ_QUESTIONS } from "../../constants/quizData";

interface QuizViewProps {
  quizIdx: number;
  setQuizIdx: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswers: Record<number, string[]>;
  solvedQuestions: Record<number, boolean>;
  onSelectOption: (qIdx: number, optKey: "A" | "B" | "C" | "D") => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quizIdx,
  setQuizIdx,
  selectedAnswers,
  solvedQuestions,
  onSelectOption,
}) => {
  const currentQ = QUIZ_QUESTIONS[quizIdx];
  const qSolved = !!solvedQuestions[quizIdx];
  const qAttempts = selectedAnswers[quizIdx] || [];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "4.5vh 6vw 3.5vh", gap: 12, overflow: "hidden" }}>
      {/* Header của Quiz */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: `1px solid ${COLORS.line}`,
          paddingBottom: 12,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.redDeep, fontWeight: 700 }}>
            ÔN TẬP CỦNG CỐ KIẾN THỨC
          </span>
          <span style={{ fontSize: 11, color: COLORS.inkSoft }}>· {currentQ.topic}</span>
        </div>
        <span style={{ fontSize: 11.5, letterSpacing: "0.1em", color: COLORS.inkSoft, fontWeight: 600 }}>
          CÂU {String(quizIdx + 1).padStart(2, "0")} / {String(QUIZ_QUESTIONS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Vùng nội dung câu hỏi */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0, overflowY: "auto", paddingRight: 4 }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Question Badge & Title */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: COLORS.gold, fontWeight: 700, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
              <span>Câu hỏi {currentQ.id}</span>
              <span>·</span>
              <span>{currentQ.topic}</span>
            </div>
            <h3 className="font-serif" style={{ fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 600, lineHeight: 1.4, margin: 0, color: COLORS.ink }}>
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Options Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="grid-resp-2">
            {currentQ.options.map((opt) => {
              const isSelected = qAttempts.includes(opt.key);
              const isCorrect = opt.key === currentQ.correctAnswer;
              const isWrongAttempt = isSelected && !isCorrect;
              const isCorrectChosen = isSelected && isCorrect;

              let bgColor = COLORS.card;
              let borderColor = COLORS.line;
              let badgeBg = "rgba(32,36,31,0.06)";
              let badgeColor = COLORS.ink;

              if (isCorrectChosen) {
                bgColor = COLORS.greenCard;
                borderColor = COLORS.green;
                badgeBg = COLORS.green;
                badgeColor = "#fff";
              } else if (isWrongAttempt) {
                bgColor = COLORS.redLightCard;
                borderColor = COLORS.red;
                badgeBg = COLORS.red;
                badgeColor = "#fff";
              }

              return (
                <div
                  key={opt.key}
                  onClick={() => !qSolved && onSelectOption(quizIdx, opt.key)}
                  style={{
                    background: bgColor,
                    border: `1.5px solid ${borderColor}`,
                    borderRadius: 3,
                    padding: "14px 16px",
                    boxShadow: shadow,
                    cursor: qSolved ? "default" : "pointer",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    transition: "all 0.2s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!qSolved && !isWrongAttempt) {
                      e.currentTarget.style.borderColor = COLORS.gold;
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!qSolved && !isWrongAttempt) {
                      e.currentTarget.style.borderColor = borderColor;
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  <span
                    className="font-serif"
                    style={{
                      flexShrink: 0,
                      width: 24,
                      height: 24,
                      borderRadius: 2,
                      background: badgeBg,
                      color: badgeColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 12,
                      marginTop: 1,
                    }}
                  >
                    {isCorrectChosen ? "✓" : isWrongAttempt ? "✕" : opt.key}
                  </span>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: isWrongAttempt ? COLORS.redDeep : COLORS.ink, fontWeight: isCorrectChosen ? 600 : 400 }}>
                    {opt.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Thông báo chọn sai để chọn tiếp */}
          {!qSolved && qAttempts.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.redDeep, fontSize: 12.5, fontStyle: "italic", animation: "fadeSlideDown 0.25s ease" }}>
              <span>⚠️</span>
              <span>Đáp án bạn vừa chọn chưa chính xác. Bạn hãy tiếp tục chọn phương án khác!</span>
            </div>
          )}

          {/* Hộp Giải thích chi tiết khi trả lời đúng */}
          {qSolved && (
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.line}`,
                borderLeft: `4px solid ${COLORS.green}`,
                borderRadius: 3,
                padding: "16px 20px",
                boxShadow: shadow,
                animation: "fadeSlideDown 0.35s ease forwards",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.green, fontWeight: 700, fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                <span>✓ CHÍNH XÁC · GIẢI THÍCH CHI TIẾT</span>
              </div>
              <p style={{ margin: 0, fontSize: 13.2, lineHeight: 1.6, color: COLORS.inkSoft }}>
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Thanh điều khiển dưới cùng của Quiz */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 10,
          borderTop: `1px solid ${COLORS.line}`,
          flexShrink: 0,
        }}
      >
        {/* Bộ chọn câu hỏi nhanh */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: COLORS.inkSoft, marginRight: 4 }}>Câu hỏi:</span>
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isCurrent = idx === quizIdx;
            const isDone = !!solvedQuestions[idx];
            const hasTried = (selectedAnswers[idx] || []).length > 0;

            let bg = COLORS.card;
            let borderCol = COLORS.line;
            let textCol = COLORS.inkSoft;

            if (isCurrent) {
              borderCol = COLORS.red;
              textCol = COLORS.redDeep;
              bg = COLORS.goldCard;
            }
            if (isDone) {
              bg = COLORS.green;
              borderCol = COLORS.green;
              textCol = "#fff";
            } else if (hasTried) {
              borderCol = COLORS.red;
            }

            return (
              <button
                key={q.id}
                onClick={() => setQuizIdx(idx)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 3,
                  border: `1.2px solid ${borderCol}`,
                  background: bg,
                  color: textCol,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                {isDone ? "✓" : q.id}
              </button>
            );
          })}
        </div>

        {/* Nút lùi / tiến câu hỏi */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => setQuizIdx((prev) => Math.max(prev - 1, 0))}
            disabled={quizIdx === 0}
            style={{
              ...navBtnStyle,
              opacity: quizIdx === 0 ? 0.4 : 1,
              cursor: quizIdx === 0 ? "not-allowed" : "pointer",
            }}
          >
            ‹
          </button>

          {qSolved && quizIdx < QUIZ_QUESTIONS.length - 1 ? (
            <button
              onClick={() => setQuizIdx((prev) => prev + 1)}
              style={{
                background: COLORS.red,
                color: COLORS.paper,
                border: "none",
                borderRadius: 20,
                padding: "8px 18px",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: shadow,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>Câu tiếp theo</span>
              <span>→</span>
            </button>
          ) : (
            <button
              onClick={() => setQuizIdx((prev) => Math.min(prev + 1, QUIZ_QUESTIONS.length - 1))}
              disabled={quizIdx === QUIZ_QUESTIONS.length - 1}
              style={{
                ...navBtnStyle,
                opacity: quizIdx === QUIZ_QUESTIONS.length - 1 ? 0.4 : 1,
                cursor: quizIdx === QUIZ_QUESTIONS.length - 1 ? "not-allowed" : "pointer",
              }}
            >
              ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
