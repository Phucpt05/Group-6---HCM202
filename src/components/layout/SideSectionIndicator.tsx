import React from "react";
import { LEARNING_SECTIONS } from "../../data/learningStructure";

export const SideSectionIndicator: React.FC<{ activeSection: string }> = ({ activeSection }) => (
  <nav className="side-indicator" aria-label="Các phần nội dung">
    {LEARNING_SECTIONS.map((section) => (
      <a
        key={section.id}
        href={`#${section.id}`}
        className={activeSection === section.id ? "is-active" : ""}
        title={section.eyebrow}
        aria-label={`${section.number}. ${section.eyebrow}`}
      >
        {section.number}
      </a>
    ))}
  </nav>
);
