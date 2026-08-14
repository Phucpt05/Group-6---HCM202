import React from "react";
import { HCM202_KNOWLEDGE_BASE, KnowledgeSegment } from "../../data/hcm202KnowledgeBase";
import { LearningSectionConfig } from "../../data/learningStructure";
import { useReveal } from "../../hooks/useReveal";
import { EditorialQuote } from "./EditorialQuote";
import { HistoricalDocument } from "./HistoricalDocument";

interface ContentSectionProps {
  config: LearningSectionConfig;
  onOpenSource: (segment: KnowledgeSegment) => void;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ config, onOpenSource }) => {
  const reveal = useReveal<HTMLElement>(0.04);
  const segments = config.segmentIds
    .map((id) => HCM202_KNOWLEDGE_BASE.find((segment) => segment.id === id))
    .filter((segment): segment is KnowledgeSegment => Boolean(segment));
  const quoteSegment = HCM202_KNOWLEDGE_BASE.find((segment) => segment.id === config.quoteSegmentId) ?? segments[0];
  const evidenceSegment = segments[Math.min(1, segments.length - 1)] ?? quoteSegment;
  const reversed = config.layout === "evidence-first";

  return (
    <section
      ref={reveal.ref}
      id={config.id}
      className={`section-block learning-article reveal${reveal.isVisible ? " is-visible" : ""}`}
      aria-labelledby={`${config.id}-title`}
    >
      <div className="content-wrap">
        <div className="article-heading-grid">
          <div className="article-number">{config.number}</div>
          <div>
            <p className="eyebrow">{config.eyebrow}</p>
            <h2 id={`${config.id}-title`} className="section-heading">{config.title}</h2>
            <div className="keyword-line" aria-label="Từ khóa trọng tâm">
              {config.keywords.map((keyword) => <mark key={keyword}>{keyword}</mark>)}
            </div>
            <div className="section-rule" />
          </div>
        </div>

        <div className={`article-content-grid${reversed ? " is-reversed" : ""}`}>
          <div className="segment-list">
            {segments.map((segment) => (
              <article className="segment-entry" key={segment.id}>
                <h3>{segment.title}</h3>
                <p className="segment-entry__key-point">{segment.keyQuotes[0]}</p>
                <button className="source-link" type="button" onClick={() => onOpenSource(segment)}>
                  Đối chiếu trang {segment.page}
                </button>
              </article>
            ))}
          </div>

          <aside className="article-evidence" aria-label="Tư liệu đối chứng">
            {evidenceSegment && <HistoricalDocument segment={evidenceSegment} onOpenSource={onOpenSource} />}
            {quoteSegment && <EditorialQuote segment={quoteSegment} />}
          </aside>
        </div>
      </div>
    </section>
  );
};
