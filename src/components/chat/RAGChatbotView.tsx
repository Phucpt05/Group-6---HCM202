import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../../constants/theme";
import { generateRAGAnswer, POPULAR_FAQ_PROMPTS, RAGAnswer, Citation } from "../../utils/ragEngine";
import { callGeminiMentor, GeminiMessage } from "../../utils/geminiMentorService";
import { SourceProofModal } from "./SourceProofModal";
import { HCM202_KNOWLEDGE_BASE } from "../../data/hcm202KnowledgeBase";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  ragResult?: RAGAnswer;
  citations?: Citation[];
  timestamp: string;
}

function renderFormattedText(
  text: string,
  onPageClick?: (page: number) => void
): React.ReactNode {
  if (!text) return null;

  // Tách định dạng: **in đậm**, *in nghiêng*, `code`, và thẻ trích dẫn [Trang 14X...]
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[Trang\s*\d{3}[^\]]*\])/g);

  return parts.map((part, i) => {
    // 1. Thẻ trích dẫn trang [Trang 14X]
    const pageMatch = part.match(/^\[Trang\s*(\d{3})([^\]]*)\]$/i);
    if (pageMatch) {
      const pageNum = parseInt(pageMatch[1], 10);
      return (
        <span
          key={i}
          onClick={() => onPageClick && onPageClick(pageNum)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            background: "#8B0000",
            color: "#FFFFFF",
            padding: "1px 7px",
            borderRadius: 12,
            fontSize: "0.78em",
            fontWeight: 700,
            cursor: "pointer",
            margin: "0 2px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            verticalAlign: "baseline"
          }}
          title="Bấm để xem ảnh scan trang sách gốc"
        >
          📖 Trang {pageNum} {pageMatch[2]} 🔍
        </span>
      );
    }

    // 2. In đậm **...**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} style={{ fontWeight: 700, color: "#1A1A1A" }}>
          {renderFormattedText(part.slice(2, -2), onPageClick)}
        </strong>
      );
    }

    // 3. In nghiêng *...*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2 && !part.startsWith("**")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }

    // 4. Code `...`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={i}
          style={{
            background: "rgba(0,0,0,0.06)",
            padding: "2px 5px",
            borderRadius: 4,
            fontSize: "0.88em",
            fontFamily: "monospace"
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

export const RAGChatbotView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "ai",
      text: `Xin chào các bạn sinh viên! Tôi là **Mentor & Giảng viên AI hướng dẫn môn Tư tưởng Hồ Chí Minh (HCM202)** của Nhóm 6.\n\nTôi được nạp toàn bộ dữ liệu từ **23 trang Giáo trình HCM202 (Trang 142 - 164)** và vận hành bởi **Gemini 2.5 Flash**.\n\n🎓 **Tôi sẽ tự động thích ứng theo câu hỏi của bạn:**\n1. **Khi bạn hỏi bài:** Tôi sẽ giảng giải khúc chiết, minh họa thực tiễn sinh động, dễ nhớ.\n2. **Khi bạn nêu quan điểm / giả định:** Tôi sẽ đóng vai Người phản biện sắc bén, chất vấn lật lại vấn đề và hướng dẫn bạn cách bảo vệ luận điểm trước Hội đồng chấm thi.\n3. **Khi bạn muốn trao đổi:** Chúng ta cùng đàm đạo, mổ xẻ các góc nhìn tư tưởng hai chiều.\n\n🛡️ *Tất cả câu trả lời đều có trích dẫn số trang đối chứng [Trang X]. Bạn hãy thoải mái đặt câu hỏi hoặc đưa ra quan điểm để cùng trao đổi nhé!*`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [geminiHistory, setGeminiHistory] = useState<GeminiMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activeProof, setActiveProof] = useState<{
    isOpen: boolean;
    page: number | null;
    title?: string;
    quote?: string;
  }>({
    isOpen: false,
    page: null
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = async (queryToSend?: string) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);

    try {
      // 1. Gọi Gemini Mentor AI với tự động nhận diện ý định (Intent)
      const geminiRes = await callGeminiMentor(q, geminiHistory);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: geminiRes.text,
        citations: geminiRes.citations,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Cập nhật lịch sử đối thoại cho Gemini
      setGeminiHistory((prev) => [
        ...prev,
        { role: "user", parts: [{ text: q }] },
        { role: "model", parts: [{ text: geminiRes.text }] }
      ]);
    } catch (err) {
      console.warn("Gemini API Error, falling back to Local RAG Engine:", err);
      // Fallback sang Local RAG nếu có lỗi
      const localResult = generateRAGAnswer(q);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: localResult.answerMarkdown,
        ragResult: localResult,
        citations: localResult.citations,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const openProofByPage = (pageNum: number) => {
    const seg = HCM202_KNOWLEDGE_BASE.find((s) => s.page === pageNum);
    setActiveProof({
      isOpen: true,
      page: pageNum,
      title: seg ? `${seg.title} (${seg.subSection})` : `Giáo trình HCM202 - Trang ${pageNum}`,
      quote: seg ? seg.keyQuotes[0] : undefined
    });
  };

  const openProofModal = (citation: Citation) => {
    setActiveProof({
      isOpen: true,
      page: citation.page,
      title: `${citation.title} (${citation.subSection})`,
      quote: citation.quoteSnippet
    });
  };

  const navigateProofPage = (delta: number) => {
    if (!activeProof.page) return;
    const newPage = activeProof.page + delta;
    if (newPage >= 142 && newPage <= 164) {
      setActiveProof((prev) => ({
        ...prev,
        page: newPage
      }));
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Bạn có muốn làm mới cuộc trò chuyện và bắt đầu chủ đề mới?")) {
      setMessages([
        {
          id: "welcome-msg",
          sender: "ai",
          text: `Đã làm mới phiên thảo luận. Mời bạn đặt câu hỏi hoặc đưa ra bất kỳ quan điểm nào để cùng trao đổi, phản biện nhé!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      setGeminiHistory([]);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "64px 6vw 18px",
        boxSizing: "border-box",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden"
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #FFF9F0 0%, #FFF3E0 100%)",
          border: "1px solid #E2D4B7",
          borderRadius: 12,
          padding: "10px 18px",
          marginBottom: 10,
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: COLORS.red || "#8B0000",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 3px 8px rgba(139,0,0,0.25)"
            }}
          >
            🎓
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#5C1D1D",
                  fontFamily: "'Literata', serif"
                }}
              >
                Mentor RAG AI HCM202 (Giảng giải & Phản biện)
              </h2>
              <span
                style={{
                  fontSize: "0.72rem",
                  background: "#2E7D32",
                  color: "#FFF",
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
                Gemini 2.5 Flash
              </span>
            </div>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "0.8rem",
                color: "#6B5B45"
              }}
            >
              Cơ sở tri thức: 23 trang Giáo trình HCM202 (Trang 142 - 164) • Tự động Giảng giải, Thảo luận & Phản biện
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => openProofByPage(142)}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #B8860B",
              background: "#FFF",
              color: "#8B6508",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5
            }}
          >
            📚 Xem sách gốc
          </button>

          <button
            onClick={handleClearHistory}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid #D5CBB9",
              background: "#FFF",
              color: "#666",
              fontSize: "0.8rem",
              cursor: "pointer"
            }}
            title="Làm mới chủ đề thảo luận"
          >
            🔄 Làm mới
          </button>
        </div>
      </div>

      {/* Main Chat Stream Container */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#FFFFFF",
          border: "1px solid #E5DFD3",
          borderRadius: 14,
          padding: "18px 22px",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.02)",
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}
      >
        {messages.map((msg) => {
          const isAi = msg.sender === "ai";
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: isAi ? "row" : "row-reverse",
                alignItems: "flex-start",
                gap: 12
              }}
            >
              {/* Avatar Icon */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: isAi ? "#8B0000" : "#2B547E",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  flexShrink: 0,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                }}
              >
                {isAi ? "🎓" : "👤"}
              </div>

              {/* Message Bubble */}
              <div
                style={{
                  maxWidth: "84%",
                  background: isAi ? "#FAF7F0" : "#EAF2F8",
                  color: "#2C2523",
                  border: isAi ? "1px solid #E8DFCF" : "1px solid #C7DDEE",
                  borderRadius: 14,
                  padding: "16px 20px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
                  fontSize: "0.94rem",
                  lineHeight: 1.6
                }}
              >
                {/* Text Content with markdown parsing */}
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {msg.text.split("\n").map((line, idx) => {
                    if (line.startsWith("### ")) {
                      return (
                        <h4
                          key={idx}
                          style={{
                            margin: "10px 0 6px",
                            fontSize: "1.05rem",
                            color: "#8B0000",
                            fontFamily: "'Literata', serif"
                          }}
                        >
                          {renderFormattedText(line.replace("### ", ""), openProofByPage)}
                        </h4>
                      );
                    }
                    if (line.startsWith("#### ")) {
                      return (
                        <h5
                          key={idx}
                          style={{
                            margin: "8px 0 4px",
                            fontSize: "0.96rem",
                            color: "#5C1D1D",
                            fontFamily: "'Literata', serif"
                          }}
                        >
                          {renderFormattedText(line.replace("#### ", ""), openProofByPage)}
                        </h5>
                      );
                    }
                    if (line.startsWith("> ")) {
                      return (
                        <blockquote
                          key={idx}
                          style={{
                            margin: "8px 0",
                            padding: "8px 14px",
                            background: "#FFF3CD",
                            borderLeft: "4px solid #DAA520",
                            borderRadius: 4,
                            color: "#5c3d00",
                            fontStyle: "italic",
                            fontSize: "0.9rem"
                          }}
                        >
                          {renderFormattedText(line.replace("> ", ""), openProofByPage)}
                        </blockquote>
                      );
                    }
                    if (line.startsWith("- ") || line.startsWith("* ")) {
                      return (
                        <div key={idx} style={{ marginLeft: 14, marginBottom: 4 }}>
                          • {renderFormattedText(line.replace(/^[-*]\s+/, ""), openProofByPage)}
                        </div>
                      );
                    }
                    if (line.trim() === "---") {
                      return (
                        <hr
                          key={idx}
                          style={{
                            margin: "12px 0",
                            border: "none",
                            borderTop: "1px dashed #D3C9B8"
                          }}
                        />
                      );
                    }
                    return (
                      <p key={idx} style={{ margin: "4px 0" }}>
                        {renderFormattedText(line, openProofByPage)}
                      </p>
                    );
                  })}
                </div>

                {/* Citation Badges (Nguồn đối chứng sách thật) */}
                {msg.citations && msg.citations.length > 0 && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 12,
                      borderTop: "1px solid #E5DCCB",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#8B4513",
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                      }}
                    >
                      <span>📑</span> NGUỒN ĐỐI CHỨNG GIÁO TRÌNH HCM202 (BẤM ĐỂ XEM TRANG):
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {msg.citations.map((cite, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => openProofModal(cite)}
                          style={{
                            background: "#FFFFFF",
                            border: "1px solid #C9A96E",
                            borderRadius: 20,
                            padding: "5px 12px",
                            fontSize: "0.8rem",
                            color: "#5C3317",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            transition: "all 0.2s ease",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#FFF8DC";
                            e.currentTarget.style.borderColor = "#8B0000";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#FFFFFF";
                            e.currentTarget.style.borderColor = "#C9A96E";
                          }}
                          title="Bấm để mở ảnh scan trang sách thật"
                        >
                          <span style={{ color: "#8B0000", fontWeight: 700 }}>
                            Trang {cite.page}
                          </span>
                          <span style={{ color: "#888" }}>|</span>
                          <span style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {cite.title}
                          </span>
                          <span style={{ fontSize: "0.75rem", background: "#8B0000", color: "#FFF", padding: "1px 6px", borderRadius: 10 }}>
                            Soi trang 🔍
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#999",
                    textAlign: isAi ? "left" : "right",
                    marginTop: 6
                  }}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Thinking / Searching Indicator */}
        {isThinking && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#8B0000",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14
              }}
            >
              ⏳
            </div>
            <div
              style={{
                background: "#FAF7F0",
                border: "1px solid #E8DFCF",
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: "0.85rem",
                color: "#6B5B45",
                fontStyle: "italic"
              }}
            >
              Mentor đang tra cứu Giáo trình HCM202 (Trang 142 - 164) và suy ngẫm phản hồi...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Quick FAQ Carousel */}
      <div
        style={{
          marginTop: 10,
          marginBottom: 8,
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 4,
          flexShrink: 0
        }}
      >
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#666", alignSelf: "center", flexShrink: 0 }}>
          💡 Gợi ý thảo luận:
        </span>
        {POPULAR_FAQ_PROMPTS.map((faq, fIdx) => (
          <button
            key={fIdx}
            onClick={() => handleSend(faq)}
            style={{
              flexShrink: 0,
              padding: "5px 12px",
              background: "#FFF8DC",
              border: "1px solid #E2D4B7",
              borderRadius: 16,
              fontSize: "0.78rem",
              color: "#5C3317",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFE4B5";
              e.currentTarget.style.borderColor = "#B8860B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFF8DC";
              e.currentTarget.style.borderColor = "#E2D4B7";
            }}
          >
            {faq}
          </button>
        ))}
      </div>

      {/* Input Box Bar */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexShrink: 0
        }}
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi bài học, hoặc đưa ra quan điểm/nhận định để cùng Thầy trao đổi, phản biện..."
          disabled={isThinking}
          style={{
            flex: 1,
            padding: "13px 18px",
            fontSize: "0.94rem",
            borderRadius: 10,
            border: "1.5px solid #C4B59D",
            outline: "none",
            background: "#FFFFFF",
            boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#8B0000")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#C4B59D")}
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isThinking}
          style={{
            padding: "13px 24px",
            background: !inputQuery.trim() || isThinking ? "#CCC" : COLORS.red || "#8B0000",
            color: "#FFF",
            border: "none",
            borderRadius: 10,
            fontSize: "0.94rem",
            fontWeight: 600,
            cursor: !inputQuery.trim() || isThinking ? "not-allowed" : "pointer",
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <span>Gửi Mentor AI</span>
          <span>➔</span>
        </button>
      </div>

      {/* Scanned Image Source Proof Modal */}
      <SourceProofModal
        isOpen={activeProof.isOpen}
        pageNumber={activeProof.page}
        title={activeProof.title}
        quoteSnippet={activeProof.quote}
        onClose={() => setActiveProof((prev) => ({ ...prev, isOpen: false }))}
        onNavigatePage={navigateProofPage}
      />
    </div>
  );
};
