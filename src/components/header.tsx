"use client";

import { Search, ZoomIn, ZoomOut, Maximize, Fullscreen } from "lucide-react";
import { ViewMode } from "@/lib/types";

interface HeaderProps {
  title: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onFullscreen: () => void;
  zoomDisplay: string;
}

function DragonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 4c-4 0-8 2-10 6-2 4-1 8 2 11-3 1-6 4-6 8 0 3 2 6 5 7-1 2-2 4-2 7 0 6 5 11 11 11 3 0 5-1 7-3 2 2 5 3 8 3 6 0 11-5 11-11 0-3-1-5-2-7 3-1 5-4 5-7 0-4-3-7-6-8 3-3 4-7 2-11-2-4-6-6-10-6-2 0-4 1-6 2-2-1-4-2-6-2z" />
      <circle cx="24" cy="24" r="3" fill="#facc15" />
      <circle cx="40" cy="24" r="3" fill="#facc15" />
      <path d="M28 32c0 2 2 4 4 4s4-2 4-4" stroke="#facc15" strokeWidth="2" fill="none" />
      <path d="M16 14c-2-2-4-2-6 0s0 6 2 8" stroke="#facc15" strokeWidth="2" fill="none" />
      <path d="M48 14c2-2 4-2 6 0s0 6-2 8" stroke="#facc15" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function Header({
  title,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  onZoomIn,
  onZoomOut,
  onFitView,
  onFullscreen,
  zoomDisplay,
}: HeaderProps) {
  const views: { value: ViewMode; label: string }[] = [
    { value: "full", label: "Toàn cảnh" },
    { value: "ancestors", label: "Tổ tiên" },
    { value: "descendants", label: "Hậu duệ" },
  ];

  return (
    <header className="relative flex flex-col gap-3 p-4 bg-[#fff9e6]/95 border-b-2 border-[#d4a017]">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7f1d1d] via-[#facc15] to-[#7f1d1d]" />

      <div className="flex items-center justify-center gap-6 text-[#7f1d1d]">
        <DragonIcon className="w-10 h-10 text-[#b91c1c]" />
        <div className="text-center">
          <h2 className="text-xs font-serif tracking-[0.3em] uppercase text-[#b91c1c]">
            Họa tiết rồng chầu
          </h2>
          <p className="text-[10px] text-[#7f1d1d]/70 mt-0.5">Tổ tiên - Hậu duệ - Truyền thống</p>
        </div>
        <DragonIcon className="w-10 h-10 text-[#b91c1c] transform scale-x-[-1]" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-lg md:text-xl font-bold text-[#7f1d1d] text-center md:text-left uppercase tracking-wide">
          {title}
        </h1>

        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
          {views.map((v) => (
            <button
              key={v.value}
              onClick={() => onViewModeChange(v.value)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                viewMode === v.value
                  ? "bg-[#7f1d1d] text-[#facc15] border-[#7f1d1d]"
                  : "bg-white text-[#7f1d1d] border-[#d4a017] hover:bg-[#fef3c7]"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-between">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7f1d1d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm theo tên..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] placeholder:text-[#a16207] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onZoomOut}
            className="p-2 rounded-lg bg-white border border-[#d4a017] text-[#7f1d1d] hover:bg-[#fef3c7]"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={onFitView}
            className="p-2 rounded-lg bg-white border border-[#d4a017] text-[#7f1d1d] hover:bg-[#fef3c7]"
            title="Vừa màn hình"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <button
            onClick={onZoomIn}
            className="p-2 rounded-lg bg-white border border-[#d4a017] text-[#7f1d1d] hover:bg-[#fef3c7]"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={onFullscreen}
            className="p-2 rounded-lg bg-white border border-[#d4a017] text-[#7f1d1d] hover:bg-[#fef3c7]"
            title="Toàn màn hình"
          >
            <Fullscreen className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-[#7f1d1d] min-w-[48px] text-right">
            {zoomDisplay}
          </span>
        </div>
      </div>
    </header>
  );
}
