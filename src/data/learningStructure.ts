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
    eyebrow: "Bản chất Nhà nước mới",
    title: "Bản chất giai cấp công nhân và sự thống nhất với tính nhân dân, tính dân tộc",
    segmentIds: ["p142-1", "p142-2", "p143-1", "p143-2", "p143-3", "p144-1", "p144-2"],
    keywords: ["Bản chất giai cấp công nhân", "Sự lãnh đạo của Đảng", "Tính nhân dân và dân tộc"],
    discussionQuestion: "Nếu Nhà nước mang bản chất giai cấp công nhân (một giai cấp cụ thể), làm thế nào nó có thể đồng thời đại diện rộng rãi và thuộc về toàn thể nhân dân (\"của nhân dân\") mà không rơi vào mâu thuẫn bè phái cục bộ?",
    quoteSegmentId: "p142-1",
    layout: "text-first"
  },
  {
    id: "cua-nhan-dan",
    number: "02",
    eyebrow: "Nhà nước của nhân dân",
    title: "Quyền lực tối cao thuộc về nhân dân và cơ chế thừa ủy quyền",
    segmentIds: ["p145-1", "p146-1", "p147-1"],
    keywords: ["Dân là chủ", "Dân chủ trực tiếp & gián tiếp", "Thừa ủy quyền", "Quyền bãi miễn"],
    discussionQuestion: "Nếu cán bộ nhà nước chỉ mang tư thế là 'đầy tớ', tại sao trong quản lý hành chính cán bộ lại có quyền ra lệnh, cưỡng chế và xử phạt dân? Cơ chế ủy quyền lực công giải mã mâu thuẫn này ra sao?",
    quoteSegmentId: "p145-1",
    layout: "evidence-first"
  },
  {
    id: "do-nhan-dan",
    number: "03",
    eyebrow: "Nhà nước do nhân dân",
    title: "Phân biệt 'Dân là chủ' & 'Dân làm chủ' — Nâng cao năng lực làm chủ",
    segmentIds: ["p148-1", "p148-2", "p149-1"],
    keywords: ["Dân làm chủ", "Nghĩa vụ công dân", "Năng lực làm chủ", "Giáo dục dân trí"],
    discussionQuestion: "Sự phân biệt giữa vị thế 'Dân là chủ' và bổn phận hành động 'Dân làm chủ' có ý nghĩa thực tiễn thế nào? Vì sao Hồ Chí Minh nhấn mạnh: 'Muốn làm chủ được tốt, phải có năng lực làm chủ'?",
    quoteSegmentId: "p148-1",
    layout: "quote-led"
  },
  {
    id: "vi-nhan-dan",
    number: "04",
    eyebrow: "Nhà nước vì nhân dân",
    title: "Mục tiêu phụng sự tối thượng và vai trò kép của người cán bộ",
    segmentIds: ["p149-2", "p150-1", "p150-2"],
    keywords: ["Phụng sự nhân dân", "Không đặc quyền đặc lợi", "Vừa là đầy tớ vừa là lãnh đạo"],
    discussionQuestion: "Hồ Chí Minh cho rằng cán bộ lãnh đạo có thể thực hiện những việc 'mới xem qua như là hại đến dân, nhưng thực chất là vì lợi ích lâu dài'. Cơ chế kiểm soát nào ngăn ngừa nguy cơ cán bộ lạm dụng danh nghĩa này để áp đặt chính sách chủ quan?",
    quoteSegmentId: "p150-1",
    layout: "text-first"
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
