import React, { useEffect } from "react";

interface SourceProofModalProps {
  isOpen: boolean;
  pageNumber: number | null;
  title?: string;
  quoteSnippet?: string;
  onClose: () => void;
  onNavigatePage?: (delta: number) => void;
}

export const SourceProofModal: React.FC<SourceProofModalProps> = ({ isOpen, pageNumber, title, quoteSnippet, onClose, onNavigatePage }) => {
  useEffect(() => {
    if (!isOpen) return;
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigatePage?.(-1);
      if (event.key === "ArrowRight") onNavigatePage?.(1);
    };
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [isOpen, onClose, onNavigatePage]);

  if (!isOpen || !pageNumber) return null;
  return (
    <div className="source-modal" role="dialog" aria-modal="true" aria-labelledby="source-title" onClick={onClose}>
      <div className="source-modal__dialog" onClick={(event) => event.stopPropagation()}>
        <header className="source-modal__header">
          <div>
            <p className="eyebrow">Nguồn đối chứng · Trang {pageNumber}</p>
            <h2 id="source-title">{title ?? "Giáo trình HCM202"}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng tư liệu">×</button>
        </header>
        {quoteSnippet && <blockquote className="source-modal__quote">“{quoteSnippet}”</blockquote>}
        <div className="source-modal__image-wrap">
          <img src={`/docs_images/page_${pageNumber}.png`} alt={`Ảnh scan Giáo trình HCM202, trang ${pageNumber}`} />
        </div>
        <footer className="source-modal__footer">
          <button type="button" disabled={pageNumber <= 142} onClick={() => onNavigatePage?.(-1)}>Trang trước</button>
          <span>{pageNumber} / 164</span>
          <button type="button" disabled={pageNumber >= 164} onClick={() => onNavigatePage?.(1)}>Trang sau</button>
        </footer>
      </div>
    </div>
  );
};
