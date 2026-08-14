export interface LearningSectionConfig {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  segmentIds: string[];
  keywords: string[];
  discussionQuestion: string;
  discussionAnswerPoints?: string[];
  quoteSegmentId?: string;
  layout: "text-first" | "evidence-first" | "quote-led";
}

export const LEARNING_SECTIONS: LearningSectionConfig[] = [
  {
    id: "ban-chat-nha-nuoc",
    number: "01",
    eyebrow: "Bản chất Nhà nước mới",
    title: "Bản chất giai cấp công nhân và sự thống nhất với tính nhân dân, tính dân tộc",
    segmentIds: ["p142-1", "p142-2", "p143-1", "p143-2", "p144-1", "p144-2", "p144-3"],
    keywords: ["Bản chất giai cấp công nhân", "Sự lãnh đạo của Đảng", "Tính nhân dân và dân tộc"],
    discussionQuestion: "\"Tập trung dân chủ\" nói quyền lực tối cao thuộc về nhân dân. Nhưng đoạn văn cũng nói Đảng lãnh đạo tuyệt đối Nhà nước. Vậy rốt cuộc quyền lực đang tập trung vào tay ai — vào nhân dân, hay vào Đảng? Hai cái đó có luôn là một không?",
    discussionAnswerPoints: [
      "Về mặt lý luận & nguyên tắc chính trị: Hai yếu tố thống nhất làm một — Đảng Cộng sản Việt Nam không có lợi ích riêng ngoài việc đại diện và phụng sự lợi ích tối cao của nhân dân lao động và toàn thể dân tộc.",
      "Về mặt thực tiễn & nguy cơ tiềm ẩn: Sự thống nhất này dựa trên nền tảng đạo đức cách mạng. Nếu cán bộ, đảng viên thoái hóa, biến chất, quan liêu, lạm quyền thì 'quyền lực của Đảng' và 'quyền lực của dân' có nguy cơ bị tách rời nhau, dẫn đến hiện tượng tha hóa quyền lực công.",
      "Cơ chế bảo đảm và chốt chặn quyền lực: Không thể chỉ trông chờ vào sự tự giác nội bộ của Đảng; nhân dân phải nắm giữ quyền kiểm soát tối cao từ dưới lên thông qua cơ chế giám sát, phê bình trực tiếp và quyền bãi miễn cán bộ sai phạm ('Nếu Chính phủ làm hại dân thì dân có quyền đuổi Chính phủ').",
      "Kết luận biện chứng: Quyền lực tối cao thuộc về Nhân dân (chủ thể sở hữu); Đảng là đội tiên phong giữ vai trò lãnh đạo (người dẫn đường và người đầy tớ trung thành). Mối quan hệ này chỉ bền vững khi thực thi đầy đủ cơ chế 'Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ'."
    ],
    quoteSegmentId: "p142-1",
    layout: "text-first"
  },
  {
    id: "cua-nhan-dan",
    number: "02",
    eyebrow: "Nhà nước của nhân dân",
    title: "Quyền lực tối cao thuộc về nhân dân — Dân chủ trực tiếp và đại diện",
    segmentIds: ["p145-1", "p145-2", "p146-1", "p147-1", "p147-2"],
    keywords: ["Nhà nước của nhân dân", "Dân là chủ", "Thừa ủy quyền", "Quyền bãi miễn"],
    discussionQuestion: "Nếu cán bộ là 'đầy tớ' và nhân dân là 'chủ', tại sao cán bộ lại có quyền ra lệnh, cưỡng chế và xử phạt người dân? Điều này có làm đảo ngược vị thế 'làm chủ' của dân không?",
    discussionAnswerPoints: [
      "Bản chất 'Thừa ủy quyền lực công': Cán bộ hành chính không sở hữu quyền lực cá nhân tự thân; toàn bộ thẩm quyền ra lệnh, xử phạt, cưỡng chế là do nhân dân ủy thác qua Hiến pháp và pháp luật để duy trì trật tự và bảo vệ lợi ích công.",
      "Bản chất của sự tuân thủ: Khi người dân chấp hành quyết định hành chính hợp pháp, họ đang phục tùng chính ý chí tập thể của cộng đồng (đã được luật hóa), chứ không phải phục tùng cá nhân người cán bộ.",
      "Vị thế 'Đầy tớ' là chuẩn mực công vụ: Nhấn mạnh đạo đức công bộc, tinh thần tận tụy phụng sự và trách nhiệm giải trình tuyệt đối trước dân; cấm tuyệt đối tư tưởng 'quan cách mạng' hách dịch, cậy quyền.",
      "Quyền kiểm soát và bãi miễn tối cao: Nhân dân nắm giữ toàn quyền giám sát, phê bình và bãi miễn cán bộ sai phạm, thậm chí 'nếu Chính phủ làm hại dân thì dân có quyền đuổi Chính phủ'."
    ],
    quoteSegmentId: "p145-1",
    layout: "evidence-first"
  },
  {
    id: "do-nhan-dan",
    number: "03",
    eyebrow: "Nhà nước do nhân dân",
    title: "Sự chủ động làm chủ và bổn phận công dân — Nâng cao năng lực làm chủ",
    segmentIds: ["p148-1", "p148-2", "p149-1"],
    keywords: ["Nhà nước do nhân dân", "Dân là chủ", "Dân làm chủ", "Năng lực làm chủ"],
    discussionQuestion: "Khái niệm 'Dân là chủ' và 'Dân làm chủ' khác nhau như thế nào? Vì sao Hồ Chí Minh nhấn mạnh: 'Muốn làm chủ được tốt, phải có năng lực làm chủ'?",
    discussionAnswerPoints: [
      "Phân định ranh giới khái niệm: 'Dân là chủ' xác định vị thế chủ thể sở hữu quyền lực tối cao về mặt pháp lý; 'Dân làm chủ' nhấn mạnh hành động, nghĩa vụ và năng lực thực tế của người chủ nước nhà.",
      "Bổn phận và đạo đức công dân: Quyền lợi luôn đi đôi với nghĩa vụ: tuân thủ pháp luật, giữ kỷ luật lao động, nộp thuế đầy đủ đúng hạn, bảo vệ tài sản công và tham gia xây dựng đất nước.",
      "Yêu cầu về năng lực làm chủ: Dân chủ không chỉ là lời tuyên bố hay lá phiếu bầu; muốn không bị quan liêu thao túng, người dân phải có tri thức, hiểu biết pháp luật và kỹ năng thực hành dân chủ.",
      "Trách nhiệm của Nhà nước: Nhà nước phải có nghĩa vụ giáo dục, nâng cao dân trí và tạo điều kiện pháp lý thuận lợi nhất để bồi dưỡng năng lực làm chủ thực chất cho nhân dân."
    ],
    quoteSegmentId: "p148-1",
    layout: "quote-led"
  },
  {
    id: "vi-nhan-dan",
    number: "04",
    eyebrow: "Nhà nước vì nhân dân",
    title: "Phụng sự vô điều kiện và mâu thuẫn biện chứng trong vai trò cán bộ",
    segmentIds: ["p149-2", "p150-1", "p150-2"],
    keywords: ["Nhà nước vì nhân dân", "Vừa là đầy tớ vừa là lãnh đạo", "Vừa hiền lại vừa minh", "Lợi ích lâu dài"],
    discussionQuestion: "Làm thế nào để cán bộ vừa làm tròn vai 'người đầy tớ' (tận tụy lắng nghe) vừa làm tốt vai 'người lãnh đạo' (quyết đoán dẫn đường)? Cơ chế nào ngăn chặn việc lạm dụng danh nghĩa 'lợi ích lâu dài' để làm hại dân?",
    discussionAnswerPoints: [
      "Sự thống nhất biện chứng trong vai trò cán bộ: Hai vai trò bổ sung cho nhau: chỉ làm 'đầy tớ' mà thiếu tầm nhìn lãnh đạo sẽ rơi vào mị dân, bám đuôi quần chúng; chỉ làm 'lãnh đạo' mà quên bổn phận 'đầy tớ' sẽ nhanh chóng trở thành độc đoán, quan liêu.",
      "Yêu cầu cán bộ 'Vừa hiền lại vừa minh': Phải gồm đủ cả Đức (trung thành, tận tụy, cần kiệm liêm chính, lo trước thiên hạ vui sau thiên hạ) và Tài (trí tuệ sáng suốt, nhìn xa trông rộng) để gánh vác việc chung.",
      "Cơ chế 1 — Phẩm chất 'Chí công vô tư': Mọi chính sách nhân danh lợi ích lâu dài (như thu thuế, giải phóng mặt bằng hạ tầng...) phải dựa trên cơ sở khoa học, công khai minh bạch và tuyệt đối không vụ lợi cá nhân hay nhóm.",
      "Cơ chế 2 — Dân chủ trực tiếp & Quyền bãi miễn: Phải thực hiện phương châm 'Dân biết, dân bàn, dân làm, dân kiểm tra'; nếu phát hiện cán bộ mượn danh 'lâu dài' để làm hại dân, nhân dân có quyền bãi miễn và thay thế bộ máy điều hành."
    ],
    quoteSegmentId: "p150-1",
    layout: "text-first"
  },
  {
    id: "tong-hop-moi-quan-he",
    number: "05",
    eyebrow: "Tổng hợp & Mối quan hệ biện chứng",
    title: "Sự khác biệt và Mối quan hệ biện chứng giữa ba thành tố 'Của dân, Do dân, Vì dân'",
    segmentIds: ["p150-compare", "p150-relation"],
    keywords: ["Của dân - Do dân - Vì dân", "Chủ thể quyền lực", "Vai trò xây dựng", "Mục tiêu phụng sự", "Chỉnh thể thống nhất"],
    discussionQuestion: "Nếu một nhà nước chỉ 'vì dân' (chăm lo an sinh) nhưng không 'của dân' và 'do dân' (không để dân làm chủ và kiểm soát quyền lực) thì có thể duy trì được bản chất vì dân lâu dài không?",
    discussionAnswerPoints: [
      "Nguy cơ rơi vào chế độ cai trị ban ơn (gia trưởng/chuyên chế khai sáng): Một nhà nước chỉ 'vì dân' đơn thuần mà thiếu vắng cơ chế 'của dân' và 'do dân' sẽ chỉ mang tính chất ban phát ơn huệ từ trên xuống; rất dễ bị biến tướng thành độc tài độc đoán khi đội ngũ cầm quyền thay đổi.",
      "Tính tất yếu của 'Của dân' & 'Do dân': Phải xác lập quyền lực tối cao thuộc về dân ('của dân') và trao cho dân công cụ tham gia quản trị, kiểm soát ('do dân') thì mới tạo ra áp lực và cơ chế pháp lý bắt buộc bộ máy phải luôn phục vụ lợi ích của dân ('vì dân').",
      "Mối quan hệ ba chân kiềng chỉnh thể: 'Của dân' là gốc rễ và chủ thể sở hữu quyền lực; 'Do dân' là phương thức hành động và trách nhiệm xây dựng; 'Vì dân' là mục đích phụng sự tối thượng. Ba thành tố gắn kết hữu cơ không thể tách rời.",
      "Ý nghĩa đối với Nhà nước Việt Nam mới: Đảm bảo giải quyết hài hòa mối quan hệ giữa giai cấp công nhân và khối đại đoàn kết toàn dân tộc, giữ vững bản chất dân chủ thực chất và trường tồn."
    ],
    quoteSegmentId: "p150-compare",
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
