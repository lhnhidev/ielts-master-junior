# Hướng dẫn thành phần

Mỗi mục nói người dùng (code) cung cấp gì, quy cách và điều không được làm. Giá trị cụ thể xem `README.md` và `tokens.json`.

## Màn hình: desktop, đã tải

Màn hình chính ở 1280px, đã tải dữ liệu: thanh trên cùng, tiêu đề, dòng phụ và bảng 4 bài trong một Card.

Người dùng cung cấp danh sách bài (tên, hạn nộp, trạng thái, thông tin phụ). Giữ nguyên thứ tự dữ liệu. Khung nội dung rộng tối đa `container-max` 960px, canh giữa; hàng cao `row-height` 64px; tên bài (`item-title`) là chữ nổi nhất. Danh sách vào theo stagger 40ms (xem `MotionNotes`).

- Không thêm bộ lọc, tìm kiếm, sidebar hay phân trang.
- Không đổi thứ tự hoặc gộp "Nộp trễ" vào "Đã nộp".

## Màn hình: mobile, đã tải

Màn hình 390px, đã tải dữ liệu: mỗi bài là một thẻ, không cuộn ngang.

Thứ tự trong thẻ: tên bài (`item-title`), "Hạn nộp" cùng ngày (`meta`), badge trạng thái ở dòng riêng, thông tin phụ ngay dưới. Thẻ cách nhau `space-3` 12px, padding `space-4` 16px, lề trang 16px. Mọi vùng chạm tối thiểu 44px.

- Đừng nén badge cạnh tên bài; badge luôn ở dòng riêng để dễ thấy.
- Dưới 640px dùng thẻ, từ 640px trở lên dùng bảng; cùng một nguồn dữ liệu.

## Màn hình: đang tải

Màn hình đang tải ở desktop: Skeleton có đúng hình dạng nội dung thật.

Giữ tiêu đề trang và tiêu đề cột; dòng phụ và 4 hàng thành khối `skeleton`. Mỗi hàng Skeleton cao đúng `row-height` 64px (tên bài 16px, ngày 14px, badge 24px, thông tin phụ 14px) để lúc nội dung về, fade 150ms, bố cục không nhảy.

- Đặt `aria-busy="true"` trên vùng chứa và một dòng chữ ẩn "Đang tải bài tập" (`role="status"`).
- Không dùng spinner. Với `prefers-reduced-motion`, bỏ hiệu ứng nhấp nháy.

## Màn hình: rỗng

Màn hình rỗng ở desktop: một Card với ô biểu tượng và đúng một dòng "Bạn chưa có bài tập nào".

Tiêu đề trang và dòng phụ vẫn hiện. Card thay chỗ bảng; padding dọc `space-16` 64px; ô biểu tượng 48px nền `page`, viền `border`, icon `ClipboardList` màu `ink-muted`.

- Không thêm dòng phụ, nút hay minh họa.

## Màn hình: lỗi

Màn hình lỗi ở desktop: một Alert thân thiện thay cho bảng, kèm nút "Thử lại".

Người dùng cung cấp hàm thử lại (gọi lại việc tải danh sách). Câu chữ: "Chưa tải được bài tập của bạn" / "Kết nối bị gián đoạn. Vui lòng thử lại sau ít phút." Không dùng thuật ngữ kỹ thuật hay mã lỗi.

- Một hành động duy nhất: Thử lại. Nút cao 44px, nền `accent`, có vòng focus 2px.
- Đưa focus vào nút khi Alert xuất hiện chỉ nếu là kết quả của hành động người dùng.

## Badge

Badge trạng thái: bốn biến thể Đã nộp, Chưa nộp, Quá hạn, Nộp trễ, luôn có chữ và icon nhỏ, không chỉ dựa vào màu.

Người dùng cung cấp biến thể (`done`, `todo`, `overdue`, `late`). Cao 24px, padding ngang `space-2` 8px, icon 14px cách chữ `space-1` 4px, chữ `label` 13px, bo `radius-md`. Màu theo cặp `status-*-bg` / `status-*-ink`; tất cả đạt AA (Nộp trễ 4.5:1 là mức thấp nhất, đừng giảm cỡ chữ).

- "Nộp trễ" là badge thứ hai đặt cạnh "Đã nộp" (khe 8px), không thay thế nó. Chỉ xuất hiện khi bài đã nộp sau hạn.
- "Quá hạn" chỉ dành cho bài chưa nộp và đã qua hạn.
- Không dùng màu tùy ý; không bỏ icon.

## Card

Card: bề mặt trắng viền mảnh, dùng làm thẻ bài trên mobile, khung bọc bảng desktop và khung trạng thái rỗng.

Người dùng cung cấp nội dung bên trong. Nền `surface`, viền 1px `border`, bo `radius-md`, bóng `shadow-card`. Thẻ bài padding `space-4` 16px; thứ tự: tên bài, "Hạn nộp" và ngày, badge ở dòng riêng, thông tin phụ.

- Không thêm viền màu một bên, không đổ bóng đậm hơn.
- Khi bọc bảng, bỏ padding và để Card cắt góc (`overflow-hidden`).

## Table

Table: bảng bài tập trên desktop, gọn và thoáng, hàng cao 64px.

Người dùng cung cấp các hàng. Cột: Tên bài (co giãn), Hạn nộp 176px, Trạng thái 288px. Tiêu đề cột `label` màu `ink-muted`, cao 44px; lề trong 24px; đường ngăn 1px `border`; rê chuột nền `page`. Ô Trạng thái gồm badge và thông tin phụ ngay dưới.

- Tên bài `item-title` là chữ nổi nhất; ngày hạn nộp `meta` màu `ink`, số đều.
- Chỉ dùng từ 640px trở lên; dưới đó chuyển sang thẻ (`Card`).

## Skeleton

Skeleton: khối giữ chỗ cho trạng thái đang tải, mô phỏng đúng hình dạng và kích thước nội dung thật.

Người dùng cung cấp kích thước từng khối (theo phần của hàng thật). Nền `skeleton`, bo `radius-md`, nhấp nháy nhẹ (opacity 1 → 0.55, 1.6s) và dừng khi `prefers-reduced-motion`.

- Mỗi hàng Skeleton cao bằng hàng thật (64px) để bố cục không nhảy.
- Không đặt chữ lên Skeleton.

## Alert

Alert: thông báo lỗi tải, thân thiện, với một hành động duy nhất là nút "Thử lại".

Người dùng cung cấp tiêu đề, mô tả và hàm thử lại. Nền `surface`, viền `border`, icon cảnh báo trong ô 40px (`status-overdue-bg` / `status-overdue-ink`). Desktop: icon, chữ, nút nằm một hàng; mobile: xếp dọc, nút rộng hết khung. Nút cao 44px, nền `accent`, chữ `on-accent`, hover `accent-hover`, focus-visible vòng 2px `accent` cách 2px.

- Đặt `role="alert"`. Không mã lỗi hay thuật ngữ kỹ thuật.
- Không thêm nút thứ hai.

## Chuyển động

Chú thích chuyển động cho trang, kèm mô phỏng có nút "Phát lại".

Cài đặt: stagger 40ms mỗi dòng, mỗi dòng 200ms, trượt 8px và hiện dần; badge "Nộp trễ" bật scale 0.95 → 1; Skeleton chuyển sang nội dung bằng fade 150ms; luôn bọc trong `prefers-reduced-motion` để tắt hiệu ứng.

- Không thêm chuyển động nào ngoài các mục này.
