import React from "react";
import { COLORS } from "../../constants/theme";

interface TabHeaderProps {
  currentTab: "slides" | "quiz";
  isUnlocked: boolean;
  totalSolved: number;
  totalQuestions: number;
  onTabClick: (tab: "slides" | "quiz") => void;
}

export const TabHeader: React.FC<TabHeaderProps> = ({
  currentTab,
  isUnlocked,
  totalSolved,
  totalQuestions,
  onTabClick,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 14,
        right: "6vw",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(251,250,246,0.9)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${COLORS.line}`,
        padding: "4px 6px",
        borderRadius: 30,
        boxShadow: "0 4px 16px rgba(32,36,31,0.06)",
      }}
    >
      <button
        onClick={() => onTabClick("slides")}
        style={{
          background: currentTab === "slides" ? COLORS.red : "transparent",
          color: currentTab === "slides" ? COLORS.paper : COLORS.inkSoft,
          border: "none",
          borderRadius: 20,
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.2s ease",
        }}
      >
        <span>📊</span>
        <span>Trình chiếu</span>
      </button>

      <button
        onClick={() => onTabClick("quiz")}
        style={{
          background: currentTab === "quiz" ? COLORS.red : "transparent",
          color: currentTab === "quiz" ? COLORS.paper : COLORS.inkSoft,
          border: "none",
          borderRadius: 20,
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.2s ease",
        }}
      >
        <span>{isUnlocked ? "📝" : "🔒"}</span>
        <span>Ôn tập củng cố</span>
        {isUnlocked && (
          <span
            style={{
              fontSize: 10,
              background: currentTab === "quiz" ? "rgba(255,255,255,0.25)" : COLORS.goldCard,
              color: currentTab === "quiz" ? "#fff" : COLORS.redDeep,
              padding: "1px 6px",
              borderRadius: 10,
            }}
          >
            {totalSolved}/{totalQuestions}
          </span>
        )}
      </button>
    </div>
  );
};
