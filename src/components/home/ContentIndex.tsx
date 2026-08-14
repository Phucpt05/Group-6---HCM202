import React from "react";
import { LEARNING_SECTIONS } from "../../data/learningStructure";
import { useReveal } from "../../hooks/useReveal";

export const ContentIndex: React.FC = () => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      ref={reveal.ref}
      id="noi-dung"
      className={`section-block content-index reveal${reveal.isVisible ? " is-visible" : ""}`}
      aria-labelledby="content-index-title"
    >
      <div className="content-wrap">
        <p className="eyebrow">Nội dung chuyên đề</p>
        <h2 id="content-index-title" className="section-heading">Lộ trình khám phá</h2>
        <div className="section-rule" />
        <nav className="index-list" aria-label="Mục lục chuyên đề">
          {LEARNING_SECTIONS.map((section) => (
            <a className="index-item" href={`#${section.id}`} key={section.id}>
              <span className="index-item__number">{section.number}</span>
              <span className="index-item__title">{section.title}</span>
              <span className="index-item__arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};
