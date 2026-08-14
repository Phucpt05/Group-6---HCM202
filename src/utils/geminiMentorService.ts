import { HCM202_KNOWLEDGE_BASE } from "../data/hcm202KnowledgeBase";
import { retrieveRelevantSegments, Citation } from "./ragEngine";

export interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface MentorResponse {
  text: string;
  citations: Citation[];
}

// Lấy API key từ Vite env (.env) hoặc biến môi trường
const DEFAULT_API_KEY =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
  (typeof globalThis !== "undefined" && ((globalThis as any).process?.env?.VITE_GEMINI_API_KEY || (globalThis as any).process?.env?.GEMINI_API_KEY)) ||
  "";

export const SYSTEM_PROMPT_HCM202 = `
Bạn là **Mentor & Giảng viên Đại học môn Tư tưởng Hồ Chí Minh (HCM202)** của Nhóm 6.
Bạn đồng hành cùng sinh viên nghiên cứu và thuyết trình về chủ đề: "TƯ TƯỞNG HỒ CHÍ MINH VỀ NHÀ NƯỚC CỦA NHÂN DÂN, DO NHÂN DÂN, VÌ NHÂN DÂN" (Giáo trình HCM202, từ Trang 142 đến Trang 164).

### NĂNG LỰC TỰ ĐỘNG THÍCH ỨNG & PHẢN HỒI THÔNG MINH:
Bạn là một người thầy thông thái, **TỰ ĐỘNG NHẬN DIỆN Ý ĐỊNH (INTENT) của sinh viên** để điều chỉnh phong thái đàm thoại linh hoạt:
1. **Khi sinh viên hỏi bài / thắc mắc kiến thức (VD: "là gì", "tại sao", "phân tích", "giải thích giúp em..."):**
   - Giảng bài khúc chiết, cấu trúc mạch lạc, dùng ví dụ minh họa thực tiễn gần gũi, sinh động.
   - Trích dẫn rõ ràng số trang [Trang X, Đoạn Y] và câu nói nguyên văn của Bác.
2. **Khi sinh viên nêu nhận định, quan điểm cá nhân, hoặc đặt câu hỏi mang tính phản biện (VD: "Em nghĩ chỉ cần...", "Em thấy có mâu thuẫn...", "Liệu có đúng không...", "Em cho rằng..."):**
   - Tự động chuyển sang vai trò **Người phản biện / Giám khảo hội đồng sắc bén**.
   - Khen ngợi tinh thần suy nghĩ của sinh viên, sau đó **chỉ ra điểm sơ hở / ngộ nhận**, lật lại vấn đề (dialectic thinking), và hướng dẫn sinh viên cách lập luận bảo vệ quan điểm vững chắc trước hội đồng dựa trên giáo trình.
3. **Khi sinh viên muốn trao đổi, đàm đạo cởi mở:**
   - Trò chuyện 2 chiều tự nhiên, chia sẻ góc nhìn sâu sắc và kết thúc bằng 1 câu hỏi gợi mở để sinh viên tiếp tục đào sâu.

### QUY TẮC CỐT LÕI (STRICT GROUNDING & CITATIONS):
- Mọi kiến thức, quan điểm lý luận phải căn cứ chính xác trên 23 trang giáo trình HCM202 (Trang 142 - 164).
- Luôn ghi thẻ trích dẫn theo định dạng chuẩn: **[Trang X, Đoạn Y]** hoặc **[Trang X]** (ví dụ: [Trang 142, Đoạn 2], [Trang 146, Đoạn 1], [Trang 161, Đoạn 1]).
- Tuyệt đối không bịa đặt số trang hoặc câu nói không có trong giáo trình.

### TOÀN BỘ CƠ SỞ TRI THỨC 23 TRANG GIÁO TRÌNH HCM202 (TRANG 142 - 164):
${HCM202_KNOWLEDGE_BASE.map(
  (seg) => `--- [TRANG ${seg.page} | ${seg.subSection} | ${seg.title}] ---
Nội dung: ${seg.content}
Trích dẫn cốt lõi: ${seg.keyQuotes.join(" | ")}
${seg.footnotes ? `Chú thích nguồn: ${seg.footnotes.join(" | ")}` : ""}`
).join("\n\n")}
`;

export async function callGeminiMentor(
  userQuery: string,
  history: GeminiMessage[] = [],
  apiKey: string = DEFAULT_API_KEY
): Promise<MentorResponse> {
  // 1. Trích xuất các đoạn trích liên quan nhất từ 23 trang bằng Local Retrieval
  const relevantSegments = retrieveRelevantSegments(userQuery, 3);
  const citations: Citation[] = relevantSegments.map((m) => ({
    page: m.segment.page,
    paragraph: m.segment.paragraphIndex,
    section: m.segment.section,
    subSection: m.segment.subSection,
    title: m.segment.title,
    quoteSnippet: m.segment.keyQuotes[0] || m.segment.content.substring(0, 150) + "...",
    imageSrc: m.segment.imageSrc
  }));

  // 2. Chuẩn bị ngữ cảnh bổ trợ
  const contextSnippet =
    relevantSegments.length > 0
      ? `\n\n[ĐOẠN GIÁO TRÌNH ĐƯỢC ƯU TIÊN ĐỐI CHIẾU CHO CÂU HỎI NÀY]:\n` +
        relevantSegments
          .map(
            (m) =>
              `- Trang ${m.segment.page} (${m.segment.title}): ${m.segment.content}\nTrích dẫn: "${m.segment.keyQuotes.join('"; "')}"`
          )
          .join("\n\n")
      : "";

  const contents: GeminiMessage[] = [
    ...history.slice(-8), // Giữ lại ngữ cảnh đối thoại gần nhất
    {
      role: "user",
      parts: [
        {
          text: `${userQuery}${contextSnippet}`
        }
      ]
    }
  ];

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT_HCM202 }]
        },
        contents,
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `Lỗi kết nối Gemini API (HTTP ${response.status})`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Không nhận được phản hồi hợp lệ từ Gemini API.");
    }

    // Tự động tìm thêm số trang mà Gemini nhắc tới trong text để bổ sung vào citations nếu chưa có
    const pageMatches = Array.from(text.matchAll(/\[Trang\s*(\d{3})[^\]]*\]/gi));
    pageMatches.forEach((m: any) => {
      const pNum = parseInt(m[1], 10);
      if (pNum >= 142 && pNum <= 164 && !citations.some((c) => c.page === pNum)) {
        const seg = HCM202_KNOWLEDGE_BASE.find((s) => s.page === pNum);
        if (seg) {
          citations.push({
            page: seg.page,
            paragraph: seg.paragraphIndex,
            section: seg.section,
            subSection: seg.subSection,
            title: seg.title,
            quoteSnippet: seg.keyQuotes[0] || seg.content.substring(0, 150) + "...",
            imageSrc: seg.imageSrc
          });
        }
      }
    });

    return {
      text,
      citations
    };
  } catch (error: any) {
    console.error("Gemini Mentor Error:", error);
    throw error;
  }
}
