import React, { useEffect } from "react";
import { KnowledgeSegment } from "../../data/hcm202KnowledgeBase";

interface MinigameResultDialogProps {
  source?: KnowledgeSegment;
  onClose: () => void;
  onReset: () => void;
  onOpenSource: (segment: KnowledgeSegment) => void;
}

const pillars = [
  ["Của dân", "Quyền lực thuộc về nhân dân"],
  ["Do dân", "Nhân dân xây dựng Nhà nước"],
  ["Vì dân", "Phục vụ lợi ích nhân dân"]
];

export const MinigameResultDialog: React.FC<MinigameResultDialogProps> = ({ source, onClose, onReset, onOpenSource }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="minigame-modal" role="dialog" aria-modal="true" aria-labelledby="minigame-result-title" onClick={onClose}>
      <div className="minigame-dialog minigame-result" onClick={(event) => event.stopPropagation()}>
        <header className="minigame-dialog__header">
          <div>
            <p className="eyebrow">Bức ảnh lịch sử</p>
            <h3 id="minigame-result-title">Tổng tuyển cử bầu Quốc hội đầu tiên</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng kết quả">×</button>
        </header>

        <figure className="minigame-result__image">
          <img src="/minigame/tong-tuyen-cu-1946.jpg" alt="Tư liệu về Tổng tuyển cử bầu Quốc hội đầu tiên năm 1946" />
          <figcaption>Ngày 06 tháng 01 năm 1946 · Tư liệu minh họa từ minigame gốc</figcaption>
        </figure>

        <div className="minigame-result__meaning">
          <p>
            Sự kiện khẳng định quyền lực tối cao thuộc về nhân dân và đánh dấu sự hình thành của một Nhà nước của dân, do dân, vì dân.
          </p>
          <div className="minigame-result__pillars">
            {pillars.map(([title, description], index) => (
              <div key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="minigame-result__actions">
          {source && <button className="text-link" type="button" onClick={() => onOpenSource(source)}>Đối chiếu trang {source.page}</button>}
          <button className="outline-action" type="button" onClick={onReset}>Chơi lại từ đầu</button>
        </footer>
      </div>
    </div>
  );
};
