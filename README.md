# Gia Phả Bếp Trưởng Chi Giáp - Họ Nguyễn Văn

Hệ thống quản lý và trực quan hóa dữ liệu gia phả trực tuyến, thiết kế theo phong cách truyền thống Việt Nam với nền vàng nhạt, họa tiết rồng chầu và câu đối thư pháp.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![React Flow](https://img.shields.io/badge/React_Flow-12-blueviolet?style=flat-square)

## 🌐 Demo

Repository: https://github.com/huyzpka-commits/giapha2

## 🎨 Giao diện

- **Bố cục 2 cột**: Sidebar điều hướng bên trái + Main View bên phải
- **Nền vàng nhạt** (`#fff9e6`) tạo cảm giác cổ điển, ấm áp
- **Họa tiết rồng chầu** ở header
- **Câu đối thư pháp dọc** hai bên lề
- **Node gia phả**: hình chữ nhật, nền đỏ, chữ vàng, hiển thị đầy đủ thông tin

## 🚀 Tính năng chính

### Sidebar Menu
- 8 module: Trang chủ, Bảng tin, Danh bạ, Sự kiện, Cây gia phả, Sách gia phả, Thành viên, Thư viện
- Bottom panel: Thông tin liên hệ + Hotline **0396818584**

### Main View
- Tiêu đề: **"GIA PHẢ BẾP TRƯỞNG CHI GIÁP - HỌ NGUYỄN VĂN"**
- Header: chuyển đổi view (Toàn cảnh / Tổ tiên / Hậu duệ), tìm kiếm, zoom, fullscreen
- Sơ đồ phả hệ top-down với đường nối ngang dọc
- Hỗ trợ **8 thế hệ** (Đời 1 - Đời 8)
- Dữ liệu mặc định: **4 thế hệ, 15 node**
- Node UI: Tên, năm sinh/mất, trạng thái (sống/mất), quan hệ (chính tộc/ngoại tộc), đời thứ
- Footer: Chú thích màu sắc theo vai trò + chỉ số zoom

### Quản lý dữ liệu (CRUD)
- Thêm thành viên mới
- Chỉnh sửa thông tin node
- Xóa node
- Thêm con, thêm vợ/chồng
- Tự động render lại sơ đồ khi dữ liệu thay đổi

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Diagram**: React Flow (`@xyflow/react`)
- **Icons**: lucide-react
- **Language**: TypeScript

## 📁 Cấu trúc project

```
giapha-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Trang chính
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── family-tree.tsx   # Layout + React Flow
│   │   ├── sidebar.tsx       # Menu 8 module
│   │   ├── header.tsx        # Header controls
│   │   ├── node-component.tsx
│   │   ├── node-editor.tsx   # CRUD form
│   │   └── legend.tsx
│   └── lib/
│       ├── types.ts
│       └── data.ts           # Data + layout engine
├── vercel.json
├── DEPLOY.md
└── README.md
```

## 💻 Chạy local

```bash
# Clone repository
git clone https://github.com/huyzpka-commits/giapha2.git
cd giapha2/giapha-app

# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt tại: http://localhost:3000

## 🚢 Deploy lên Vercel

### Cách 1: Vercel Dashboard (khuyên dùng)

1. Truy cập https://vercel.com/new
2. Đăng nhập và chọn repository `huyzpka-commits/giapha2`
3. Framework Preset: **Next.js**
4. Nhấn **Deploy**

### Cách 2: Vercel CLI

```bash
npx vercel login
npx vercel --prod
```

## ✅ Scripts

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy dev server với Turbopack |
| `npm run build` | Build production |
| `npm run start` | Chạy production build |
| `npm run lint` | Kiểm tra ESLint |

## ⚠️ Lưu ý

Dữ liệu gia phả hiện tại được lưu trong **React state (in-memory)**. Khi reload trang, dữ liệu sẽ quay về 15 node mặc định. Để lưu trữ lâu dài, cần tích hợp thêm:
- LocalStorage (đơn giản)
- Vercel Postgres / Supabase / Cloudflare D1 (persistent)

## 📞 Liên hệ

Hotline: **0396818584**
