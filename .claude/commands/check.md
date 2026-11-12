---
description: Kiểm tra toàn bộ trước khi nộp
---

Kiểm tra theo đúng thứ tự sau. Báo ngắn, tiếng Việt.

1. Chạy typecheck, lint (nếu có), test và build cho cả `server` và `client`. Dừng ở lỗi đầu tiên và báo ngắn.
2. Chạy bài E2E Playwright. Xác nhận ảnh `docs/screenshot.png` được tạo.
3. Gọi API `/api/assignments` và đối chiếu với bảng kết quả bắt buộc (A01 Chưa nộp; A02 Quá hạn; A03 Đã nộp; A04 Đã nộp + Nộp trễ). In bảng `ID | Trạng thái mong đợi | Thực tế | OK?`. Xác nhận B01 không xuất hiện.
4. Kiểm tra `?studentId=S02` không làm đổi dữ liệu trả về.
5. Kiểm tra README có đủ: cách chạy, cách kiểm tra, phần chưa làm, mô tả cách tránh lộ dữ liệu S02, và có 1 ảnh giao diện.
6. Kiểm tra không có secrets, `.env`, dữ liệu thật trong repo.
7. Kết luận ngắn, kèm điểm ước tính theo thang 100 (xem "Tiêu chí chấm" trong CLAUDE.md).
