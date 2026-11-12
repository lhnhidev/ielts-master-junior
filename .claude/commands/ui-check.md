---
description: Đối chiếu giao diện với design system trong design/
---

Đối chiếu UI trong `client/` với `design/README.md`. Báo ngắn, tiếng Việt, kết luận trước.

1. Đọc `design/README.md` và `design/tokens.json`.
2. Quét mã nguồn `client/src` tìm vi phạm và liệt kê file:dòng: emoji; gradient; `dark:` hoặc dark mode; bóng đậm (`shadow-md`, `shadow-lg`, `shadow-xl`); bo góc khác `rounded-md` (10px); cỡ chữ ngoài 24/15/13px; màu thô (`#hex`, `rgb(`, màu mặc định của Tailwind như `text-gray-500`) thay vì token (`bg-page`, `text-ink-muted`, `bg-status-*`).
3. Kiểm tra từng mục: badge có chữ + icon; "Nộp trễ" là badge riêng cạnh "Đã nộp"; hàng bảng cao 64px; mobile dùng thẻ, badge ở dòng riêng, không cuộn ngang; nút "Thử lại" cao ≥ 44px và có focus ring; Skeleton cao bằng hàng thật; trạng thái rỗng chỉ một dòng "Bạn chưa có bài tập nào".
4. Kiểm tra motion: có `MotionConfig reducedMotion="user"`; stagger 40ms, 200ms/dòng, trượt 8px; badge "Nộp trễ" scale 0.95 → 1; chỉ import từ "motion/react".
5. Nếu dev server đang chạy, chụp màn hình ở 1280px và 390px bằng Playwright rồi so với `design/previews/desktop-loaded.html` và `mobile-loaded.html`. Không chạy được thì nói rõ, không bỏ qua im lặng.
6. In bảng `Hạng mục | Đạt? | Ghi chú` và liệt kê việc cần sửa. Chỉ sửa khi người dùng yêu cầu.
