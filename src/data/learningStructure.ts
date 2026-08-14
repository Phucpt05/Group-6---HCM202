export interface LearningSectionConfig {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  segmentIds: string[];
  keywords: string[];
  discussionQuestion: string;
  quoteSegmentId?: string;
  layout: "text-first" | "evidence-first" | "quote-led";
}

export const LEARNING_SECTIONS: LearningSectionConfig[] = [
  {
    id: "ban-chat-nha-nuoc",
    number: "01",
    eyebrow: "Bản chất Nhà nước",
    title: "Bản chất giai cấp công nhân và sự thống nhất dân tộc",
    segmentIds: ["p142-1", "p143-3", "p144-2"],
    keywords: ["Giai cấp công nhân", "Tính nhân dân", "Tính dân tộc"],
    discussionQuestion: "Nếu Nhà nước mang bản chất giai cấp công nhân, vì sao điều đó không mâu thuẫn với tính nhân dân và tính dân tộc?",
    quoteSegmentId: "p142-1",
    layout: "text-first"
  },
  {
    id: "cua-nhan-dan",
    number: "02",
    eyebrow: "Nhà nước của nhân dân",
    title: "Quyền lực tối cao thuộc về nhân dân",
    segmentIds: ["p145-1", "p146-1", "p147-1"],
    keywords: ["Dân là chủ", "Thừa ủy quyền", "Quyền bãi miễn"],
    discussionQuestion: "Khi cơ quan được nhân dân ủy quyền hoạt động chưa đúng, nhân dân có thể thực hiện quyền làm chủ bằng những cách nào?",
    quoteSegmentId: "p145-1",
    layout: "evidence-first"
  },
  {
    id: "do-nhan-dan",
    number: "03",
    eyebrow: "Nhà nước do nhân dân",
    title: "Từ vị thế làm chủ đến năng lực làm chủ",
    segmentIds: ["p148-1", "p148-2", "p149-1"],
    keywords: ["Dân làm chủ", "Nghĩa vụ công dân", "Năng lực làm chủ"],
    discussionQuestion: "Chỉ xác lập vị thế “dân là chủ” đã đủ chưa? Vì sao nhân dân còn cần năng lực làm chủ?",
    quoteSegmentId: "p148-1",
    layout: "quote-led"
  },
  {
    id: "vi-nhan-dan",
    number: "04",
    eyebrow: "Nhà nước vì nhân dân",
    title: "Phụng sự lợi ích và hạnh phúc của nhân dân",
    segmentIds: ["p149-2", "p150-1", "p150-2"],
    keywords: ["Lợi ích nhân dân", "Không đặc quyền", "Đức và tài"],
    discussionQuestion: "Dựa vào đâu để nhận biết một quyết định của Nhà nước thật sự vì dân, thay vì chỉ nhân danh lợi ích nhân dân?",
    quoteSegmentId: "p150-1",
    layout: "text-first"
  },
  {
    id: "nha-nuoc-phap-quyen",
    number: "05",
    eyebrow: "Nhà nước pháp quyền",
    title: "Hợp hiến, hợp pháp và pháp quyền nhân nghĩa",
    segmentIds: ["p151-2", "p153-1", "p155-1"],
    keywords: ["Hợp hiến, hợp pháp", "Thượng tôn pháp luật", "Pháp quyền nhân nghĩa"],
    discussionQuestion: "Vì sao một Nhà nước thượng tôn pháp luật vẫn phải bảo đảm tính nhân nghĩa trong thực thi pháp luật?",
    quoteSegmentId: "p155-1",
    layout: "evidence-first"
  },
  {
    id: "kiem-soat-quyen-luc",
    number: "06",
    eyebrow: "Kiểm soát quyền lực",
    title: "Kiểm soát quyền lực và phòng, chống tiêu cực",
    segmentIds: ["p157-2", "p160-2", "p163-1"],
    keywords: ["Kiểm soát quyền lực", "Giặc nội xâm", "Chống tiêu cực"],
    discussionQuestion: "Kiểm soát quyền lực từ trên xuống đã đủ chưa? Vì sao cần thêm sự kiểm soát từ dưới lên của nhân dân?",
    quoteSegmentId: "p160-2",
    layout: "quote-led"
  }
];

export const PRIMARY_NAV = [
  { id: "tong-quan", label: "Tổng quan" },
  { id: "noi-dung", label: "Nội dung" },
  { id: "van-dung", label: "Vận dụng" },
  { id: "dong-thoi-gian", label: "Dòng thời gian" },
  { id: "on-tap", label: "Ôn tập" }
];

export const TIMELINE_SEGMENT_IDS = ["p151-1", "p151-2", "p152-1", "p153-1"];
