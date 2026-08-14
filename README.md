# Nhà nước của dân, do dân, vì dân — Tư tưởng Hồ Chí Minh (Chương 3)

Slide deck dạng web, viết bằng React + TypeScript + Vite.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ Vite in ra (thường là `http://localhost:5173`).

## Build production

```bash
npm run build
npm run preview
```

## Cấu trúc

```
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx                 # entry point, render component ra #root
    └── HoChiMinhStateSlides.tsx # component slide chính (10 slide)
```

## Điều hướng slide

- Phím mũi tên trái/phải hoặc phím cách
- Vuốt trái/phải trên mobile
- Nút mũi tên hoặc chấm tròn ở thanh điều hướng dưới màn hình

## Chỉnh sửa nội dung

Toàn bộ nội dung/slide nằm trong mảng `slides` bên trong `src/HoChiMinhStateSlides.tsx`. Mỗi slide là một JSX element độc lập — có thể sửa text, thêm/bớt slide trực tiếp trong mảng đó. Bảng màu và font khai báo ở đầu file trong object `COLORS`.
