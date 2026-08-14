import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../../constants/theme";
import { generateRAGAnswer, POPULAR_FAQ_PROMPTS, RAGAnswer, Citation } from "../../utils/ragEngine";
import { SourceProofModal } from "./SourceProofModal";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  ragResult?: RAGAnswer;
  timestamp: string;
}

function renderFormattedText(text: string): React.ReactNode {
  if (!text) return null;

  // Split by bold (**...**), italic (*...*), or inline code (`...`)
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} style={{ fontWeight: 700, color: "#1A1A1A" }}>
          {renderFormattedText(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2 && !part.startsWith("**")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
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
      text: `Xin chào! Tôi là **Trợ lý RAG AI HCM202** của Nhóm 6.\n\nTôi được huấn luyện và nạp toàn bộ dữ liệu số hóa từ **23 trang Giáo trình Tư tưởng Hồ Chí Minh (HCM202, từ Trang 142 đến Trang 164)**.\n\n🛡️ **Cam kết:**\n1. **Chính xác 100%:** Trả lời trực tiếp dựa trên nội dung giáo trình được cung cấp.\n2. **Minh bạch nguồn:** Trích dẫn rõ **Số trang**, **Tiểu mục**, **Đoạn văn** và **Câu nói nguyên văn**.\n3. **Không bịa (Zero Hallucination):** Từ chối suy diễn nếu câu hỏi không có trong tài liệu đối chứng.\n\nBạn có thể nhấn vào các câu hỏi gợi ý bên dưới hoặc tự nhập câu hỏi để tra cứu!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

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

  const handleSend = (queryToSend?: string) => {
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

    // Xử lý RAG AI Engine (phản hồi mượt mà với hiệu ứng loading ngắn)
    setTimeout(() => {
      const result = generateRAGAnswer(q);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: result.answerMarkdown,
        ragResult: result,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
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
    if (window.confirm("Bạn có muốn làm mới cuộc trò chuyện?")) {
      setMessages([
        {
          id: "welcome-msg",
          sender: "ai",
          text: `Đã làm mới phiên hỏi đáp. Hãy đặt câu hỏi về Giáo trình HCM202 (Trang 142 - 164)!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "64px 6vw 20px",
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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: COLORS.red || "#8B0000",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              boxShadow: "0 3px 8px rgba(139,0,0,0.25)"
            }}
          >
            ⚖️
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#5C1D1D",
                  fontFamily: "'Literata', serif"
                }}
              >
                Trợ lý RAG AI HCM202 (Knowledge Retrieval)
              </h2>
              <span
                style={{
                  fontSize: "0.72rem",
                  background: "#2E7D32",
                  color: "#FFF",
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontWeight: 600
                }}
              >
                100% Giáo trình HCM202 (Trang 142 - 164)
              </span>
            </div>
            <p
              style={{
                margin: "3px 0 0",
                fontSize: "0.82rem",
                color: "#6B5B45"
              }}
            >
              Chống bịa đặt • Trích dẫn số trang, đoạn văn • Bấm để xem ảnh chụp sách gốc
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() =>
              setActiveProof({
                isOpen: true,
                page: 142,
                title: "Giáo trình Môn Tư tưởng Hồ Chí Minh (HCM202)",
                quote: "Chương II: Tư tưởng Hồ Chí Minh về Nhà nước của nhân dân, do nhân dân, vì nhân dân"
              })
            }
            style={{
              padding: "7px 14px",
              borderRadius: 8,
              border: "1px solid #B8860B",
              background: "#FFF",
              color: "#8B6508",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            📚 Mở xem Giáo trình gốc
          </button>

          <button
            onClick={handleClearHistory}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              border: "1px solid #D5CBB9",
              background: "#FFF",
              color: "#666",
              fontSize: "0.82rem",
              cursor: "pointer"
            }}
            title="Xóa lịch sử chat"
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
          padding: "20px 24px",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.02)",
          display: "flex",
          flexDirection: "column",
          gap: 18
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
                {isAi ? "🏛️" : "👤"}
              </div>

              {/* Message Bubble */}
              <div
                style={{
                  maxWidth: "82%",
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
                            margin: "8px 0 6px",
                            fontSize: "1.05rem",
                            color: "#8B0000",
                            fontFamily: "'Literata', serif"
                          }}
                        >
                          {renderFormattedText(line.replace("### ", ""))}
                        </h4>
                      );
                    }
                    if (line.startsWith("#### ")) {
                      return (
                        <h5
                          key={idx}
                          style={{
                            margin: "8px 0 4px",
                            fontSize: "0.95rem",
                            color: "#5C1D1D",
                            fontFamily: "'Literata', serif"
                          }}
                        >
                          {renderFormattedText(line.replace("#### ", ""))}
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
                          {renderFormattedText(line.replace("> ", ""))}
                        </blockquote>
                      );
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <div key={idx} style={{ marginLeft: 16, marginBottom: 4 }}>
                          • {renderFormattedText(line.replace("- ", ""))}
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
                        {renderFormattedText(line)}
                      </p>
                    );
                  })}
                </div>

                {/* Citation Badges (Nguồn đối chứng) */}
                {msg.ragResult && msg.ragResult.citations.length > 0 && (
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
                      <span>📑</span> NGUỒN XÁC THỰC GIÁO TRÌNH HCM202:
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {msg.ragResult.citations.map((cite, cIdx) => (
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
                          <span style={{ fontSize: "0.75rem", background: "#8B0000", color: "#FFF", padding: "1px 5px", borderRadius: 10 }}>
                            Soi trang 🔍
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Follow-up Questions */}
                {msg.ragResult && msg.ragResult.suggestedQuestions && msg.ragResult.suggestedQuestions.length > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      paddingTop: 10,
                      borderTop: "1px dashed #E0D7C6"
                    }}
                  >
                    <div style={{ fontSize: "0.76rem", color: "#777", marginBottom: 6 }}>
                      💡 Câu hỏi gợi ý liên quan:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {msg.ragResult.suggestedQuestions.map((sugQ, sIdx) => (
                        <span
                          key={sIdx}
                          onClick={() => handleSend(sugQ)}
                          style={{
                            fontSize: "0.78rem",
                            padding: "4px 10px",
                            background: "#F0EBE1",
                            border: "1px solid #DCD3C3",
                            borderRadius: 14,
                            cursor: "pointer",
                            color: "#4A3B32",
                            transition: "background 0.2s"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#E4DCD0")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "#F0EBE1")}
                        >
                          {sugQ}
                        </span>
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
              Đang tra cứu cơ sở tri thức 23 trang Giáo trình HCM202 (Trang 142 - 164)...
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
          paddingBottom: 4
        }}
      >
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#666", alignSelf: "center", flexShrink: 0 }}>
          🔥 Câu hỏi trọng tâm:
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
          alignItems: "center"
        }}
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi cần tra cứu trong Giáo trình HCM202 (VD: Bản chất giai cấp công nhân, Dân là chủ, Tham ô lãng phí...)"
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
          <span>Hỏi RAG AI</span>
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
