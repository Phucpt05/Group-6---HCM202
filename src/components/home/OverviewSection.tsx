import React from "react";
import { HCM202_KNOWLEDGE_BASE } from "../../data/hcm202KnowledgeBase";
import { useReveal } from "../../hooks/useReveal";

const concepts = [
  { number: "01", title: "Của nhân dân", segmentId: "p145-1" },
  { number: "02", title: "Do nhân dân", segmentId: "p148-1" },
  { number: "03", title: "Vì nhân dân", segmentId: "p149-2" }
];

export const OverviewSection: React.FC = () => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      ref={reveal.ref}
      id="tong-quan"
      className={`section-block overview reveal${reveal.isVisible ? " is-visible" : ""}`}
      aria-labelledby="overview-title"
    >
      <div className="content-wrap overview__grid">
        <div className="overview__intro">
          <p className="eyebrow">01 · Tổng quan tư tưởng</p>
          <h2 id="overview-title" className="section-heading">Ba trụ cột của một Nhà nước lấy dân làm gốc</h2>
          <p className="body-copy">
            Tư tưởng Hồ Chí Minh về nhà nước thống nhất bản chất giai cấp công nhân với tính nhân dân, tính dân tộc — dựng nên một mô hình quyền lực mà mọi cán bộ đều là đầy tớ trung thành, đồng thời là người dẫn đường có đức, có tài.
          </p>
        </div>

        <div className="concept-list">
          {concepts.map((concept, index) => {
            const segment = HCM202_KNOWLEDGE_BASE.find((item) => item.id === concept.segmentId);
            return (
              <article key={concept.segmentId} className={`concept-row reveal reveal-delay-${index + 1}${reveal.isVisible ? " is-visible" : ""}`}>
                <span className="concept-row__number">{concept.number}</span>
                <h3>{concept.title}</h3>
                <p>{segment?.keyQuotes[0]}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
