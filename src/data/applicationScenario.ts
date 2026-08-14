export interface ApplicationPrinciple {
  number: string;
  keyword: string;
  action: string;
  segmentId: string;
}

export interface ApplicationChoice {
  id: string;
  label: string;
  verdict: "PHÙ HỢP NHẤT" | "CHƯA PHÙ HỢP";
  feedback: string;
}

export interface ApplicationImage {
  number: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
}

export const APPLICATION_IMAGES: ApplicationImage[] = [
  {
    number: "01",
    src: "/application_images/story-01-overdue.jpg",
    alt: "Hai cha con xem hồ sơ trực tuyến đã quá hạn trên máy tính",
    title: "Vấn đề phát sinh",
    caption: "Hồ sơ đã quá hạn nhưng tiến độ chưa được giải thích."
  },
  {
    number: "02",
    src: "/application_images/story-02-dialogue.jpg",
    alt: "Hai cha con được cán bộ giải thích công khai các bước xử lý hồ sơ",
    title: "Công khai và đối thoại",
    caption: "Cán bộ lắng nghe, làm rõ tiến độ, thời hạn và trách nhiệm."
  },
  {
    number: "03",
    src: "/application_images/story-03-feedback.jpg",
    alt: "Hai cha con nhận kết quả hồ sơ và gửi phản hồi qua điện thoại",
    title: "Theo dõi và phản hồi",
    caption: "Kết quả được cập nhật; người dân xác nhận và góp ý."
  }
];

export const APPLICATION_PRINCIPLES: ApplicationPrinciple[] = [
  {
    number: "01",
    keyword: "Dân là chủ",
    action: "Tạo cách để người dân biết, phản hồi và theo dõi việc giải quyết.",
    segmentId: "p145-1"
  },
  {
    number: "02",
    keyword: "Lợi ích của dân",
    action: "Ưu tiên tháo gỡ vướng mắc và giải thích rõ trách nhiệm phục vụ.",
    segmentId: "p150-1"
  },
  {
    number: "03",
    keyword: "Kiểm soát có hệ thống",
    action: "Ghi nhận tiến độ, đầu mối phụ trách và cơ chế kiểm tra hai chiều.",
    segmentId: "p158-1"
  },
  {
    number: "04",
    keyword: "Biến thành hành động",
    action: "Chuyển chủ trương thành quy trình công vụ có kết quả kiểm chứng được.",
    segmentId: "p164-2"
  }
];

export const APPLICATION_CHOICES: ApplicationChoice[] = [
  {
    id: "transparent",
    label: "Công khai tiến độ, thời hạn và đầu mối chịu trách nhiệm",
    verdict: "PHÙ HỢP NHẤT",
    feedback: "Phương án này đặt người dân vào vị trí chủ thể, hướng hoạt động công vụ tới lợi ích của dân và tạo điều kiện để việc kiểm soát diễn ra có hệ thống."
  },
  {
    id: "internal",
    label: "Chỉ xử lý nội bộ, thông báo khi đã có kết quả cuối cùng",
    verdict: "CHƯA PHÙ HỢP",
    feedback: "Xử lý nội bộ có thể giải quyết hồ sơ, nhưng chưa tạo điều kiện để người dân theo dõi, phản hồi và tham gia kiểm soát quá trình thực thi công vụ."
  },
  {
    id: "pause",
    label: "Tạm dừng kênh phản ánh để giảm số lượng yêu cầu",
    verdict: "CHƯA PHÙ HỢP",
    feedback: "Phương án này làm giảm khả năng phản hồi của người dân và chưa thể hiện yêu cầu đặt lợi ích của dân lên trước trong tổ chức thực hiện."
  }
];
