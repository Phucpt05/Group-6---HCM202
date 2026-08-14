import { HCM202_KNOWLEDGE_BASE, KnowledgeSegment } from "../data/hcm202KnowledgeBase";

export interface Citation {
  page: number;
  paragraph: number;
  section: string;
  subSection: string;
  title: string;
  quoteSnippet: string;
  imageSrc: string;
}

export interface RAGAnswer {
  query: string;
  answerMarkdown: string;
  isGrounded: boolean;
  citations: Citation[];
  suggestedQuestions?: string[];
}

function removeAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

function tokenize(text: string): string[] {
  const clean = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’“”]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean.split(" ").filter((w) => w.length > 1);
}

// Stop words tiếng Việt phổ biến không mang nghĩa trọng tâm
const VIETNAMESE_STOPWORDS = new Set([
  "là", "của", "và", "những", "các", "có", "trong", "với", "được", "cho",
  "đã", "thì", "mà", "như", "để", "ở", "ra", "này", "về", "lại", "nào",
  "gì", "sao", "thế", "như_thế_nào", "hỏi", "cho_biết", "xin", "hãy", "bạn",
  "tôi", "hôm", "nay", "làm", "nhé", "ơi", "ạ", "thế_nào", "bao", "nhiêu",
  "khi", "nào", "đâu", "ai", "thế_nào", "ra_sao", "đi", "đến"
]);

export function retrieveRelevantSegments(
  query: string,
  topK: number = 3
): { segment: KnowledgeSegment; score: number }[] {
  const rawTokens = tokenize(query);
  const meaningfulTokens = rawTokens.filter((t) => !VIETNAMESE_STOPWORDS.has(t) && t.length > 1);
  const normalizedQuery = removeAccents(query);
  const normalizedTokens = tokenize(normalizedQuery).filter(
    (t) => !VIETNAMESE_STOPWORDS.has(t) && t.length > 1
  );

  if (meaningfulTokens.length === 0 && normalizedTokens.length === 0) {
    return [];
  }

  // Tạo cụm từ 2 từ liên tiếp (bigrams) từ câu hỏi
  const bigrams: string[] = [];
  for (let i = 0; i < rawTokens.length - 1; i++) {
    bigrams.push(`${rawTokens[i]} ${rawTokens[i + 1]}`);
  }
  const normBigrams: string[] = [];
  const rawNormTokens = tokenize(normalizedQuery);
  for (let i = 0; i < rawNormTokens.length - 1; i++) {
    normBigrams.push(`${rawNormTokens[i]} ${rawNormTokens[i + 1]}`);
  }

  const scoredSegments = HCM202_KNOWLEDGE_BASE.map((seg) => {
    let score = 0;
    let directMatchedCount = 0;

    const segTextLower = seg.content.toLowerCase();
    const segTitleLower = seg.title.toLowerCase();
    const segSubLower = seg.subSection.toLowerCase();
    const segQuotesLower = seg.keyQuotes.map((q) => q.toLowerCase()).join(" ");
    const segKwLower = seg.keywords.map((k) => k.toLowerCase()).join(" ");

    const segTextNorm = removeAccents(seg.content);
    const segTitleNorm = removeAccents(seg.title);
    const segKeyQuotesNorm = seg.keyQuotes.map(removeAccents).join(" ");
    const segKeywordsNorm = seg.keywords.map(removeAccents).join(" ");

    // 1. Exact full query phrase match
    if (segTitleLower.includes(query.toLowerCase())) score += 50;
    if (segTextLower.includes(query.toLowerCase())) score += 40;
    if (segTitleNorm.includes(normalizedQuery)) score += 40;
    if (segTextNorm.includes(normalizedQuery)) score += 30;

    // 2. Bigrams match (cụm 2 từ liền nhau)
    bigrams.forEach((bg) => {
      if (segTitleLower.includes(bg)) { score += 15; directMatchedCount++; }
      if (segKwLower.includes(bg)) { score += 12; directMatchedCount++; }
      if (segQuotesLower.includes(bg)) { score += 10; directMatchedCount++; }
      if (segTextLower.includes(bg)) { score += 8; directMatchedCount++; }
    });

    normBigrams.forEach((nbg) => {
      if (segTitleNorm.includes(nbg)) { score += 10; }
      if (segKeywordsNorm.includes(nbg)) { score += 8; }
      if (segKeyQuotesNorm.includes(nbg)) { score += 6; }
      if (segTextNorm.includes(nbg)) { score += 4; }
    });

    // 3. Meaningful individual tokens
    meaningfulTokens.forEach((token) => {
      const tLower = token.toLowerCase();
      // Yêu cầu từ đơn phải khớp chính xác trong từ khóa hoặc tiêu đề hoặc trích dẫn
      const wordRegex = new RegExp(`(^|\\s|[.,!?;:"'()])(${escapeRegex(tLower)})($|\\s|[.,!?;:"'()])`, "i");
      let hit = false;

      if (seg.keywords.some((k) => k.toLowerCase() === tLower || wordRegex.test(k))) {
        score += 5;
        hit = true;
      }
      if (wordRegex.test(seg.title)) {
        score += 4;
        hit = true;
      }
      if (seg.keyQuotes.some((q) => wordRegex.test(q))) {
        score += 3;
        hit = true;
      }

      if (hit) {
        directMatchedCount++;
      }
    });

    // Zero-hallucination check: Phải có ít nhất 1 cụm bigram hoặc 2 từ đơn khớp trong từ khóa trọng tâm
    const minRequiredMatches = meaningfulTokens.length >= 3 ? 2 : 1;
    if (directMatchedCount < minRequiredMatches && !segTitleNorm.includes(normalizedQuery) && !segTextNorm.includes(normalizedQuery)) {
      score = 0;
    }

    return { segment: seg, score };
  });

  scoredSegments.sort((a, b) => b.score - a.score);

  // Lọc chỉ lấy các đoạn có điểm đủ ý nghĩa (ngưỡng tin cậy)
  const threshold = 18;
  return scoredSegments.filter((item) => item.score >= threshold).slice(0, topK);
}

function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function generateRAGAnswer(query: string): RAGAnswer {
  const matches = retrieveRelevantSegments(query, 3);

  // Nếu không tìm thấy thông tin phù hợp trong 23 trang giáo trình
  if (matches.length === 0) {
    return {
      query,
      answerMarkdown: `**Thông báo kiểm định nguồn xác thực:**\n\nNội dung câu hỏi của bạn hiện **không nằm trong phạm vi tài liệu Giáo trình Tư tưởng Hồ Chí Minh (HCM202, từ Trang 142 đến Trang 164)** được cung cấp.\n\nĐể đảm bảo câu trả lời luôn trung thực, chính xác và có nguồn trích dẫn đối chứng chuẩn xác, hệ thống **tuyệt đối không bịa đặt hoặc dùng nguồn ngoài**.\n\n**Bạn có thể tra cứu các chủ đề trọng tâm sau:**\n- **Bản chất giai cấp công nhân** và sự thống nhất với tính nhân dân, tính dân tộc *(Trang 142 - 144)*\n- **Nhà nước của nhân dân, do nhân dân, vì nhân dân** *(Trang 145 - 150)*\n- **Nhà nước pháp quyền**, thượng tôn pháp luật & pháp quyền nhân nghĩa *(Trang 151 - 157)*\n- **Kiểm soát quyền lực nhà nước** & phòng chống tiêu cực (tham ô, lãng phí, quan liêu, tư túng...) *(Trang 157 - 164)*`,
      isGrounded: false,
      citations: [],
      suggestedQuestions: [
        "Bản chất giai cấp công nhân của Nhà nước thể hiện qua những phương diện nào?",
        "Vì sao Hồ Chí Minh khẳng định 'Dân là chủ' và 'Dân làm chủ'?",
        "Hồ Chí Minh chỉ ra những căn bệnh tiêu cực nào và giải pháp phòng chống?",
        "Thế nào là 'Pháp quyền nhân nghĩa' theo tư tưởng Hồ Chí Minh?"
      ]
    };
  }

  // Thu thập citations
  const citations: Citation[] = matches.map((m) => ({
    page: m.segment.page,
    paragraph: m.segment.paragraphIndex,
    section: m.segment.section,
    subSection: m.segment.subSection,
    title: m.segment.title,
    quoteSnippet: m.segment.keyQuotes[0] || m.segment.content.substring(0, 150) + "...",
    imageSrc: m.segment.imageSrc
  }));

  const primary = matches[0].segment;
  const secondary = matches.length > 1 ? matches[1].segment : null;
  const tertiary = matches.length > 2 ? matches[2].segment : null;

  // Xây dựng câu trả lời có cấu trúc và trích dẫn chuẩn
  let answerLines: string[] = [];

  answerLines.push(`### Trả lời dựa trên Giáo trình HCM202 (Trang ${primary.page}):\n`);
  answerLines.push(`**${primary.title}** (${primary.subSection}):\n`);
  answerLines.push(primary.content);

  if (primary.keyQuotes && primary.keyQuotes.length > 0) {
    answerLines.push(`\n> **Trích dẫn nguyên văn:**\n> "${primary.keyQuotes.join('"\n> "')}"\n`);
  }

  if (secondary && secondary.page !== primary.page) {
    answerLines.push(`\n---\n#### Nội dung liên quan bổ trợ (Trang ${secondary.page}):\n`);
    answerLines.push(`**${secondary.title}**: ${secondary.content}`);
    if (secondary.keyQuotes && secondary.keyQuotes.length > 0) {
      answerLines.push(`\n> **Trích dẫn:** "${secondary.keyQuotes[0]}"`);
    }
  }

  if (tertiary && tertiary.page !== primary.page && tertiary.page !== secondary?.page) {
    answerLines.push(`\n---\n#### Điểm nhấn mở rộng (Trang ${tertiary.page}):\n`);
    answerLines.push(`**${tertiary.title}**: ${tertiary.content}`);
  }

  return {
    query,
    answerMarkdown: answerLines.join("\n"),
    isGrounded: true,
    citations,
    suggestedQuestions: getRelatedQuestions(primary.page)
  };
}

function getRelatedQuestions(page: number): string[] {
  if (page <= 144) {
    return [
      "Tại sao Nhà nước ta mang bản chất giai cấp công nhân nhưng lại có tính nhân dân và tính dân tộc sâu sắc?",
      "Đảng Cộng sản Việt Nam cầm quyền bằng những phương thức nào theo trang 142?",
      "Nhà nước của nhân dân theo nguyên lý 'Dân là chủ' được hiểu thế nào?"
    ];
  } else if (page <= 150) {
    return [
      "Phân biệt giữa Dân chủ trực tiếp và Dân chủ gián tiếp (Trang 145-146)?",
      "Hồ Chí Minh yêu cầu người cán bộ vừa là 'đầy tớ', vừa là 'người lãnh đạo' như thế nào?",
      "Khi nào nhân dân có quyền bãi miễn đại biểu và 'đuổi Chính phủ'?"
    ];
  } else if (page <= 157) {
    return [
      "Quá trình xây dựng Nhà nước hợp hiến, hợp pháp qua Tổng tuyển cử 6/1/1946 (Trang 151-152)?",
      "Khái niệm 'Pháp quyền nhân nghĩa' của Hồ Chí Minh có nội dung gì nổi bật?",
      "Tính nghiêm minh và tính khuyến thiện của pháp luật thể hiện ra sao?"
    ];
  } else {
    return [
      "Hồ Chí Minh chỉ ra những căn bệnh tiêu cực nào trong bộ máy Nhà nước?",
      "Vì sao bệnh quan liêu được coi là 'bệnh gốc' sinh ra tham ô, lãng phí?",
      "Các biện pháp phòng chống tiêu cực và điều kiện để kiểm soát quyền lực có hiệu quả?"
    ];
  }
}

export const POPULAR_FAQ_PROMPTS = [
  "Bản chất giai cấp công nhân của Nhà nước thể hiện qua những phương diện nào?",
  "Phân tích sự thống nhất giữa bản chất giai cấp công nhân với tính nhân dân và tính dân tộc?",
  "Vì sao Hồ Chí Minh nhấn mạnh: Quyền lực nhà nước là 'thừa ủy quyền' của nhân dân?",
  "Thước đo một Nhà nước vì dân là gì?",
  "Ý nghĩa của cuộc Tổng tuyển cử ngày 6/1/1946 và bản Hiến pháp 1946?",
  "Phân tích đặc điểm 'Pháp quyền nhân nghĩa' theo tư tưởng Hồ Chí Minh?",
  "Tại sao cần phải kiểm soát quyền lực nhà nước và hai điều kiện kiểm soát hiệu quả?",
  "Hồ Chí Minh phân tích các căn bệnh tiêu cực: Tham ô, lãng phí, quan liêu, tư túng ra sao?"
];
