import { QuestionData } from "../types/quiz";

export const QUIZ_QUESTIONS: QuestionData[] = [
  {
    id: 1,
    topic: "Bản chất giai cấp của Nhà nước mới",
    question: "Theo tư tưởng Hồ Chí Minh, bản chất giai cấp của Nhà nước Việt Nam Dân chủ Cộng hòa được xác định như thế nào?",
    options: [
      { key: "A", text: "Mang bản chất liên minh công nông trí thức không đại diện riêng cho bất cứ giai cấp nào trong xã hội." },
      { key: "B", text: "Mang bản chất giai cấp công nhân, thống nhất hài hòa với tính nhân dân và tính dân tộc sâu sắc." },
      { key: "C", text: "Mang bản chất phi giai cấp nhằm xây dựng khối đại đoàn kết toàn dân tộc vững chắc và bền vững nhất." },
      { key: "D", text: "Mang bản chất giai cấp nông dân lao động, lực lượng nòng cốt chiến đấu giải phóng toàn thể dân tộc." },
    ],
    correctAnswer: "B",
    explanation: "Trang 142-143 khẳng định Nhà nước ta mang bản chất giai cấp công nhân. Bản chất này không mâu thuẫn mà thống nhất hoàn toàn với tính nhân dân và tính dân tộc. Phương án A, C sai vì Người bác bỏ quan điểm nhà nước phi giai cấp. Phương án D sai vì dù nông dân là nòng cốt nhưng giai cấp lãnh đạo và định hướng bản chất nhà nước vẫn là giai cấp công nhân.",
  },
  {
    id: 2,
    topic: "Khái niệm “Dân là chủ” và “Dân làm chủ”",
    question: "Sự phân biệt căn bản giữa hai khái niệm \"dân là chủ\" và \"dân làm chủ\" trong tư tưởng Hồ Chí Minh được hiểu như thế nào?",
    options: [
      { key: "A", text: "\"Dân là chủ\" chỉ nghĩa vụ tuân thủ hiến pháp, còn \"dân làm chủ\" chỉ quyền lợi tham gia các kỳ tổng tuyển cử bầu ra nhà nước mới." },
      { key: "B", text: "\"Dân là chủ\" xác định vị thế của dân đối với quyền lực, còn \"dân làm chủ\" nhấn mạnh quyền lợi và nghĩa vụ thực tế của người chủ." },
      { key: "C", text: "\"Dân là chủ\" nhấn mạnh quyền kiểm soát bộ máy hành pháp, còn \"dân làm chủ\" chỉ khả năng quản trị xã hội của cán bộ công chức." },
      { key: "D", text: "\"Dân là chủ\" khẳng định vị thế công dân trong hiến pháp, còn \"dân làm chủ\" chỉ vai trò đại diện gián tiếp tại quốc hội khóa mới." },
    ],
    correctAnswer: "B",
    explanation: "Trang 148 nêu rõ: \"'Dân là chủ' xác định vị thế của nhân dân đối với quyền lực nhà nước, còn 'dân làm chủ' nhấn mạnh quyền lợi và nghĩa vụ của nhân dân với tư cách là người chủ\". Các phương án còn lại đều đánh tráo khái niệm giữa vị thế khách quan và hành động chủ quan của công dân.",
  },
  {
    id: 3,
    topic: "Vai trò kép của cán bộ trong Nhà nước vì dân",
    question: "Mối quan hệ kép giữa hai vai trò \"người lãnh đạo\" và \"người đầy tớ\" của cán bộ được Hồ Chí Minh giải quyết như thế nào?",
    options: [
      { key: "A", text: "Người lãnh đạo cần giữ sự uy nghiêm tuyệt đối trước dân, người đầy tớ cần lắng nghe ý kiến phản hồi để điều chỉnh hành vi." },
      { key: "B", text: "Người lãnh đạo cần định hướng, ra quyết định cho dân, người đầy tớ cần phục tùng vô điều kiện mọi mệnh lệnh trực tiếp từ dân." },
      { key: "C", text: "Người lãnh đạo cần có trí tuệ sáng suốt để dẫn đường, người đầy tớ cần tận tụy, chí công vô tư phục vụ lợi ích của nhân dân." },
      { key: "D", text: "Người lãnh đạo cần thực thi pháp luật nghiêm minh, người đầy tớ cần khoan hồng, nhân ái đối với mọi sai sót của quần chúng." },
    ],
    correctAnswer: "C",
    explanation: "Trang 150 chỉ rõ: Người lãnh đạo phải có trí tuệ hơn người, minh mẫn, sáng suốt, nhìn xa trông rộng. Người đầy tớ thì phải trung thành, tận tụy, cần, kiệm, liêm, chính, chí công vô tư. Các phương án khác đưa ra các cặp phạm trù không phản ánh đúng bản chất yêu cầu về \"Đức\" và \"Tài\" của Người.",
  },
  {
    id: 4,
    topic: "Trách nhiệm của Nhà nước do nhân dân",
    question: "Để nhân dân thực hiện hiệu quả vai trò trong Nhà nước \"do dân\", Hồ Chí Minh nhấn mạnh trách nhiệm nào của Nhà nước?",
    options: [
      { key: "A", text: "Tập trung phát triển kinh tế thị trường nhằm nâng cao nhanh chóng mức sống vật chất cho đại đa số quần chúng nhân dân." },
      { key: "B", text: "Coi trọng việc giáo dục và chuẩn bị tốt năng lực thực tế để nhân dân tự giác thực hiện hiệu quả quyền làm chủ." },
      { key: "C", text: "Hoàn thiện hệ thống tòa án đặc biệt nhằm trấn áp triệt để các hành vi xâm phạm đến lợi ích công cộng của xã hội." },
      { key: "D", text: "Ủy quyền toàn bộ công tác hoạch định chính sách cho tầng lớp trí thức tinh hoa để bảo đảm tính khoa học chuẩn xác." },
    ],
    correctAnswer: "B",
    explanation: "Trang 149 chỉ ra rằng Nhà nước do nhân dân cần coi trọng việc giáo dục nhân dân. Người nói: \"Muốn làm chủ được tốt, phải có năng lực làm chủ\" và Nhà nước phải chuẩn bị, bồi dưỡng năng lực làm chủ cho dân. Các phương án khác xa rời luận điểm giáo dục năng lực làm chủ này.",
  },
  {
    id: 5,
    topic: "Phương thức kiểm soát quyền lực Nhà nước",
    question: "Theo tư tưởng Hồ Chí Minh, việc kiểm soát quyền lực đối với bộ máy nhà nước phải được thực hiện bằng phương thức nào?",
    options: [
      { key: "A", text: "Kết hợp chặt chẽ việc giám sát từ các tổ chức quốc tế bên ngoài với kiểm tra hành chính định kỳ của bộ máy chuyên trách." },
      { key: "B", text: "Kết hợp đồng thời cơ chế kiểm soát chặt chẽ từ trên xuống và hoạt động giám sát, phê bình thực tế của nhân dân từ dưới lên." },
      { key: "C", text: "Kết hợp giữa việc kiểm tra tư cách đạo đức cá nhân cán bộ đảng viên với công tác thanh tra tài chính định kỳ hàng năm." },
      { key: "D", text: "Kết hợp việc trưng cầu ý kiến cử tri cả nước trước mỗi kỳ họp quốc hội với hoạt động kiểm toán độc lập của cơ quan tư pháp." },
    ],
    correctAnswer: "B",
    explanation: "Trang 158 khẳng định: \"Người còn nêu rõ hai cách kiểm soát là từ trên xuống và từ dưới lên. Người nhấn mạnh phải 'khéo kiểm soát'\" đồng thời đề cao vai trò kiểm soát của quần chúng nhân dân từ dưới lên. Các phương án khác đưa vào các chủ thể ngoại lai hoặc kỹ thuật giám sát không có trong tư tưởng của Người.",
  },
];
