import React from "react";
import { KnowledgeSegment } from "../../data/hcm202KnowledgeBase";

export const EditorialQuote: React.FC<{ segment: KnowledgeSegment }> = ({ segment }) => (
  <blockquote className="editorial-quote">
    <p>{segment.keyQuotes[0]}</p>
    <cite>Giáo trình HCM202 · Trang {segment.page}</cite>
  </blockquote>
);
