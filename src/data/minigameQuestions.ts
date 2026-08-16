export interface MinigameQuestion {
  id: number;
  block: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const MINIGAME_QUESTIONS: MinigameQuestion[] = [
  {
    id: 1,
    block: "Khối I · Nhà nước của dân",
    question: "Theo Hồ Chí Minh, quyền lực tối cao trong nước thuộc về ai?",
    options: ["A. Đảng lãnh đạo", "B. Nhân dân", "C. Các cơ quan tư pháp", "D. Người đứng đầu Chính phủ"],
    correctAnswer: 1
  },
  {
    id: 2,
    block: "Khối I · Nhà nước của dân",
    question: "Quyền “bãi miễn” đại biểu không xứng đáng là biểu hiện của tính chất nào?",
    options: ["A. Nhà nước của dân", "B. Nhà nước do dân", "C. Nhà nước vì dân", "D. Nhà nước pháp quyền"],
    correctAnswer: 0
  },
  {
    id: 3,
    block: "Khối I · Nhà nước của dân",
    question: "Hình thức dân chủ đại diện được thực hiện chủ yếu qua cơ quan nào?",
    options: ["A. Ủy ban nhân dân", "B. Quốc hội và Hội đồng nhân dân", "C. Mặt trận Tổ quốc", "D. Tòa án nhân dân"],
    correctAnswer: 1
  },
  {
    id: 4,
    block: "Khối I · Nhà nước của dân",
    question: "Điền từ vào chỗ trống: “Nước ta là nước dân chủ, nghĩa là nhà nước là ... của dân.”",
    options: ["A. Tài sản", "B. Công cụ", "C. Bao nhiêu quyền hạn đều là", "D. Đại diện"],
    correctAnswer: 2
  },
  {
    id: 5,
    block: "Khối II · Nhà nước do dân",
    question: "Nhà nước “do dân” nhấn mạnh vai trò gì của nhân dân trong việc xây dựng bộ máy?",
    options: ["A. Chỉ hưởng thụ các chính sách", "B. Trực tiếp bầu ra và tổ chức nên nhà nước", "C. Chỉ thực hiện các lệnh từ trên xuống", "D. Chỉ tham gia khi có yêu cầu"],
    correctAnswer: 1
  },
  {
    id: 6,
    block: "Khối II · Nhà nước do dân",
    question: "Nhân dân đóng thuế để duy trì hoạt động nhà nước là ví dụ cho khía cạnh nào?",
    options: ["A. Nhà nước của dân", "B. Nhà nước do dân", "C. Nhà nước vì dân", "D. Nhà nước pháp trị"],
    correctAnswer: 1
  },
  {
    id: 7,
    block: "Khối II · Nhà nước do dân",
    question: "Để Nhà nước thực sự “do dân”, nhân dân cần thực hiện quyền gì thường xuyên?",
    options: ["A. Kiểm soát và phê bình hoạt động của Nhà nước", "B. Quyền im lặng", "C. Quyền tự ý bãi công", "D. Quyền không cần nộp thuế"],
    correctAnswer: 0
  },
  {
    id: 8,
    block: "Khối II · Nhà nước do dân",
    question: "Hồ Chí Minh yêu cầu nhân dân có nghĩa vụ gì đối với Nhà nước?",
    options: ["A. Phụ thuộc hoàn toàn", "B. Phê bình thiếu căn cứ", "C. Giúp đỡ, đôn đốc và kiểm soát Nhà nước", "D. Không cần quan tâm đến chính trị"],
    correctAnswer: 2
  },
  {
    id: 9,
    block: "Khối III · Nhà nước vì dân",
    question: "Hồ Chí Minh khẳng định: “Việc gì có lợi cho dân, ta phải hết sức...” như thế nào?",
    options: ["A. Nghiên cứu", "B. Triển khai", "C. Làm", "D. Chú trọng"],
    correctAnswer: 2
  },
  {
    id: 10,
    block: "Khối III · Nhà nước vì dân",
    question: "Nhà nước “vì dân” đòi hỏi đội ngũ cán bộ phải có tư cách gì?",
    options: ["A. Là ông chủ trị dân", "B. Là đầy tớ trung thành của nhân dân", "C. Là người đứng trên pháp luật", "D. Là người hưởng đặc lợi"],
    correctAnswer: 1
  },
  {
    id: 11,
    block: "Khối III · Nhà nước vì dân",
    question: "Một nhà nước “vì dân” phải tuyệt đối tránh điều gì?",
    options: ["A. Thu thuế của dân", "B. Xây dựng luật pháp", "C. Đặc quyền, đặc lợi, biến thành “ông tướng trị dân”", "D. Hợp tác quốc tế"],
    correctAnswer: 2
  },
  {
    id: 12,
    block: "Khối III · Nhà nước vì dân",
    question: "Mục tiêu cuối cùng của mọi hoạt động trong Nhà nước “vì dân” là gì?",
    options: ["A. Làm giàu cho cán bộ", "B. Mưu cầu độc lập, tự do và hạnh phúc cho dân", "C. Xây dựng bộ máy thật cồng kềnh", "D. Tăng cường quyền lực cá nhân"],
    correctAnswer: 1
  }
];
