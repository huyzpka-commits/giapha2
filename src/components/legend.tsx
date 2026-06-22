export function Legend() {
  const items = [
    { color: "bg-[#b91c1c]", label: "Nam (Chính tộc)" },
    { color: "bg-[#db2777]", label: "Nữ (Chính tộc)" },
    { color: "bg-[#7c3aed]", label: "Ngoại tộc (Vợ/chồng)" },
    { color: "bg-[#b91c1c] border-2 border-dashed border-white", label: "Đã mất (ghi chú)" },
  ];

  return (
    <footer className="flex flex-wrap items-center justify-center gap-4 px-4 py-3 bg-[#fff9e6]/95 border-t border-[#d4a017]/40 text-xs">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`w-4 h-4 rounded-sm ${item.color}`} />
          <span className="text-[#3d1f00]">{item.label}</span>
        </div>
      ))}
    </footer>
  );
}
