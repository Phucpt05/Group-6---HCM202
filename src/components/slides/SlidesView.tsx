import React from "react";
import { COLORS, navBtnStyle } from "../../constants/theme";

interface SlidesViewProps {
  slides: React.ReactNode[];
  idx: number;
  total: number;
  goToSlide: (index: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export const SlidesView: React.FC<SlidesViewProps> = ({
  slides,
  idx,
  total,
  goToSlide,
  handlePrev,
  handleNext,
}) => {
  return (
    <>
      {/* Vùng hiển thị Slides */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === idx ? 1 : 0,
              visibility: i === idx ? "visible" : "hidden",
              transform: i === idx ? "translateY(0)" : "translateY(16px)",
              transition: "opacity .45s cubic-bezier(0.4, 0, 0.2, 1), transform .45s cubic-bezier(0.4, 0, 0.2, 1), visibility .45s",
              pointerEvents: i === idx ? "auto" : "none",
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Thanh điều khiển dưới cùng cho Slides */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6vw 2.4vh",
        }}
      >
        {/* Chấm tròn chỉ báo slide */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Đi tới slide ${i + 1}`}
              style={{
                width: i === idx ? 22 : 6,
                height: 6,
                borderRadius: i === idx ? 4 : "50%",
                background: i === idx ? COLORS.red : "rgba(32,36,31,0.22)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all .25s ease",
              }}
            />
          ))}
        </div>

        {/* Nút điều hướng Trước / Sau & Số trang */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 11.5, color: COLORS.inkSoft, letterSpacing: "0.05em", minWidth: 44, fontWeight: 500 }}>
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={handlePrev}
            aria-label="Trước (Lùi)"
            style={navBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.red;
              e.currentTarget.style.color = COLORS.paper;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.card;
              e.currentTarget.style.color = COLORS.ink;
            }}
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            aria-label="Sau (Tiến / Mở đáp án)"
            style={navBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.red;
              e.currentTarget.style.color = COLORS.paper;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.card;
              e.currentTarget.style.color = COLORS.ink;
            }}
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
};
