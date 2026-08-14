import React, { useState } from "react";
import { HCM202_KNOWLEDGE_BASE, KnowledgeSegment } from "../../data/hcm202KnowledgeBase";
import { LearningSectionConfig } from "../../data/learningStructure";
import { useReveal } from "../../hooks/useReveal";
import { EditorialQuote } from "./EditorialQuote";
import { HighlightedText } from "./HighlightedText";
import { HistoricalDocument } from "./HistoricalDocument";

interface ContentSectionProps {
  config: LearningSectionConfig;
  onOpenSource: (segment: KnowledgeSegment) => void;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ config, onOpenSource }) => {
  const [showAnswer, setShowAnswer] = useState(false);
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

                {segment.id === "p150-compare" ? (
                  <div className="three-pillars-table-wrap">
                    <table className="three-pillars-table">
                      <thead>
                        <tr>
                          <th>Trụ cột</th>
                          <th>Ý nghĩa cốt lõi & Trọng tâm</th>
                          <th>Trách nhiệm Cán bộ / Nhà nước</th>
                          <th>Trích dẫn kinh điển</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="pillar-badge pillar-cua">CỦA DÂN</span></td>
                          <td><strong>Nguồn gốc & Chủ thể:</strong> Mọi quyền lực tối cao trong xã hội đều thuộc về nhân dân (Dân là chủ).</td>
                          <td>Là "công bộc", "đầy tớ" thừa ủy quyền gánh vác việc chung; chịu giám sát và bãi miễn.</td>
                          <td><em>"Tất cả mọi quyền lực đều là của nhân dân"</em> (T.8, tr.262)</td>
                        </tr>
                        <tr>
                          <td><span className="pillar-badge pillar-do">DO DÂN</span></td>
                          <td><strong>Vai trò xây dựng & Quản lý:</strong> Do nhân dân lập nên qua bầu cử; thực hiện quyền lợi & nghĩa vụ (Dân làm chủ).</td>
                          <td>Tạo điều kiện pháp lý, chủ động giáo dục nâng cao "năng lực làm chủ" cho nhân dân.</td>
                          <td><em>"Muốn làm chủ được tốt, phải có năng lực làm chủ"</em> (T.12, tr.527)</td>
                        </tr>
                        <tr>
                          <td><span className="pillar-badge pillar-vi">VÌ DÂN</span></td>
                          <td><strong>Mục tiêu phụng sự:</strong> Mưu cầu hạnh phúc, tự do cho dân. Tuyệt đối không có đặc quyền đặc lợi.</td>
                          <td>"Việc gì có lợi cho dân hết sức làm, có hại hết sức tránh". Cán bộ "vừa là đầy tớ, vừa là lãnh đạo".</td>
                          <td><em>"Chính phủ làm phải nhằm mục đích duy nhất là mưu tự do hạnh phúc cho mọi người"</em> (T.4)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : segment.id === "p150-relation" ? (
                  <div className="dialectical-relations">
                    <div className="relation-card">
                      <div className="relation-header">
                        <span className="relation-tag">Quan hệ 1</span>
                        <h4>Nguồn gốc dẫn đến trách nhiệm (CỦA DÂN ⇄ DO DÂN)</h4>
                      </div>
                      <p>
                        Vì Nhà nước là <strong>CỦA</strong> dân, nên dân mới có quyền và trách nhiệm làm chủ, tham gia xây dựng Nhà nước (<strong>DO</strong> dân). Ngược lại, chính quá trình nhân dân tự mình bầu cử, tổ chức và giám sát (<strong>DO</strong> dân) mới khẳng định thực chất quyền sở hữu của họ (<strong>CỦA</strong> dân).
                      </p>
                    </div>

                    <div className="relation-card">
                      <div className="relation-header">
                        <span className="relation-tag">Quan hệ 2</span>
                        <h4>Chủ thể quyết định mục đích (CỦA DÂN & DO DÂN ➔ VÌ DÂN)</h4>
                      </div>
                      <p>
                        Vì là Nhà nước <strong>CỦA</strong> dân và <strong>DO</strong> dân xây dựng nên, tính chất tự thân của nó phải là hoạt động <strong>VÌ</strong> lợi ích của chính nhân dân. Nhà nước tuyệt đối không có quyền lợi nào khác ngoài lợi ích của nhân dân.
                      </p>
                    </div>

                    <div className="relation-card">
                      <div className="relation-header">
                        <span className="relation-tag">Quan hệ 3</span>
                        <h4>Hiệu quả hoạt động củng cố niềm tin (VÌ DÂN ➔ DO DÂN ➔ CỦA DÂN)</h4>
                      </div>
                      <p>
                        Khi Nhà nước thực sự phục vụ lợi ích của dân (<strong>VÌ</strong> dân), nhân dân sẽ càng tin yêu, ủng hộ và tích cực tham gia quản lý, bảo vệ Nhà nước (<strong>DO</strong> dân), từ đó làm cho bản chất <strong>CỦA</strong> dân càng thêm vững chắc.
                      </p>
                    </div>
                  </div>
                ) : (
                  <ul className="segment-entry__content segment-key-points">
                    {segment.keyQuotes.slice(0, 2).map((point) => (
                      <li key={point}>
                        <HighlightedText text={point} terms={config.keywords} />
                      </li>
                    ))}
                  </ul>
                )}

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

        <aside className="discussion-prompt" aria-label={`Câu hỏi phản biện chương ${config.number}`}>
          <div className="discussion-prompt__meta">
            <span>{config.number}</span>
            <strong>Thảo luận cuối chương</strong>
          </div>
          <div className="discussion-prompt__body">
            <p>
              <HighlightedText text={config.discussionQuestion} terms={config.keywords} />
            </p>
            {config.discussionAnswerPoints && config.discussionAnswerPoints.length > 0 && (
              <div className="discussion-prompt__answer-wrap">
                <button
                  type="button"
                  className={`discussion-prompt__toggle${showAnswer ? " is-active" : ""}`}
                  onClick={() => setShowAnswer((prev) => !prev)}
                  aria-expanded={showAnswer}
                >
                  <span className="discussion-prompt__toggle-icon">{showAnswer ? "−" : "+"}</span>
                  <span>{showAnswer ? "Ẩn đáp án" : "Xem đáp án"}</span>
                </button>
                {showAnswer && (
                  <div className="discussion-prompt__answer" aria-live="polite">
                    <div className="discussion-prompt__answer-label">Đáp án phân tích & Gợi ý phản biện:</div>
                    <ul className="discussion-prompt__points">
                      {config.discussionAnswerPoints.map((point, index) => {
                        const colonIdx = point.indexOf(":");
                        if (colonIdx !== -1) {
                          const title = point.slice(0, colonIdx);
                          const rest = point.slice(colonIdx + 1);
                          return (
                            <li key={index}>
                              <strong>{title}:</strong>{rest}
                            </li>
                          );
                        }
                        return <li key={index}>{point}</li>;
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
