import React, { useEffect, useState } from "react";
import { KnowledgeSegment } from "../../data/hcm202KnowledgeBase";
import { ChatPanel } from "./ChatPanel";

export const FloatingChat: React.FC<{ onOpenSource: (segment: KnowledgeSegment) => void }> = ({ onOpenSource }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} onOpenSource={onOpenSource} />}
      <button
        className="chat-launcher"
        type="button"
        aria-label={isOpen ? "Đóng trợ lý học tập" : "Mở trợ lý học tập"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        AI
      </button>
    </>
  );
};
