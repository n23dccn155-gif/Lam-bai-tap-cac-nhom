# Bài Tập Nhóm 7 - Membership Registration Form

Dự án này được xây dựng theo các yêu cầu kỹ thuật:
- **Framework**: Next.js 15 (App Router)
- **Validation**: Zod + React Hook Form (2 lớp: Client & Server)
- **Server Logic**: Next.js Server Actions
- **Giao diện**: Tailwind CSS + Framer Motion (Premium UI)

## Yêu cầu đã triển khai:
1. **Phần 1: Cấu trúc & Validation**
   - Sử dụng `register` thay vì `onChange` thủ công.
   - Validation mật khẩu: >= 8 ký tự, 1 chữ hoa, 1 chữ số.
   - Sử dụng `.refine()` để xác nhận mật khẩu khớp.
2. **Phần 2: Server Handling**
   - Khai báo Server Action với directive `"use server"`.
   - Validate lại bằng `schema.safeParse()` tại Server.
   - Trả về object kết quả `{ success, message }`.

## Cách chạy dự án:
1. Di chuyển vào thư mục: `cd nhom-7`
2. Cài đặt thư viện: `npm install`
3. Chạy môi trường phát triển: `npm run dev`
4. Mở trình duyệt tại: `http://localhost:3000`

---
*Thực hiện bởi Antigravity Coding Assistant.*
