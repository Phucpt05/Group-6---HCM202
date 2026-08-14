import React from "react";
import { KnowledgeSegment } from "../../data/hcm202KnowledgeBase";

interface HistoricalDocumentProps {
  segment: KnowledgeSegment;
  onOpenSource: (segment: KnowledgeSegment) => void;
}

export const HistoricalDocument: React.FC<HistoricalDocumentProps> = ({ segment, onOpenSource }) => (
  <figure className="document-frame">
    <button type="button" onClick={() => onOpenSource(segment)} aria-label={`Mở ảnh scan trang ${segment.page}`}>
      <img src={segment.imageSrc} alt={`Ảnh scan Giáo trình HCM202, trang ${segment.page}`} loading="lazy" />
    </button>
    <figcaption>Giáo trình HCM202 · Trang {segment.page} · Bấm để xem toàn trang</figcaption>
  </figure>
);
