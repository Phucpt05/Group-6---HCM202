import React from "react";

export const SectionProgress: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="reading-progress" aria-hidden="true">
    <div className="reading-progress__bar" style={{ transform: `scaleX(${progress})` }} />
  </div>
);
