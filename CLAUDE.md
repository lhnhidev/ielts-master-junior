# IELTS Master – Junior Full-Stack: "Bài tập của tôi"

## Mục tiêu và ràng buộc
- Ứng dụng nhỏ hiển thị "Bài tập của S01" (mã học viên lấy từ API) cho học viên giả lập S01. Làm trong 2–3 giờ, KHÔNG over-engineer.
- Stack: React + TypeScript + Tailwind CSS v4 (Vite) ở `client/`; Node.js + Express + TypeScript ở `server/`. Dữ liệu giả lập trong code. KHÔNG database, KHÔNG deploy, KHÔNG secrets hay dữ liệu thật.
- Thư viện bổ sung (chỉ 2): shadcn/ui (component) và Motion (animation, import từ "motion/react", KHÔNG cài framer-motion). Không thêm thư viện UI/animation nào khác.
- Test: Vitest (+ supertest cho API) và đúng 1 bài E2E bằng Playwright. Ít dependency nhất có thể.

## Business rules (nguồn sự thật duy nhất)
- Thời điểm giả lập cố định: `2026-11-11T09:00:00+07:00`, đặt trong hàm `getNow()` có thể truyền vào để test. KHÔNG dùng `new Date()` làm đáp án.
- Dữ liệu chuyển thành TypeScript, mọi mốc giờ có offset +07:00:
  - A01 / S01 / Foundation U1 – Reading / hạn 2026-11-13T23:59+07:00 / chưa nộp
  - A02 / S01 / Foundation U2 – Listening / hạn 2026-11-09T23:59+07:00 / chưa nộp
  - A03 / S01 / Foundation U3 – Writing / hạn 2026-11-10T23:59+07:00 / nộp 2026-11-10T20:00+07:00
  - A04 / S01 / Foundation U4 – Speaking / hạn 2026-11-08T23:59+07:00 / nộp 2026-11-10T12:00+07:00
  - B01 / S02 / Foundation U1 – Reading / hạn 2026-11-13T23:59+07:00 / chưa nộp
- Trạng thái:
  - Đã nộp → "Đã nộp".
  - Chưa nộp và now > hạn → "Quá hạn".
  - Chưa nộp và now ≤ hạn → "Chưa nộp".
  - Nộp sau hạn (submittedAt > dueAt) → thêm huy hiệu "Nộp trễ" (cạnh "Đã nộp").
- Kết quả bắt buộc cho S01: A01 = Chưa nộp; A02 = Quá hạn; A03 = Đã nộp; A04 = Đã nộp + Nộp trễ. B01 KHÔNG được xuất hiện.

## Bảo mật dữ liệu (điểm then chốt)
- Danh tính S01 giả lập ở server (middleware dùng `getCurrentStudent()` trong `server/src/auth.ts`). Route `GET /api/assignments` KHÔNG đọc studentId từ URL, query hay body. Lọc theo học viên ở service; client chỉ hiển thị.
- Response không chứa bản ghi của học viên khác. Trạng thái được tính ở server.
- Phải có test: gọi API kèm `?studentId=S02` vẫn chỉ trả dữ liệu S01.

## Cấu trúc gợi ý
- `server/src/`: `data.ts`, `auth.ts`, `status.ts` (logic thuần), `service.ts` (lọc + gắn trạng thái), `app.ts`, `index.ts`; `server/tests/`.
- `client/src/`: `App.tsx`, `components/AssignmentList.tsx` (bảng desktop + thẻ mobile), `components/StatusBadge.tsx`, `lib/api.ts`, `components/ui/` (shadcn).
- `e2e/` ở thư mục gốc cho Playwright. Vite proxy `/api` sang server. Thư mục gốc có script chạy chung (dev, test, typecheck, build).

## Giao diện và animation
- Dùng shadcn/ui: Card, Table, Badge, Skeleton, Alert. Đọc tốt trên desktop và mobile (bảng ở desktop, thẻ ở mobile). Nhãn UI tiếng Việt. Định dạng giờ cố định theo `Asia/Ho_Chi_Minh`.
- Có trạng thái đang tải (Skeleton), rỗng và lỗi (Alert).
- Motion: danh sách vào lần lượt (stagger), badge "Nộp trễ" bật nhẹ, chuyển Skeleton → nội dung mượt. Mỗi hiệu ứng 150–300ms. Bọc app bằng `MotionConfig reducedMotion="user"`. KHÔNG animate gì làm chậm việc đọc.
- Màu trạng thái đủ tương phản (Đã nộp: xanh lá; Chưa nộp: xám/xanh dương; Quá hạn: đỏ; Nộp trễ: cam).

## Design system (nguồn sự thật cho giao diện)
- Thư mục `design/` là thiết kế đã chốt. Trước khi làm hoặc sửa UI, đọc `design/README.md`; xem `design/previews/` (mở `index.html`) và `design/components.md` khi dựng từng thành phần. `design/tokens.json` là nguồn token; `design/tailwind-theme.css` là khối `@theme` để copy vào `client/src/index.css`.
- Phân vai: "Business rules" và "Bảo mật dữ liệu" thắng về logic; `design/` thắng về hình thức. Muốn đổi thiết kế thì hỏi người dùng trước, rồi sửa `design/` cùng lúc với code.
- Quy tắc cứng:
  - Không emoji, gradient, minh họa, dark mode, logo (chỉ wordmark chữ "IELTS Master"). Không thêm bộ lọc, tìm kiếm, sidebar, phân trang.
  - Ba cỡ chữ (24 semibold, 15 medium, 13 regular), một bo góc 10px, viền 1px kèm bóng rất nhẹ. Màu nhấn #2457A6 chỉ cho nút, liên kết, focus ring. Dùng token Tailwind (`bg-page`, `text-ink-muted`, `rounded-md`...), không viết màu thô trong component.
  - Badge luôn có chữ + icon lucide (Check, Clock, TriangleAlert); "Nộp trễ" là badge riêng cạnh "Đã nộp". Cặp màu theo `design/README.md`, không đổi.
  - Desktop (từ 768px): Table trong Card, hàng cao 64px, các cột ID bài 80px · Tên bài · Hạn nộp 160px · Thời điểm nộp 160px · Trạng thái 208px (bản gọn dưới ~860px), thông tin phụ (nếu có) nằm ngay dưới badge. Mobile: mỗi bài một Card, badge ở dòng riêng, không cuộn ngang, vùng chạm ≥ 44px.
  - Đang tải: Skeleton đúng hình dạng, hàng cao bằng hàng thật. Rỗng: đúng một dòng "Bạn chưa có bài tập nào". Lỗi: Alert + nút "Thử lại" (câu chữ ở `design/README.md`).
  - Motion: stagger 40ms/dòng, mỗi dòng 200ms, trượt 8px; badge "Nộp trễ" scale 0.95 → 1; Skeleton → nội dung fade 150ms. Code mẫu ở `design/README.md`.
- Sau khi sửa UI, chạy `/ui-check`.

## Quy trình làm việc
- Dùng đội agent toàn cục có sẵn theo quy tắc của chúng. Dự án nhỏ nên mặc định tối đa 1 lượt planner, 1 lượt builder, 1 lượt tester, 1 lượt reviewer. KHÔNG sinh thêm agent.
- Không báo "xong" khi chưa chạy `/check` thành công.
- Thay đổi nhỏ, mỗi commit một ý. Commit message tiếng Anh, ngắn.

## Tiêu chí chấm (100 điểm) — dùng làm checklist
Chạy được + code rõ (15) · API lọc đúng học viên (20) · UI đầy đủ, dễ đọc (20) · Logic 4 trường hợp (25) · Kiểm thử có kết quả (10) · README và giải thích (10). Đạt từ 70 điểm thì được xem xét.

## Quy tắc giao tiếp
- Tiếng Việt, ngắn, thân thiện. Kết luận trước, chi tiết sau. Bảng chỉ khi so sánh ≥3 mục. Không sơ đồ ASCII trừ khi thật cần.
