import React, { useMemo, useState } from "react";
import { HCM202_KNOWLEDGE_BASE, KnowledgeSegment } from "../../data/hcm202KnowledgeBase";
import { MINIGAME_QUESTIONS } from "../../data/minigameQuestions";
import { useReveal } from "../../hooks/useReveal";
import { QuestionData } from "../../types/quiz";
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
const ALL_CELL_INDEXES = Array.from({ length: 12 }, (_, index) => index);

export const HistoryPuzzleGame: React.FC<HistoryPuzzleGameProps> = ({ onOpenSource }) => {
  const reveal = useReveal<HTMLElement>(0.04);
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem("hcm202_minigame_unlocked") === "true");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [revealedCells, setRevealedCells] = useState<Set<number>>(() => new Set());
  const [activeQuestion, setActiveQuestion] = useState<QuestionData | null>(null);
  const [guessOpen, setGuessOpen] = useState(false);
  const [guessText, setGuessText] = useState("");
  const [guessError, setGuessError] = useState("");
  const [gameComplete, setGameComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const source = useMemo(() => HCM202_KNOWLEDGE_BASE.find((segment) => segment.id === "p152-1"), []);
  const progress = (revealedCells.size / MINIGAME_QUESTIONS.length) * 100;

  const unlockGame = (event: React.FormEvent) => {
    event.preventDefault();
    if (passwordInput.trim() !== "0") {
      setPasswordError("Mật khẩu chưa chính xác. Hãy sử dụng mật khẩu do nhóm thuyết trình cung cấp.");
      return;
    }
    sessionStorage.setItem("hcm202_minigame_unlocked", "true");
    setIsUnlocked(true);
    setPasswordError("");
  };

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
    setRevealedCells(new Set(ALL_CELL_INDEXES));
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
          <p className="body-copy">Vượt qua 12 câu hỏi, trong đó có 5 câu nâng cao, để từng bước khám phá sự kiện lịch sử ẩn sau bức ảnh.</p>
        </div>
        <div className="section-rule" />

        {!isUnlocked ? (
          <div className="history-game__lock">
            <p className="eyebrow">Khu vực có mật khẩu</p>
            <h3>Mở khóa minigame</h3>
            <p>Nhập mật khẩu do nhóm thuyết trình cung cấp để bắt đầu thử thách.</p>
            <form onSubmit={unlockGame}>
              <label htmlFor="minigame-password">Mật khẩu truy cập</label>
              <div>
                <input
                  id="minigame-password"
                  type="password"
                  value={passwordInput}
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={passwordError ? "minigame-password-error" : undefined}
                  onChange={(event) => {
                    setPasswordInput(event.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Nhập mật khẩu"
                  autoComplete="off"
                />
                <button className="outline-action" type="submit">Mở khóa</button>
              </div>
              <small>Gợi ý mật khẩu: <strong>0</strong></small>
              {passwordError && <p id="minigame-password-error" role="alert">{passwordError}</p>}
            </form>
          </div>
        ) : (
          <div className="history-game__workspace">
            <div className="puzzle-board" aria-label="Bàn ghép ảnh gồm 12 ô câu hỏi">
              <img src="/minigame/tong-tuyen-cu-1946.jpg" alt="Tư liệu lịch sử đang được che bởi 12 mảnh ghép" />
              <div className="puzzle-grid">
                {Array.from({ length: 12 }, (_, cellIndex) => {
                  const question = MINIGAME_QUESTIONS[cellIndex];
                  const isRevealed = revealedCells.has(cellIndex) || gameComplete;

                  return (
                    <button
                      type="button"
                      className={`puzzle-cell${isRevealed ? " is-revealed" : ""}`}
                      key={cellIndex}
                      disabled={isRevealed}
                      aria-label={isRevealed ? `Mảnh câu ${question.id} đã mở` : `Mở câu hỏi ${question.id}`}
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
                <span>Tiến độ thử thách</span>
                <strong>{revealedCells.size} / {MINIGAME_QUESTIONS.length}</strong>
              </div>
              <div className="history-game__progress" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>

              <div className="history-game__instructions">
                <p className="eyebrow">Cách chơi</p>
                <p>Mỗi ô chứa một câu hỏi. Năm câu nâng cao từ phần ôn tập được trộn xen kẽ trong bộ 12 câu; mỗi đáp án đúng mở một mảnh của bức ảnh.</p>
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
        )}
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
