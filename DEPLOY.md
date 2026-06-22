# Hướng dẫn deploy Gia Phả App lên Vercel

## Yêu cầu
- Tài khoản Vercel (https://vercel.com)
- Tài khoản GitHub/GitLab/Bitbucket
- Project đã được build thành công (`npm run build`)

## Cách 1: Deploy qua GitHub + Vercel Dashboard (khuyên dùng)

1. **Tạo repository trên GitHub**
   ```bash
   cd giapha-app
   git remote add origin https://github.com/<username>/giapha-app.git
   git branch -M main
   git push -u origin main
   ```

2. **Import project trên Vercel**
   - Truy cập https://vercel.com/new
   - Chọn repository `giapha-app`
   - Framework Preset: `Next.js` (Vercel sẽ tự động nhận diện)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Nhấn **Deploy**

3. **Cấu hình domain (tùy chọn)**
   - Vercel sẽ cung cấp domain `.vercel.app`
   - Có thể cấu hình domain riêng trong project settings

## Cách 2: Deploy bằng Vercel CLI

1. **Đăng nhập Vercel CLI**
   ```bash
   npx vercel login
   ```

2. **Deploy từ thư mục project**
   ```bash
   cd giapha-app
   npx vercel --prod
   ```

3. **Deploy với token (CI/CD)**
   ```bash
   npx vercel --token=<VERCEL_TOKEN> --prod
   ```

## Kiểm tra sau deploy
- Mở URL Vercel cung cấp
- Kiểm tra các chức năng: sidebar, chuyển view, tìm kiếm, zoom, CRUD node
- Nếu gặp lỗi, kiểm tra build logs trên Vercel Dashboard

## Lưu ý
- Dữ liệu gia phả hiện tại lưu trong state (in-memory). Để lưu trữ lâu dài, cần tích hợp database (D1/R2/KV trên Cloudflare hoặc Vercel Postgres/Supabase).
- `vercel.json` đã được cấu hình sẵn để nhận diện Next.js.
