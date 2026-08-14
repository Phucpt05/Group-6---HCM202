import React, { useMemo, useState } from "react";
import { HCM202_KNOWLEDGE_BASE, KnowledgeSegment } from "../../data/hcm202KnowledgeBase";
import { APPLICATION_CHOICES, APPLICATION_IMAGES, APPLICATION_PRINCIPLES } from "../../data/applicationScenario";
import { useReveal } from "../../hooks/useReveal";

interface ApplicationSectionProps {
  onOpenSource: (segment: KnowledgeSegment) => void;
}

export const ApplicationSection: React.FC<ApplicationSectionProps> = ({ onOpenSource }) => {
  const reveal = useReveal<HTMLElement>(0.04);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const selected = APPLICATION_CHOICES.find((choice) => choice.id === selectedChoice);
  const principles = useMemo(
    () => APPLICATION_PRINCIPLES.map((principle) => ({
      ...principle,
      segment: HCM202_KNOWLEDGE_BASE.find((segment) => segment.id === principle.segmentId)
    })).filter((principle): principle is typeof principle & { segment: KnowledgeSegment } => Boolean(principle.segment)),
    []
  );

  return (
    <section
      ref={reveal.ref}
      id="van-dung"
      className={`section-block application-section reveal${reveal.isVisible ? " is-visible" : ""}`}
      aria-labelledby="application-title"
    >
      <div className="content-wrap">
        <div className="application-heading">
          <div>
            <p className="eyebrow">Vận dụng thực tiễn</p>
            <h2 id="application-title" className="section-heading">Từ nguyên lý đến hành động công vụ</h2>
          </div>
          <p className="application-disclaimer">
            <strong>Tình huống giả định · Liên hệ của Nhóm 6</strong>
            Nội dung dưới đây dùng để vận dụng kiến thức, không phải dữ kiện trong giáo trình.
          </p>
        </div>
        <div className="section-rule" />

        <div className="application-gallery" aria-label="Các tình huống vận dụng minh họa">
          {APPLICATION_IMAGES.map((image) => (
            <figure className="application-image" key={image.src}>
              <div className="application-image__media">
                <img src={image.src} alt={image.alt} width="1536" height="1024" loading="lazy" />
              </div>
              <figcaption>
                <span className="application-image__step">{image.number}</span>
                <span>
                  <strong>{image.title}</strong>
                  <span>{image.caption}</span>
                </span>
                <small>Hình minh họa do AI tạo · Không mô tả sự kiện có thật</small>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="application-grid">
          <div className="application-principles" aria-label="Bốn nguyên tắc vận dụng">
            {principles.map((principle) => (
              <article className="application-principle" key={principle.segmentId}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.keyword}</h3>
                  <p>{principle.action}</p>
                  <button className="source-link" type="button" onClick={() => onOpenSource(principle.segment)}>
                    Đối chiếu trang {principle.segment.page}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="application-scenario">
            <p className="eyebrow">Bài tập quyết định</p>
            <h3>Một hồ sơ trực tuyến bị trễ hẹn</h3>
            <p>
              Người dân chưa thấy tiến độ hoặc đầu mối chịu trách nhiệm. Cơ quan công quyền nên ưu tiên hành động nào?
            </p>
            <div className="application-choices" role="group" aria-label="Các phương án xử lý">
              {APPLICATION_CHOICES.map((choice, index) => (
                <button
                  key={choice.id}
                  className={`application-choice${selectedChoice === choice.id ? " is-selected" : ""}`}
                  type="button"
                  aria-pressed={selectedChoice === choice.id}
                  onClick={() => setSelectedChoice(choice.id)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {choice.label}
                </button>
              ))}
            </div>

            <div className="application-feedback" aria-live="polite">
              {selected ? (
                <>
                  <strong>{selected.verdict}</strong>
                  <p>{selected.feedback}</p>
                </>
              ) : (
                <p>Chọn một phương án để xem phản hồi và đối chiếu với bốn nguyên tắc bên cạnh.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
