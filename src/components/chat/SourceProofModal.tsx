import React from "react";
import { COLORS } from "../../constants/theme";

interface SourceProofModalProps {
  isOpen: boolean;
  pageNumber: number | null;
  title?: string;
  quoteSnippet?: string;
  onClose: () => void;
  onNavigatePage?: (delta: number) => void;
}

export const SourceProofModal: React.FC<SourceProofModalProps> = ({
  isOpen,
  pageNumber,
  title,
  quoteSnippet,
  onClose,
  onNavigatePage
}) => {
  if (!isOpen || !pageNumber) return null;

  const imageSrc = `/docs_images/page_${pageNumber}.png`;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(10, 15, 25, 0.82)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
        boxSizing: "border-box",
        animation: "fadeIn 0.25s ease-out"
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        style={{
          background: "#ffffff",
          borderRadius: 14,
          maxWidth: 900,
          width: "100%",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
          border: "1px solid rgba(218, 165, 32, 0.4)",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg, #8B0000 0%, #B22222 100%)",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #DAA520"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  fontFamily: "'Literata', serif",
                  color: "#FFFAF0"
                }}
              >
                Bằng chứng trang sách gốc: Giáo trình HCM202 (Trang {pageNumber})
              </h3>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.85)"
                }}
              >
                {title || "Tư tưởng Hồ Chí Minh về Nhà nước của nhân dân, do nhân dân, vì nhân dân"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#FFF",
              fontSize: "1.2rem",
              borderRadius: "50%",
              width: 34,
              height: 34,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s"
            }}
            title="Đóng (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Highlight quote banner if available */}
        {quoteSnippet && (
          <div
            style={{
              padding: "10px 20px",
              background: "#FFF8DC",
              borderBottom: "1px solid #FFE4B5",
              fontSize: "0.86rem",
              color: "#5c3d00",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <span style={{ fontSize: 16 }}>🔍</span>
            <div>
              <strong>Đoạn trích dẫn đối chứng: </strong>
              <em>"{quoteSnippet}"</em>
            </div>
          </div>
        )}

        {/* Scanned Image Container with zoom */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
            background: "#F5F2EB",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative"
          }}
        >
          <img
            src={imageSrc}
            alt={`Giáo trình HCM202 - Trang ${pageNumber}`}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 6,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              border: "1px solid #D3C9B8"
            }}
            onError={(e) => {
              // fallback if image not loaded yet
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>

        {/* Footer with page navigation */}
        <div
          style={{
            padding: "12px 20px",
            background: "#FAFAFA",
            borderTop: "1px solid #E5E5E5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onNavigatePage && onNavigatePage(-1)}
              disabled={pageNumber <= 142}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #CCC",
                background: pageNumber <= 142 ? "#EEE" : "#FFF",
                color: pageNumber <= 142 ? "#999" : "#333",
                cursor: pageNumber <= 142 ? "not-allowed" : "pointer",
                fontSize: "0.85rem",
                fontWeight: 600
              }}
            >
              ← Trang trước ({pageNumber - 1 >= 142 ? pageNumber - 1 : "-"})
            </button>
            <button
              onClick={() => onNavigatePage && onNavigatePage(1)}
              disabled={pageNumber >= 164}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #CCC",
                background: pageNumber >= 164 ? "#EEE" : "#FFF",
                color: pageNumber >= 164 ? "#999" : "#333",
                cursor: pageNumber >= 164 ? "not-allowed" : "pointer",
                fontSize: "0.85rem",
                fontWeight: 600
              }}
            >
              Trang sau ({pageNumber + 1 <= 164 ? pageNumber + 1 : "-"}) →
            </button>
          </div>

          <div style={{ fontSize: "0.82rem", color: "#666" }}>
            Trang <strong>{pageNumber}</strong> / 164 (Nguồn: Giáo trình HCM202)
          </div>

          <button
            onClick={onClose}
            style={{
              padding: "6px 18px",
              borderRadius: 6,
              border: "none",
              background: COLORS.red || "#8B0000",
              color: "#FFF",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600
            }}
          >
            Đóng xem bằng chứng
          </button>
        </div>
      </div>
    </div>
  );
};
