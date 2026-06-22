"use client";

import { Handle, Position } from "@xyflow/react";
import { NodeData } from "@/lib/types";
import { Pencil, Trash2, Plus, Heart } from "lucide-react";

export function NodeComponent({ data }: { data: NodeData }) {
  const { person, onEdit, onDelete, onAddChild, onAddSpouse, isHighlighted, isDimmed } = data;
  const isMale = person.gender === "male";
  const isSpouse = person.lineage === "matriarch" && person.spouseId;
  const isDeceased = person.status === "deceased";

  const baseBg = isSpouse ? "bg-[#7c3aed]" : isMale ? "bg-[#b91c1c]" : "bg-[#db2777]";
  const dimmedClass = isDimmed ? "opacity-40" : "opacity-100";
  const highlightClass = isHighlighted ? "ring-4 ring-[#facc15] scale-105" : "";

  const yearText = [person.birthYear, person.deathYear]
    .filter(Boolean)
    .join(" - ");

  return (
    <div
      className={`relative w-[180px] rounded-md shadow-lg overflow-hidden ${baseBg} ${dimmedClass} ${highlightClass} transition-all duration-300`}
    >
      <Handle type="target" position={Position.Top} className="!bg-[#facc15] !w-2 !h-2" />
      <div className="p-2 text-[#facc15] text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            {isSpouse ? "Ngoại tộc" : person.lineage === "patriarch" ? "Chính tộc" : "Ngoại tộc"}
          </span>
          {person.spouseId && <Heart className="w-3 h-3 fill-current" />}
        </div>
        <h3 className="text-sm font-bold leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
          {person.name}
        </h3>
        <p className="text-[10px] mt-1 text-[#fde68a]">{yearText || "Chưa rõ năm"}</p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#7f1d1d]/50 text-[#fef3c7]">
            {isDeceased ? "Đã mất" : "Còn sống"}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#facc15] text-[#7f1d1d]">
            Đời {person.generation}
          </span>
        </div>
      </div>

      <div className="absolute top-1 right-1 flex gap-0.5 opacity-80 hover:opacity-100 transition-opacity">
        <button
          onClick={() => onAddChild(person.id)}
          className="p-1 rounded bg-[#facc15] text-[#7f1d1d] hover:bg-white"
          title="Thêm con"
        >
          <Plus className="w-3 h-3" />
        </button>
        {!person.spouseId && (
          <button
            onClick={() => onAddSpouse(person.id)}
            className="p-1 rounded bg-[#facc15] text-[#7f1d1d] hover:bg-white"
            title="Thêm vợ/chồng"
          >
            <Heart className="w-3 h-3" />
          </button>
        )}
        <button
          onClick={() => onEdit(person.id)}
          className="p-1 rounded bg-[#facc15] text-[#7f1d1d] hover:bg-white"
          title="Sửa"
        >
          <Pencil className="w-3 h-3" />
        </button>
        <button
          onClick={() => onDelete(person.id)}
          className="p-1 rounded bg-[#facc15] text-[#7f1d1d] hover:bg-white"
          title="Xóa"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-[#facc15] !w-2 !h-2" />
    </div>
  );
}
