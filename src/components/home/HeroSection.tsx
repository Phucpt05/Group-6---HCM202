import React from "react";
import { useReveal } from "../../hooks/useReveal";

export const HeroSection: React.FC = () => {
  const copyReveal = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="content-wrap hero__grid">
        <div ref={copyReveal.ref} className={`hero__copy reveal${copyReveal.isVisible ? " is-visible" : ""}`}>
          <p className="eyebrow">HCM202 · NHÓM 6</p>
          <h1 id="hero-title">
            <span>Nhà nước</span>
            <em>của nhân dân,</em>
            <em>do nhân dân,</em>
            <em>vì nhân dân</em>
          </h1>
          <p className="hero__subtitle">
            Phân tích lý luận hệ thống và các câu hỏi biện chứng về thực tiễn quản trị hiện đại — độc lập dân tộc và chủ nghĩa xã hội trong tư tưởng Hồ Chí Minh.
          </p>
          <div className="hero__actions">
            <a className="text-link" href="#tong-quan">Khám phá nội dung <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <figure className="historical-photo">
          <div className="historical-photo__media">
            <img
              src="/119322_chu_tich_ho_chi_minh_doc_tuyen_ngon_doc_lap_anh_t_l_05340013.jpg"
              alt="Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình"
            />
          </div>
          <figcaption>
            Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình (2/9/1945)<br />
            Khai sinh nước Việt Nam Dân chủ Cộng hòa
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
