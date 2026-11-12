# Design system: IELTS Master, trang "Bài tập của tôi"

Nguồn sự thật cho giao diện của repo này. Logic và dữ liệu nằm ở `CLAUDE.md`; hình thức nằm ở đây. Muốn đổi thiết kế thì sửa các file trong `design/` cùng lúc với code.

| File | Dùng để |
| --- | --- |
| `README.md` (file này) | Brand book: nội dung, màu, chữ, khoảng cách, bố cục, trạng thái, chuyển động, ánh xạ shadcn/ui, ba lựa chọn thiết kế |
| `tokens.json` | Nguồn token (màu, chữ, khoảng cách, bo góc, bóng, kích thước), mỗi token có ghi chú dùng ở đâu |
| `tokens.css` | Token biên dịch sang CSS variables, cho các bản xem thử |
| `tailwind-theme.css` | Khối `@theme` cho Tailwind v4, copy vào `client/src/index.css` |
| `components.md` | Hướng dẫn từng thành phần: Badge, Card, Table, Skeleton, Alert, các màn hình, chuyển động |
| `previews/` | Bản xem thử HTML tĩnh của 5 màn hình và các thành phần |

Giao diện trang "Bài tập của tôi" của IELTS Master: tinh tế, đơn giản, chuyên nghiệp, yên tĩnh, đáng tin. Người xem nhìn 5 giây phải biết bài nào đã xong, bài nào cần làm, bài nào trễ. Không emoji, không gradient, không minh họa, không dark mode: hệ thống chỉ có một theme `light`. Không có logo; "IELTS Master" là wordmark bằng chữ (`wordmark`, màu `ink`) trên thanh trên cùng. Đừng vẽ logo hay thay bằng biểu tượng.

Bản thiết kế này để dựng lại bằng React, Tailwind CSS v4 và shadcn/ui (Card, Table, Badge, Skeleton, Alert). Chỉ làm đúng những gì đề yêu cầu: không bộ lọc, không tìm kiếm, không sidebar, không phân trang.

## Các màn hình (bản xem thử)

Mở `design/previews/index.html` bằng trình duyệt. Mỗi màn là một file HTML tĩnh dùng `tokens.css` và `components.css`: `desktop-loaded` (1280px), `mobile-loaded` (390px; mở bằng chế độ thiết bị 390px), `desktop-loading`, `desktop-empty`, `desktop-error`. Thành phần: `badge`, `card`, `table`, `skeleton`, `alert`; chuyển động: `motion` (có nút Phát lại). Hướng dẫn từng thành phần ở `design/components.md`.

## Nội dung

Dùng đúng chữ dưới đây, không viết lại.

| Vị trí | Chữ |
| --- | --- |
| Tiêu đề trang | Bài tập của S01 (S01 lấy từ dữ liệu học viên của API, không viết cứng trong client; khi tải: "Bài tập của " + Skeleton; khi lỗi: "Bài tập") |
| Dòng phụ | Thời điểm giả lập: 11/11/2026 09:00 |
| Cột / trường mỗi bài | ID bài · Tên bài · Hạn nộp · Thời điểm nộp · Trạng thái |
| Trạng thái rỗng | Bạn chưa có bài tập nào (chỉ một dòng, không thêm dòng phụ) |
| Trạng thái lỗi | Tiêu đề "Chưa tải được bài tập của bạn", mô tả "Kết nối bị gián đoạn. Vui lòng thử lại sau ít phút.", nút "Thử lại" (đề chỉ yêu cầu thông điệp thân thiện và nút; câu chữ này do người thiết kế viết) |

Giữ nguyên thứ tự 4 bài. "Nộp trễ" là badge riêng đặt cạnh badge "Đã nộp", không thay thế nó.

| ID bài | Tên bài | Hạn nộp | Thời điểm nộp | Trạng thái | Thông tin phụ |
| --- | --- | --- | --- | --- | --- |
| A01 | Foundation U1 – Reading | 13/11/2026 23:59 | — | Chưa nộp | Còn 2 ngày |
| A02 | Foundation U2 – Listening | 09/11/2026 23:59 | — | Quá hạn | Quá hạn 1 ngày |
| A03 | Foundation U3 – Writing | 10/11/2026 23:59 | 10/11/2026 20:00 | Đã nộp | (không có) |
| A04 | Foundation U4 – Speaking | 08/11/2026 23:59 | 10/11/2026 12:00 | Đã nộp + Nộp trễ | Trễ 1 ngày |

Thông tin phụ chỉ hiện khi có ý nghĩa: "Còn N ngày" (chưa nộp), "Quá hạn N ngày" (quá hạn), "Trễ N ngày" (nộp trễ; dưới 1 ngày thì "Trễ dưới 1 ngày"); nộp đúng hạn thì không có dòng phụ. Thời điểm nộp chưa có thì hiện "—" (màu `ink-muted`).

## Bảng ghi chú

**Màu.** Nền trang `page` #F7F8FA; bề mặt `surface` #FFFFFF; viền `border` #E5E7EB; chữ chính `ink` #1F2937; chữ phụ `ink-muted` #6B7280; nhấn `accent` #2457A6. Màu nhấn chỉ dùng cho nút, liên kết và vòng focus; không bao giờ cho tên bài hay badge. Hai màu dẫn xuất ngoài đề: `skeleton` #E8EBEF và `accent-hover` #1E4A8D.

| Badge | Nền | Chữ + icon | Tương phản | Icon |
| --- | --- | --- | --- | --- |
| Đã nộp | `status-done-bg` #E7F6EC | `status-done-ink` #166534 | 6.4:1 | check |
| Chưa nộp | `status-todo-bg` #EEF2F6 | `status-todo-ink` #475569 | 6.7:1 | đồng hồ |
| Quá hạn | `status-overdue-bg` #FDECEC | `status-overdue-ink` #B42318 | 5.8:1 | cảnh báo |
| Nộp trễ | `status-late-bg` #FFF1E0 | `status-late-ink` #B45309 | 4.5:1 | đồng hồ |

Mọi cặp chữ/nền trong hệ thống đạt WCAG AA. Badge luôn có chữ và icon, không chỉ dựa vào màu.

**Cỡ chữ.** Chỉ ba cỡ.

| Cỡ | Style | Dùng cho |
| --- | --- | --- |
| 24px / 32px, semibold | `page-title` | Tiêu đề trang |
| 15px / 22px, medium | `item-title` | Tên bài (chữ nổi nhất), tiêu đề Alert, dòng trạng thái rỗng, wordmark (semibold) |
| 13px / 20px, regular | `meta` | Chữ phụ màu `ink-muted`; ID bài màu `ink-muted`; ngày hạn nộp và thời điểm nộp màu `ink`, số đều |
| 13px / 16px, medium | `label` | Chữ badge, tiêu đề cột, chữ nút (cùng cỡ 13px) |

Phông Inter, dự phòng phông hệ thống (`font-sans`).

**Khoảng cách, bo góc, bóng.** Thang 4/8px: `space-1` 4, `space-2` 8, `space-3` 12, `space-4` 16, `space-5` 20, `space-6` 24, `space-8` 32, `space-10` 40, `space-12` 48, `space-16` 64. Bo góc duy nhất `radius-md` 10px cho mọi thứ (Card, badge, Skeleton, Alert, nút). Bóng `shadow-card` rất nhẹ, luôn kèm viền 1px `border`.

**Bố cục.**

| Khu vực | Quy cách |
| --- | --- |
| Thanh trên cùng | Cao `appbar-height` 56px, nền `surface`, viền dưới 1px `border`, chỉ có wordmark |
| Khung nội dung | Rộng tối đa `container-max` 960px, canh giữa; lề ngang 32px (mobile 16px) |
| Nhịp dọc | Thanh trên → tiêu đề 40px; tiêu đề → dòng phụ 4px; dòng phụ → bảng 24px; cuối trang 64px (mobile: 24 / 4 / 20 / 32) |
| Bảng desktop | Trong một Card. Hàng tiêu đề cao 44px. Mỗi hàng bài cao `row-height` 64px. Cột: ID bài 80px · Tên bài (co giãn) · Hạn nộp 160px · Thời điểm nộp 160px · Trạng thái 208px (khung 960px cho tên bài ~288px). Dưới ~860px rộng màn hình dùng bản gọn 56 / co giãn / 104 / 104 / 196px: ngày xuống hai dòng, tên bài được xuống dòng. Lề trong hàng 24px, đệm giữa cột 12px, đường ngăn 1px `border`, hàng cuối không viền, rê chuột nền `page` |
| Ô Trạng thái | Badge ở trên, thông tin phụ (nếu có) 13px `ink-muted` ngay dưới (cách 4px); không có thông tin phụ thì badge canh giữa hàng 64px. Hai badge cạnh nhau cách 8px |
| Thẻ mobile (390px) | Mỗi bài một Card, padding 16px, cách nhau 12px, không cuộn ngang. Thứ tự từ trên xuống: ID bài (`meta`, `ink-muted`) cạnh tên bài, "Hạn nộp" + ngày, "Thời điểm nộp" + ngày hoặc "—", badge ở dòng riêng (cách 12px), thông tin phụ nếu có |
| Vùng chạm | Tối thiểu `control-height` 44px (nút Thử lại; trên mobile nút rộng hết khung) |
| Focus | Vòng 2px `accent`, cách 2px, cho mọi phần tử tương tác (`:focus-visible`); 7.0:1 trên `surface` |

**Trạng thái.**

| Trạng thái | Cách làm |
| --- | --- |
| Đang tải | Giữ tiêu đề cột; tiêu đề trang là "Bài tập của " kèm một khối Skeleton cao 32px, rộng 48px thay cho S01. Dòng phụ và 4 hàng thành Skeleton cùng kích thước thật (ID, tên bài, hai ngày, badge, thông tin phụ), mỗi hàng đúng 64px nên khi nội dung về bố cục không nhảy. Vùng chứa `aria-busy="true"` kèm chữ ẩn "Đang tải bài tập" |
| Rỗng | Một Card ở chỗ bảng: ô biểu tượng 48px (`page`, viền `border`, icon `ink-muted`) và dòng "Bạn chưa có bài tập nào" (`item-title`) |
| Lỗi | Một Alert thay cho bảng: ô icon cảnh báo (`status-overdue-bg` / `status-overdue-ink`), tiêu đề, mô tả, nút "Thử lại" (nền `accent`, chữ `on-accent`). Desktop: nút nằm bên phải; mobile: xếp dọc, nút rộng hết khung. `role="alert"` |

**Chuyển động** (chú thích; mô phỏng ở `previews/motion.html`).

| Hiệu ứng | Thông số |
| --- | --- |
| Danh sách vào | Lần lượt (stagger) 40ms mỗi dòng; mỗi dòng 200ms; trượt lên 8px và hiện dần (opacity 0 → 1); ease-out |
| Badge "Nộp trễ" | Bật nhẹ scale 0.95 → 1 cùng hiện dần, 200ms ease-out, bắt đầu 120ms sau khi dòng của nó bắt đầu vào |
| Skeleton → nội dung | Fade 150ms; hàng thật cao bằng hàng Skeleton nên không làm nhảy bố cục |
| prefers-reduced-motion | Tắt mọi animation và transition: nội dung hiện ngay, Skeleton đứng yên |

Dựng bằng Motion (`import { motion, MotionConfig } from "motion/react"`), không dùng CSS keyframes. Bọc app bằng `<MotionConfig reducedMotion="user">`.

```tsx
// hàng i của danh sách (motion.tr hoặc motion.li)
<motion.tr initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, ease: "easeOut", delay: i * 0.04 }} />
// badge "Nộp trễ"
<motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.2, ease: "easeOut", delay: i * 0.04 + 0.12 }} />
// Skeleton -> nội dung: fade 150ms, giữ nguyên chiều cao hàng 64px
```

## Ánh xạ sang shadcn/ui

| Phần giao diện | Component shadcn/ui | Tùy biến |
| --- | --- | --- |
| Khung bảng desktop, thẻ bài mobile, khung trạng thái rỗng | `Card` | Viền 1px `border`, nền `surface`, `radius-md`, `shadow-card`; bỏ padding mặc định khi bọc bảng |
| Bảng bài tập desktop | `Table`, `TableHeader`, `TableRow`, `TableHead`, `TableCell` | Hàng cao 64px, tiêu đề cột `label` màu `ink-muted`, lề trong 24px, `hover:bg-page` |
| Trạng thái và "Nộp trễ" | `Badge` | Thêm 4 variant (`done`, `todo`, `overdue`, `late`) theo bảng màu trên; cao 24px, padding ngang 8px, icon 14px (lucide `Check`, `Clock`, `TriangleAlert`), `radius-md`. "Nộp trễ" là một Badge thứ hai trong cùng hàng |
| Đang tải | `Skeleton` | Nền `skeleton`, `radius-md`; kích thước theo từng phần của hàng thật |
| Lỗi | `Alert`, `AlertTitle`, `AlertDescription` + `Button` | Alert nền `surface`, viền `border`, icon trong ô `status-overdue-bg`; Button mặc định nền `accent`, cao 44px |

Khai báo token trong Tailwind v4 (cũng có sẵn ở `design/tailwind-theme.css`; đủ để dùng `bg-page`, `text-ink-muted`, `rounded-md`, `shadow-card`):

```css
@theme {
  --color-page: #F7F8FA;  --color-surface: #FFFFFF;  --color-border: #E5E7EB;
  --color-ink: #1F2937;   --color-ink-muted: #6B7280;
  --color-accent: #2457A6; --color-accent-hover: #1E4A8D; --color-on-accent: #FFFFFF;
  --color-skeleton: #E8EBEF;
  --color-status-done-bg: #E7F6EC;    --color-status-done-ink: #166534;
  --color-status-todo-bg: #EEF2F6;    --color-status-todo-ink: #475569;
  --color-status-overdue-bg: #FDECEC; --color-status-overdue-ink: #B42318;
  --color-status-late-bg: #FFF1E0;    --color-status-late-ink: #B45309;
  --radius-md: 10px;
  --shadow-card: 0 1px 2px rgba(16, 24, 40, 0.04);
  --font-sans: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
```

## Biểu tượng

Dùng lucide (bộ icon mặc định của shadcn/ui), stroke 2px, đúng màu chữ của badge: `Check` (Đã nộp), `Clock` (Chưa nộp, Nộp trễ), `TriangleAlert` (Quá hạn, Alert lỗi), `ClipboardList` (trạng thái rỗng). Icon trang trí đặt `aria-hidden`; ý nghĩa nằm ở chữ bên cạnh. Không emoji.

## Ba lựa chọn thiết kế quan trọng nhất

Thứ nhất, trạng thái được nói bằng ba kênh cùng lúc (chữ, icon, màu) và "Nộp trễ" là badge riêng cạnh "Đã nộp": hai sự thật độc lập (đã nộp chưa, đúng hạn không) nên không bị gộp thành một nhãn, người mù màu vẫn đọc được, và mọi badge xếp thẳng một cột nên quét 5 giây là thấy ngay bài nào cần làm hay đã trễ. Thứ hai, một thứ bậc thị giác rất kiệm: chỉ ba cỡ chữ, một bán kính bo, viền mảnh thay vì bóng đậm, và màu nhấn chỉ dành cho hành động, nên tên bài là chữ nổi nhất trong hàng và giao diện giữ được vẻ yên tĩnh, đáng tin của một nền tảng giáo dục nghiêm túc. Thứ ba, cùng một mô hình dữ liệu hai cách trình bày và bốn trạng thái nhất quán: bảng trên desktop thành thẻ xếp dọc trên mobile (không cuộn ngang, badge ở dòng riêng, vùng chạm từ 44px), còn Skeleton, trạng thái rỗng và lỗi đều giữ đúng khung và chiều cao hàng của nội dung thật, nên bố cục không nhảy và người học luôn biết mình đang ở đâu và làm gì tiếp theo.
