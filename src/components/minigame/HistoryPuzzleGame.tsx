import React, { useMemo, useState } from "react";
import { HCM202_KNOWLEDGE_BASE, KnowledgeSegment } from "../../data/hcm202KnowledgeBase";
import { MINIGAME_QUESTIONS, MinigameQuestion } from "../../data/minigameQuestions";
import { useReveal } from "../../hooks/useReveal";
import { MinigameQuestionDialog } from "./MinigameQuestionDialog";
import { MinigameResultDialog } from "./MinigameResultDialog";

interface HistoryPuzzleGameProps {
  onOpenSource: (segment: KnowledgeSegment) => void;
}

const normalizeGuess = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/đ/g, "d")
  .trim();

const guessKeywords = ["tong tuyen cu", "6/1/1946", "06/01/1946", "quoc hoi dau tien", "1946"];

export const HistoryPuzzleGame: React.FC<HistoryPuzzleGameProps> = ({ onOpenSource }) => {
  const reveal = useReveal<HTMLElement>(0.04);
  const [revealedCells, setRevealedCells] = useState<Set<number>>(() => new Set());
  const [activeQuestion, setActiveQuestion] = useState<MinigameQuestion | null>(null);
  const [guessOpen, setGuessOpen] = useState(false);
  const [guessText, setGuessText] = useState("");
  const [guessError, setGuessError] = useState("");
  const [gameComplete, setGameComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const source = useMemo(() => HCM202_KNOWLEDGE_BASE.find((segment) => segment.id === "p152-1"), []);
  const progress = (revealedCells.size / MINIGAME_QUESTIONS.length) * 100;

  const revealActiveCell = () => {
    if (!activeQuestion) return;
    const cellIndex = activeQuestion.id - 1;
    setRevealedCells((current) => {
      const next = new Set(current).add(cellIndex);
      if (next.size === MINIGAME_QUESTIONS.length) setGameComplete(true);
      return next;
    });
    setActiveQuestion(null);
  };

  const submitGuess = (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = normalizeGuess(guessText);
    if (!guessKeywords.some((keyword) => normalized.includes(keyword))) {
      setGuessError("Chưa đúng. Hãy mở thêm mảnh ghép và thử lại.");
      return;
    }
    setRevealedCells(new Set(MINIGAME_QUESTIONS.map((_, index) => index)));
    setGuessError("");
    setGuessOpen(false);
    setGameComplete(true);
  };

  const resetGame = () => {
    setRevealedCells(new Set());
    setActiveQuestion(null);
    setGuessOpen(false);
    setGuessText("");
    setGuessError("");
    setGameComplete(false);
    setShowResult(false);
  };

  return (
    <section
      ref={reveal.ref}
      id="minigame"
      className={`section-block history-game-section reveal${reveal.isVisible ? " is-visible" : ""}`}
      aria-labelledby="history-game-title"
    >
      <div className="content-wrap">
        <div className="history-game__heading">
          <div>
            <p className="eyebrow">Minigame củng cố</p>
            <h2 id="history-game-title" className="section-heading">Lật mảnh ghép: Hành trình vì dân</h2>
          </div>
          <p className="body-copy">Trả lời 12 câu hỏi để từng bước khám phá sự kiện lịch sử ẩn sau bức ảnh.</p>
        </div>
        <div className="section-rule" />

        <div className="history-game__workspace">
          <div className="puzzle-board" aria-label="Bàn ghép ảnh gồm 12 câu hỏi">
            <img src="/minigame/tong-tuyen-cu-1946.jpg" alt="Tư liệu lịch sử đang được che bởi 12 mảnh ghép" />
            <div className="puzzle-grid">
              {MINIGAME_QUESTIONS.map((question, index) => {
                const isRevealed = revealedCells.has(index) || gameComplete;
                return (
                  <button
                    type="button"
                    className={`puzzle-cell${isRevealed ? " is-revealed" : ""}`}
                    key={question.id}
                    disabled={isRevealed}
                    aria-label={isRevealed ? `Mảnh ${question.id} đã mở` : `Mở câu hỏi ${question.id}`}
                    aria-pressed={isRevealed}
                    onClick={() => setActiveQuestion(question)}
                  >
                    <span className="puzzle-cell__cover">
                      <small>Câu</small>
                      <strong>{String(question.id).padStart(2, "0")}</strong>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="history-game__panel">
            <div className="history-game__progress-label">
              <span>Tiến độ khám phá</span>
              <strong>{revealedCells.size} / {MINIGAME_QUESTIONS.length}</strong>
            </div>
            <div className="history-game__progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="history-game__instructions">
              <p className="eyebrow">Cách chơi</p>
              <p>Chọn một mảnh, trả lời đúng câu hỏi và mở phần ảnh tương ứng. Bạn có thể đoán sự kiện trước khi mở hết.</p>
            </div>

            {!gameComplete ? (
              <>
                <button className="text-link" type="button" aria-expanded={guessOpen} onClick={() => setGuessOpen((open) => !open)}>
                  {guessOpen ? "Đóng phần dự đoán" : "Đoán sự kiện lịch sử"}
                </button>
                {guessOpen && (
                  <form className="history-game__guess" onSubmit={submitGuess}>
                    <label htmlFor="history-guess">Tên sự kiện hoặc mốc thời gian</label>
                    <div>
                      <input
                        id="history-guess"
                        value={guessText}
                        onChange={(event) => {
                          setGuessText(event.target.value);
                          setGuessError("");
                        }}
                        placeholder="Nhập dự đoán"
                      />
                      <button className="outline-action" type="submit">Xác nhận</button>
                    </div>
                    {guessError && <p role="alert">{guessError}</p>}
                    <small>Gợi ý: sự kiện thể hiện quyền làm chủ của nhân dân.</small>
                  </form>
                )}
              </>
            ) : (
              <div className="history-game__complete" aria-live="polite">
                <p className="eyebrow">Đã hoàn thành</p>
                <h3>Bức ảnh lịch sử đã được mở</h3>
                <button className="outline-action" type="button" onClick={() => setShowResult(true)}>Xem đáp án và ý nghĩa</button>
              </div>
            )}
          </aside>
        </div>
      </div>

      {activeQuestion && (
        <MinigameQuestionDialog
          key={activeQuestion.id}
          question={activeQuestion}
          onCorrect={revealActiveCell}
          onClose={() => setActiveQuestion(null)}
        />
      )}
      {showResult && (
        <MinigameResultDialog
          source={source}
          onClose={() => setShowResult(false)}
          onReset={resetGame}
          onOpenSource={onOpenSource}
        />
      )}
    </section>
  );
};
