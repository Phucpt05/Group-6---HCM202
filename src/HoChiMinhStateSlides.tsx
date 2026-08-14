import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { COLORS } from "./constants/theme";
import { QUIZ_QUESTIONS } from "./constants/quizData";
import { createSlides, DIALECTIC_SLIDE_INDICES } from "./components/slides/slidesList";
import { SlidesView } from "./components/slides/SlidesView";
import { QuizView } from "./components/quiz/QuizView";
import { PasswordModal } from "./components/quiz/PasswordModal";
import { TabHeader } from "./components/navigation/TabHeader";

export default function HoChiMinhStateSlides() {
  // Navigation tabs: 'slides' hoặc 'quiz'
  const [currentTab, setCurrentTab] = useState<"slides" | "quiz">("slides");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  // Slide presentation state
  const [slideIdx, setSlideIdx] = useState<number>(0);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
  const [solvedQuestions, setSolvedQuestions] = useState<Record<number, boolean>>({});

  const totalSlides = 14;

  const revealCurrentAnswer = useCallback((idx: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: true }));
  }, []);

  // Tạo danh sách 14 slides
  const slides = useMemo(
    () => createSlides(revealedAnswers, revealCurrentAnswer),
    [revealedAnswers, revealCurrentAnswer]
  );

  // Xử lý tiến tới: mở đáp án phản biện trước nếu chưa mở, sau đó mới sang slide kế tiếp
  const handleNext = useCallback(() => {
    if (DIALECTIC_SLIDE_INDICES.includes(slideIdx) && !revealedAnswers[slideIdx]) {
      revealCurrentAnswer(slideIdx);
    } else {
      setSlideIdx((prev) => Math.min(prev + 1, totalSlides - 1));
    }
  }, [slideIdx, revealedAnswers, revealCurrentAnswer, totalSlides]);

  // Xử lý lùi lại: ẩn đáp án phản biện nếu đang mở, sau đó mới lùi slide
  const handlePrev = useCallback(() => {
    if (DIALECTIC_SLIDE_INDICES.includes(slideIdx) && revealedAnswers[slideIdx]) {
      setRevealedAnswers((prev) => ({ ...prev, [slideIdx]: false }));
    } else {
      setSlideIdx((prev) => Math.max(prev - 1, 0));
    }
  }, [slideIdx, revealedAnswers]);

  const goToSlide = useCallback((targetIdx: number) => {
    if (targetIdx >= 0 && targetIdx < totalSlides) {
      setSlideIdx(targetIdx);
    }
  }, [totalSlides]);

  // Xử lý chuyển tab
  const handleTabClick = (tab: "slides" | "quiz") => {
    if (tab === "slides") {
      setCurrentTab("slides");
    } else {
      if (isUnlocked) {
        setCurrentTab("quiz");
      } else {
        setShowPasswordModal(true);
        setPasswordInput("");
        setPasswordError("");
      }
    }
  };

  // Xác thực mật mã ...
  const handlePasswordSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput.trim() === "0407") {
      setIsUnlocked(true);
      setShowPasswordModal(false);
      setCurrentTab("quiz");
      setPasswordError("");
    } else {
      setPasswordError("Mật khẩu không chính xác! Vui lòng nhập đúng mật mã (0407).");
    }
  };

  // Xử lý chọn đáp án ôn tập
  const handleOptionSelect = (qIdx: number, optKey: "A" | "B" | "C" | "D") => {
    const currentQ = QUIZ_QUESTIONS[qIdx];
    const prevAttempts = selectedAnswers[qIdx] || [];

    if (prevAttempts.includes(optKey) && optKey !== currentQ.correctAnswer) {
      return;
    }

    const nextAttempts = [...prevAttempts, optKey];
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: nextAttempts }));

    if (optKey === currentQ.correctAnswer) {
      setSolvedQuestions((prev) => ({ ...prev, [qIdx]: true }));
    }
  };

  // Bắt sự kiện bàn phím
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showPasswordModal) return;

      if (currentTab === "slides") {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          handleNext();
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        }
      } else if (currentTab === "quiz") {
        if (e.key === "ArrowRight" && quizIdx < QUIZ_QUESTIONS.length - 1) {
          e.preventDefault();
          setQuizIdx((prev) => prev + 1);
        }
        if (e.key === "ArrowLeft" && quizIdx > 0) {
          e.preventDefault();
          setQuizIdx((prev) => prev - 1);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentTab, handleNext, handlePrev, quizIdx, showPasswordModal]);

  // Cảm ứng vuốt chạm
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
    if (currentTab === "slides") {
      if (dx > 50) handlePrev();
      if (dx < -50) handleNext();
    } else {
      if (dx > 50 && quizIdx > 0) setQuizIdx((prev) => prev - 1);
      if (dx < -50 && quizIdx < QUIZ_QUESTIONS.length - 1) setQuizIdx((prev) => prev + 1);
    }
    touchStartXRef.current = null;
  };

  const totalSolved = Object.values(solvedQuestions).filter(Boolean).length;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: COLORS.paper,
        color: COLORS.ink,
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        * { box-sizing: border-box; }
        @import url('https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Literata', serif; }
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .shake-anim {
          animation: shake 0.35s ease-in-out;
        }
        @media (max-width: 820px) {
          .grid-resp-3, .grid-resp-2, .split-resp, .duo-resp { grid-template-columns: 1fr !important; }
          .dialectic-resp {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>

      {/* Thanh tiến trình trên cùng */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 3,
          background: COLORS.red,
          zIndex: 6,
          transition: "width .4s cubic-bezier(0.4, 0, 0.2, 1)",
          width:
            currentTab === "slides"
              ? `${((slideIdx + 1) / totalSlides) * 100}%`
              : `${((quizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
        }}
      />

      {/* Nút chuyển đổi Tab */}
      <TabHeader
        currentTab={currentTab}
        isUnlocked={isUnlocked}
        totalSolved={totalSolved}
        totalQuestions={QUIZ_QUESTIONS.length}
        onTabClick={handleTabClick}
      />

      {/* View Trình chiếu */}
      {currentTab === "slides" && (
        <SlidesView
          slides={slides}
          idx={slideIdx}
          total={totalSlides}
          goToSlide={goToSlide}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      )}

      {/* View Ôn tập */}
      {currentTab === "quiz" && isUnlocked && (
        <QuizView
          quizIdx={quizIdx}
          setQuizIdx={setQuizIdx}
          selectedAnswers={selectedAnswers}
          solvedQuestions={solvedQuestions}
          onSelectOption={handleOptionSelect}
        />
      )}

      {/* Modal Mật mã */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
      />
    </div>
  );
}
