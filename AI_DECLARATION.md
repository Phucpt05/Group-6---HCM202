# TUYÊN BỐ SỬ DỤNG TRÍ TUỆ NHÂN TẠO

## 1. Thông tin sản phẩm

- Học phần: HCM202 - Tư tưởng Hồ Chí Minh
- Nhóm thực hiện: Nhóm 6
- Chủ đề: **Tư tưởng Hồ Chí Minh về Nhà nước của nhân dân, do nhân dân, vì nhân dân**
- Loại sản phẩm: Website học tập và thuyết trình, không có backend hoặc cơ sở dữ liệu
- Ngày cập nhật bản kê khai: 14/08/2026

## 2. Công cụ AI và chức năng liên quan

| Công cụ | Mục đích sử dụng | Dữ liệu đầu vào | Kết quả được sử dụng |
| --- | --- | --- | --- |
| Google Gemini 2.5 Flash | Trợ lý học tập tùy chọn trong website | Câu hỏi người dùng, tối đa 8 tin nhắn gần nhất và các đoạn giáo trình được ưu tiên truy xuất | Câu trả lời tham khảo kèm chỉ dẫn trang để người dùng đối chiếu |
| Local RAG của dự án | Tìm đoạn giáo trình liên quan và trả lời dự phòng khi không dùng được Gemini | Câu hỏi người dùng và knowledge base trang 142-164 | Đoạn trích, trang nguồn, thông báo từ chối khi câu hỏi ngoài phạm vi |
| OpenAI Codex | Hỗ trợ phát triển sản phẩm | Mã nguồn dự án và yêu cầu thiết kế của nhóm | Phân tích codebase, refactor giao diện, tạo component/CSS, sửa lỗi, viết kiểm thử giao diện và tài liệu kỹ thuật |
| OpenAI Image Generation | Tạo hình minh họa cho phần vận dụng thực tiễn | Kịch bản ba bước và đặc tả nhân vật giả định do nhóm lựa chọn | Chuỗi ba hình 2D infographic về hồ sơ trễ hẹn, đối thoại công khai và phản hồi kết quả |

**Lưu ý:** Local RAG là thuật toán truy xuất theo từ khóa chạy trong trình duyệt, không phải một mô hình AI sinh nội dung.

## 3. Những phần có sự hỗ trợ của AI

1. **Trợ lý học tập:** Gemini tạo câu trả lời khi có `VITE_GEMINI_API_KEY`. Nếu không có khóa hoặc dịch vụ lỗi, website chuyển sang Local RAG.
2. **Thiết kế và lập trình:** Codex hỗ trợ chuyển giao diện trình chiếu cũ thành bài đọc editorial, xây dựng dark mode, timeline, minigame câu hỏi, chat nổi, responsive và accessibility.
3. **Kiểm tra kỹ thuật:** Codex hỗ trợ viết và chạy TypeScript/build cùng kịch bản smoke test trên các kích thước màn hình.
4. **Tài liệu:** Codex hỗ trợ soạn bản kê khai này và cập nhật hướng dẫn dự án.
5. **Vận dụng thực tiễn:** Codex hỗ trợ diễn đạt tình huống giả định về xử lý hồ sơ trực tuyến. Đây là phần liên hệ của Nhóm 6, không phải nội dung hay sự kiện được trích từ giáo trình.
6. **Hình ảnh vận dụng:** Công cụ tạo ảnh của OpenAI tạo chuỗi ba cảnh 2D infographic với nhân vật và bối cảnh hư cấu, không sử dụng hình ảnh của người, cơ quan hoặc sự kiện có thật. Mỗi ảnh đều được ghi nhãn AI ngay trong caption.

## 4. Nguồn học thuật và phạm vi chỉnh sửa

Nguồn học thuật gốc của website là:

- `src/data/hcm202KnowledgeBase.ts`: nội dung giáo trình từ trang 142 đến trang 164;
- `public/docs_images/`: 23 ảnh chụp trang giáo trình dùng để đối chiếu;
- `src/constants/quizData.ts`: dữ liệu câu hỏi ôn tập đã có trong dự án.

AI không được dùng để thay thế, tự thêm hoặc sửa dữ kiện học thuật trong các nguồn trên. Việc refactor chỉ thay đổi cách chọn lọc, sắp xếp và trình bày nội dung trên giao diện. Người dùng có thể mở ảnh trang giáo trình từ các nút **Đối chiếu trang**.

## 5. Những phần được giữ lại, chỉnh sửa và loại bỏ

### Giữ lại

- Knowledge base 23 trang, ảnh scan giáo trình và dữ liệu câu hỏi ôn tập;
- cơ chế Gemini, Local RAG dự phòng và nguồn đối chiếu theo trang;
- chủ đề, nội dung học thuật và nhận diện editorial của dự án.

### Chỉnh sửa với sự hỗ trợ của AI

- kiến trúc giao diện đọc cuộn, header, hero, mục lục và các section nội dung;
- cách rút gọn phần hiển thị và nhấn mạnh từ khóa phục vụ thuyết trình;
- timeline, dark mode, minigame tích hợp câu hỏi, floating chat, responsive và accessibility;
- phần vận dụng thực tiễn dưới dạng tình huống tương tác.
- ba ảnh minh họa AI tại `public/application_images/`.

### Loại bỏ

- chế độ trình chiếu 14 slide và điều hướng slide cũ theo yêu cầu của nhóm;
- phần ôn tập trắc nghiệm độc lập sau khi 5 câu hỏi được chuyển vào minigame;
- tab AI toàn trang, modal mật khẩu cũ, emoji và icon trang trí không cần thiết.

## 6. Cơ chế kiểm chứng và trách nhiệm của nhóm

- Câu trả lời được gắn với các đoạn knowledge base và chỉ dẫn trang nguồn.
- Local RAG dùng ngưỡng khớp từ khóa; khi không đủ căn cứ, hệ thống từ chối trả lời thay vì dùng nguồn ngoài.
- Website có modal mở ảnh scan để kiểm tra trích dẫn trực tiếp.
- TypeScript check, production build và smoke test được dùng để kiểm tra kỹ thuật.
- Nhóm 6 chịu trách nhiệm cuối cùng về việc đọc lại giáo trình, kiểm tra trích dẫn, nội dung thuyết trình và câu trả lời khi bảo vệ sản phẩm.

## 7. Giới hạn và rủi ro

- Gemini vẫn có khả năng diễn giải sai hoặc tạo thông tin không chính xác dù đã được cung cấp ngữ cảnh.
- Local RAG dùng đối sánh từ khóa, không phải semantic search, nên có thể bỏ sót đoạn liên quan hoặc xếp hạng chưa tối ưu.
- Trích dẫn do hệ thống gợi ý phải được đối chiếu lại với ảnh scan trước khi sử dụng trong bài nộp hoặc phần bảo vệ.
- `VITE_GEMINI_API_KEY` được đưa vào mã chạy phía trình duyệt và không thể xem là bí mật. Bản triển khai công khai cần một proxy/backend nếu muốn bảo vệ khóa.
- Website không có backend, cơ sở dữ liệu hoặc nhật ký kiểm toán câu trả lời AI.
- Tình huống vận dụng là giả định sư phạm, không phải bằng chứng về một cơ quan hay sự kiện thực tế.

## 8. Tuyên bố ngắn dùng khi nộp bài

> Nhóm 6 có sử dụng Google Gemini 2.5 Flash cho chức năng trợ lý học tập và OpenAI Codex để hỗ trợ phát triển giao diện, refactor mã nguồn, kiểm thử và soạn tài liệu. Nội dung học thuật lấy từ giáo trình HCM202 trang 142-164 và được giữ làm nguồn sự thật; nhóm chịu trách nhiệm kiểm tra lại mọi trích dẫn và kết quả do AI hỗ trợ trước khi trình bày.
