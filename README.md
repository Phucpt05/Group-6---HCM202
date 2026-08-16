# HCM202 · Nhóm 6

Website học tập và trình bày chuyên đề **“Tư tưởng Hồ Chí Minh về Nhà nước của nhân dân, do nhân dân, vì nhân dân”**.

## Minh bạch sử dụng AI

Dự án công khai công cụ, phạm vi hỗ trợ, nguồn kiểm chứng và giới hạn của AI tại [AI_DECLARATION.md](./AI_DECLARATION.md).

## Minigame tương tác

Phần **Lật mảnh ghép: Hành trình vì dân** được tích hợp từ project `minigame-hcm202`. Website chính giữ lại luật chơi 12 câu hỏi, cơ chế mở ảnh, dự đoán sự kiện và phần kết quả; giao diện được viết lại bằng React 18, TypeScript và CSS theo hệ thiết kế editorial hiện tại, không đưa thêm Tailwind hoặc Framer Motion vào dependency.

Dự án sử dụng React 18, TypeScript và Vite. Nội dung được trình bày theo dạng bài đọc editorial cô đọng, phù hợp để khám phá kiến thức và thuyết trình trực tiếp trên website.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, mặc định là `http://localhost:5173`.

Để dùng Gemini, tạo file `.env` tại thư mục gốc:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Khi không có API key hoặc Gemini không khả dụng, trợ lý tự chuyển sang Local RAG dựa trên dữ liệu giáo trình trang 142–164.

## Kiểm tra production

```bash
npm run build
npm run preview
```

## Cấu trúc chính

```text
src/
├── components/
│   ├── chat/          # Floating chat và nguồn đối chứng
│   ├── content/       # Section nội dung và tư liệu lịch sử
│   ├── home/          # Hero, tổng quan, mục lục, timeline
│   ├── layout/        # Header, progress, side indicator, footer
│   ├── review/        # Ôn tập trắc nghiệm
├── data/              # Knowledge base và cấu trúc bài học
├── hooks/             # Active section, reveal, scroll progress
├── styles/            # Design tokens và CSS theo từng khu vực
└── utils/             # Local RAG và Gemini mentor service
```
