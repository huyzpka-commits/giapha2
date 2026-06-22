"use client";

import {
  Home,
  Newspaper,
  Contact,
  CalendarDays,
  TreePine,
  BookOpen,
  Users,
  Library,
  Phone,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Trang chủ" },
  { icon: Newspaper, label: "Bảng tin" },
  { icon: Contact, label: "Danh bạ" },
  { icon: CalendarDays, label: "Sự kiện" },
  { icon: TreePine, label: "Cây gia phả" },
  { icon: BookOpen, label: "Sách gia phả" },
  { icon: Users, label: "Thành viên" },
  { icon: Library, label: "Thư viện" },
];

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="flex flex-col w-64 h-full bg-[#7f1d1d] text-[#fef3c7] border-r-4 border-[#d4a017] shadow-xl">
      <div className="p-6 text-center border-b border-[#d4a017]/40">
        <h2 className="text-2xl font-bold text-[#facc15] tracking-wider uppercase">
          Gia Phả
        </h2>
        <p className="text-xs mt-1 text-[#fde68a]">Bếp Trưởng Chi Giáp</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeItem === item.label;
            return (
              <li key={item.label}>
                <button
                  onClick={() => onItemClick?.(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    active
                      ? "bg-[#facc15] text-[#7f1d1d] font-semibold"
                      : "hover:bg-[#991b1b] hover:text-[#facc15]"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-5 border-t border-[#d4a017]/40 bg-[#6a1818]">
        <div className="flex items-center gap-3 text-[#fde68a]">
          <Phone className="w-5 h-5 shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-wide">Hotline</p>
            <p className="text-lg font-bold text-[#facc15]">0396818584</p>
          </div>
        </div>
        <p className="text-[10px] mt-3 text-[#fde68a]/80 leading-relaxed">
          Liên hệ ban quản lý gia phả để cập nhật thông tin thành viên.
        </p>
      </div>
    </aside>
  );
}
