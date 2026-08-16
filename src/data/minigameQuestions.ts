import { QUIZ_QUESTIONS } from "../constants/quizData";
import { QuestionData, QuizOption } from "../types/quiz";

const option = (key: QuizOption["key"], text: string): QuizOption => ({ key, text });

const CORE_QUESTIONS: QuestionData[] = [
  {
    id: 1,
    topic: "Nhà nước của dân",
    question: "Theo Hồ Chí Minh, quyền lực tối cao trong nước thuộc về ai?",
    options: [
      option("A", "Đảng lãnh đạo"),
      option("B", "Nhân dân"),
      option("C", "Các cơ quan tư pháp"),
      option("D", "Người đứng đầu Chính phủ"),
    ],
    correctAnswer: "B",
    explanation: "Nhân dân là chủ thể tối cao của quyền lực nhà nước; mọi quyền lực và quyền hạn đều thuộc về nhân dân.",
  },
  {
    id: 3,
    topic: "Nhà nước của dân",
    question: "Hình thức dân chủ đại diện được thực hiện chủ yếu qua cơ quan nào?",
    options: [
      option("A", "Ủy ban nhân dân"),
      option("B", "Quốc hội và Hội đồng nhân dân"),
      option("C", "Mặt trận Tổ quốc"),
      option("D", "Tòa án nhân dân"),
    ],
    correctAnswer: "B",
    explanation: "Nhân dân thực hiện dân chủ đại diện thông qua Quốc hội và Hội đồng nhân dân do mình bầu ra.",
  },
  {
    id: 5,
    topic: "Nhà nước do dân",
    question: "Nhà nước “do dân” nhấn mạnh vai trò gì của nhân dân trong việc xây dựng bộ máy?",
    options: [
      option("A", "Chỉ hưởng thụ các chính sách"),
      option("B", "Trực tiếp bầu ra và tổ chức nên Nhà nước"),
      option("C", "Chỉ thực hiện các lệnh từ trên xuống"),
      option("D", "Chỉ tham gia khi có yêu cầu"),
    ],
    correctAnswer: "B",
    explanation: "Nhà nước do dân lập nên thông qua bầu cử, đồng thời được nhân dân tham gia xây dựng và kiểm soát.",
  },
  {
    id: 6,
    topic: "Nhà nước do dân",
    question: "Nhân dân đóng thuế để duy trì hoạt động nhà nước là ví dụ cho khía cạnh nào?",
    options: [
      option("A", "Nhà nước của dân"),
      option("B", "Nhà nước do dân"),
      option("C", "Nhà nước vì dân"),
      option("D", "Nhà nước pháp trị"),
    ],
    correctAnswer: "B",
    explanation: "Nhà nước do dân đóng góp sức người, sức của để xây dựng, tổ chức và duy trì hoạt động.",
  },
  {
    id: 8,
    topic: "Nhà nước do dân",
    question: "Hồ Chí Minh yêu cầu nhân dân có nghĩa vụ gì đối với Nhà nước?",
    options: [
      option("A", "Phụ thuộc hoàn toàn"),
      option("B", "Phê bình thiếu căn cứ"),
      option("C", "Giúp đỡ, đôn đốc và kiểm soát Nhà nước"),
      option("D", "Không cần quan tâm đến chính trị"),
    ],
    correctAnswer: "C",
    explanation: "Quyền làm chủ gắn với trách nhiệm giúp đỡ, đôn đốc, phê bình và kiểm soát hoạt động của Nhà nước.",
  },
  {
    id: 10,
    topic: "Nhà nước vì dân",
    question: "Nhà nước “vì dân” đòi hỏi đội ngũ cán bộ phải có tư cách gì?",
    options: [
      option("A", "Là ông chủ trị dân"),
      option("B", "Là đầy tớ trung thành của nhân dân"),
      option("C", "Là người đứng trên pháp luật"),
      option("D", "Là người hưởng đặc lợi"),
    ],
    correctAnswer: "B",
    explanation: "Cán bộ phải tận tụy phục vụ nhân dân, không được dựa vào quyền lực để trở thành người cai trị dân.",
  },
  {
    id: 12,
    topic: "Nhà nước vì dân",
    question: "Mục tiêu cuối cùng của mọi hoạt động trong Nhà nước “vì dân” là gì?",
    options: [
      option("A", "Làm giàu cho cán bộ"),
      option("B", "Mưu cầu độc lập, tự do và hạnh phúc cho dân"),
      option("C", "Xây dựng bộ máy thật cồng kềnh"),
      option("D", "Tăng cường quyền lực cá nhân"),
    ],
    correctAnswer: "B",
    explanation: "Nhà nước vì dân lấy lợi ích, tự do và hạnh phúc của nhân dân làm mục tiêu hoạt động cao nhất.",
  },
];

const ADVANCED_POSITIONS = [2, 4, 7, 9, 11];
const advancedQuestions = QUIZ_QUESTIONS.map((question, index) => ({
  ...question,
  id: ADVANCED_POSITIONS[index],
  topic: `Câu nâng cao · ${question.topic}`,
}));

export const MINIGAME_QUESTIONS: QuestionData[] = [...CORE_QUESTIONS, ...advancedQuestions]
  .sort((first, second) => first.id - second.id);
