import React from "react";
import { HCM202_KNOWLEDGE_BASE, KnowledgeSegment } from "../../data/hcm202KnowledgeBase";
import { TIMELINE_SEGMENT_IDS } from "../../data/learningStructure";
import { useReveal } from "../../hooks/useReveal";

const labels: Record<string, string> = {
  "p151-1": "1919",
  "p151-2": "03.09.1945",
  "p152-1": "06.01.1946",
  "p153-1": "1946–1959"
};

interface TimelineSectionProps {
  onOpenSource?: (segment: KnowledgeSegment) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onOpenSource }) => {
  const reveal = useReveal<HTMLElement>(0.08);
  const events = TIMELINE_SEGMENT_IDS
    .map((id) => HCM202_KNOWLEDGE_BASE.find((segment) => segment.id === id))
    .filter((segment): segment is KnowledgeSegment => Boolean(segment));

  return (
    <section
      ref={reveal.ref}
      id="dong-thoi-gian"
      className={`section-block timeline-section reveal${reveal.isVisible ? " is-visible" : ""}`}
      aria-labelledby="timeline-title"
    >
      <div className="content-wrap">
        <p className="eyebrow">Dòng thời gian tư liệu</p>
        <h2 id="timeline-title" className="section-heading">Từ yêu sách pháp lý đến nền lập pháp mới</h2>
        <div className="section-rule" />
        <div className="timeline">
          {events.map((event, index) => (
            <article
              className={`timeline-event reveal reveal-delay-${Math.min(index + 1, 3)}${reveal.isVisible ? " is-visible" : ""}`}
              key={event.id}
            >
              <div className="timeline-event__year">{labels[event.id] ?? event.page}</div>
              <div className="timeline-event__body">
                <h3>{event.title}</h3>
                <p>{event.keyQuotes[0]}</p>
                {onOpenSource && (
                  <button
                    className="source-link"
                    type="button"
                    onClick={() => onOpenSource(event)}
                    style={{ marginTop: "12px" }}
                  >
                    Đối chiếu trang {event.page}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
