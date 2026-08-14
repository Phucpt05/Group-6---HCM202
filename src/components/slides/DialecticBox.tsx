import React from "react";
import { COLORS, shadow } from "../../constants/theme";

export const DialecticBox: React.FC<{
  question: string;
  answer: string;
  isRevealed: boolean;
  onReveal: () => void;
}> = ({ question, answer, isRevealed, onReveal }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8, overflowY: "auto", paddingRight: 4 }}>
    {/* Hộp câu hỏi */}
    <div style={{ background: COLORS.goldCard, border: "1px solid rgba(169,130,44,0.4)", borderRadius: 2, padding: "16px 20px", boxShadow: shadow }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>❓</span>
        <p style={{ margin: 0, fontSize: 13.4, lineHeight: 1.55, color: COLORS.ink, fontWeight: 500 }}>{question}</p>
      </div>
    </div>

    {/* Hộp câu trả lời: Ẩn hoặc Hiển thị */}
    {isRevealed ? (
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 2,
          padding: "16px 20px",
          boxShadow: shadow,
          borderLeft: `3px solid ${COLORS.red}`,
          animation: "fadeSlideDown 0.35s ease forwards",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: COLORS.inkSoft, whiteSpace: "pre-line" }}>{answer}</div>
        </div>
      </div>
    ) : (
      <div
        onClick={onReveal}
        style={{
          background: "rgba(32,36,31,0.03)",
          border: `1px dashed ${COLORS.line}`,
          borderRadius: 2,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 10px rgba(32,36,31,0.03)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(169,130,44,0.08)";
          e.currentTarget.style.borderColor = COLORS.gold;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(32,36,31,0.03)";
          e.currentTarget.style.borderColor = COLORS.line;
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18, opacity: 0.6 }}>💡</span>
          <span style={{ fontSize: 13, color: COLORS.inkSoft, fontStyle: "italic" }}>
            Luận giải phản biện đang được ẩn — Nhấn phím <b>Next (→ / Space)</b> hoặc bấm vào đây để hiển thị...
          </span>
        </div>
        <span
          className="font-serif"
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: COLORS.redDeep,
            padding: "5px 12px",
            background: COLORS.paper,
            borderRadius: 2,
            border: `1px solid ${COLORS.line}`,
            letterSpacing: "0.02em",
          }}
        >
          Xem giải đáp ↓
        </span>
      </div>
    )}
  </div>
);
