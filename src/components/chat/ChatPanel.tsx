import React, { useEffect, useRef, useState } from "react";
import { HCM202_KNOWLEDGE_BASE, KnowledgeSegment } from "../../data/hcm202KnowledgeBase";
import { Citation, generateRAGAnswer, POPULAR_FAQ_PROMPTS } from "../../utils/ragEngine";
import { callGeminiMentor, GeminiMessage } from "../../utils/geminiMentorService";

interface ChatEntry {
  id: string;
  sender: "user" | "ai";
  text: string;
  citations?: Citation[];
}

interface ChatPanelProps {
  onClose: () => void;
  onOpenSource: (segment: KnowledgeSegment) => void;
}

function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={index}>{part}</React.Fragment>
  );
}

function FormattedMessage({ text }: { text: string }) {
  return <>{text.split("\n").filter((line) => line.trim() !== "---").map((line, index) => (
    <p key={index}>{renderInline(line.replace(/^#{1,4}\s*/, "").replace(/^>\s*/, "").replace(/^[-*]\s+/, "– "))}</p>
  ))}</>;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ onClose, onOpenSource }) => {
  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Tôi là trợ lý học tập HCM202 của Nhóm 6. Câu trả lời được giới hạn trong Giáo trình HCM202, trang 142–164, và kèm nguồn đối chiếu khi tìm thấy nội dung phù hợp."
    }
  ]);
  const [history, setHistory] = useState<GeminiMessage[]>([]);
  const [query, setQuery] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = async (suggested?: string) => {
    const value = (suggested ?? query).trim();
    if (!value || thinking) return;
    setMessages((current) => [...current, { id: `user-${Date.now()}`, sender: "user", text: value }]);
    setQuery("");
    setThinking(true);

    try {
      const response = await callGeminiMentor(value, history);
      setMessages((current) => [...current, { id: `ai-${Date.now()}`, sender: "ai", text: response.text, citations: response.citations }]);
      setHistory((current) => [...current, { role: "user", parts: [{ text: value }] }, { role: "model", parts: [{ text: response.text }] }]);
    } catch {
      const response = generateRAGAnswer(value);
      setMessages((current) => [...current, { id: `ai-${Date.now()}`, sender: "ai", text: response.answerMarkdown, citations: response.citations }]);
    } finally {
      setThinking(false);
    }
  };

  const openCitation = (citation: Citation) => {
    const segment = HCM202_KNOWLEDGE_BASE.find((item) => item.page === citation.page && item.title === citation.title)
      ?? HCM202_KNOWLEDGE_BASE.find((item) => item.page === citation.page);
    if (segment) onOpenSource(segment);
  };

  return (
    <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
      <header className="chat-panel__header">
        <div>
          <h2 id="chat-title">Trợ lý học tập</h2>
          <p>HCM202 · Nhóm 6</p>
        </div>
        <button className="chat-close" type="button" onClick={onClose} aria-label="Đóng trợ lý">×</button>
      </header>

      <div className="chat-stream" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`chat-message chat-message--${message.sender}`}>
            <FormattedMessage text={message.text} />
            {message.citations && message.citations.length > 0 && (
              <div className="chat-citations" aria-label="Nguồn đối chiếu">
                {message.citations.map((citation, index) => (
                  <button className="chat-citation" type="button" key={`${citation.page}-${index}`} onClick={() => openCitation(citation)}>
                    Trang {citation.page}
                  </button>
                ))}
              </div>
            )}
          </article>
        ))}
        {thinking && <div className="chat-thinking">Đang đối chiếu giáo trình...</div>}
        <div ref={endRef} />
      </div>

      {messages.length === 1 && (
        <div className="chat-suggestions" aria-label="Câu hỏi gợi ý">
          {POPULAR_FAQ_PROMPTS.slice(0, 3).map((prompt) => (
            <button className="chat-suggestion" type="button" key={prompt} onClick={() => send(prompt)}>{prompt}</button>
          ))}
        </div>
      )}

      <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); send(); }}>
        <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Đặt câu hỏi về chuyên đề..." aria-label="Câu hỏi cho trợ lý" />
        <button type="submit" disabled={!query.trim() || thinking}>Gửi</button>
      </form>
    </section>
  );
};
