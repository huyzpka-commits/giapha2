"use client";

import { useState } from "react";
import { PersonNode, Gender, Lineage, Status } from "@/lib/types";

interface NodeEditorProps {
  isOpen: boolean;
  person?: PersonNode;
  parentId?: string;
  spouseId?: string;
  allPeople: PersonNode[];
  onClose: () => void;
  onSave: (person: PersonNode) => void;
}

function buildInitialForm(
  person: PersonNode | undefined,
  parentId: string | undefined,
  spouseId: string | undefined,
  allPeople: PersonNode[],
): PersonNode {
  if (person) {
    return { ...person };
  }

  let generation = 1;
  if (parentId) {
    const parent = allPeople.find((p) => p.id === parentId);
    generation = parent ? parent.generation + 1 : 1;
  } else if (spouseId) {
    const spouse = allPeople.find((p) => p.id === spouseId);
    generation = spouse ? spouse.generation : 1;
  }

  return {
    id: `p${Date.now()}`,
    name: "",
    birthYear: undefined,
    deathYear: undefined,
    status: "alive",
    gender: parentId ? "male" : spouseId ? "female" : "male",
    lineage: parentId ? "patriarch" : spouseId ? "matriarch" : "patriarch",
    generation,
    parentId,
    spouseId,
  };
}

export function NodeEditor({
  isOpen,
  person,
  parentId,
  spouseId,
  allPeople,
  onClose,
  onSave,
}: NodeEditorProps) {
  const [form, setForm] = useState<PersonNode>(() =>
    buildInitialForm(person, parentId, spouseId, allPeople),
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-[#fff9e6] border-2 border-[#d4a017] shadow-2xl p-6">
        <h2 className="text-lg font-bold text-[#7f1d1d] mb-4 text-center">
          {person ? "Chỉnh sửa thông tin" : "Thêm thành viên mới"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#3d1f00] mb-1">Họ tên</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#3d1f00] mb-1">Năm sinh</label>
              <input
                type="number"
                value={form.birthYear ?? ""}
                onChange={(e) =>
                  setForm({ ...form, birthYear: e.target.value ? Number(e.target.value) : undefined })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3d1f00] mb-1">Năm mất</label>
              <input
                type="number"
                value={form.deathYear ?? ""}
                onChange={(e) =>
                  setForm({ ...form, deathYear: e.target.value ? Number(e.target.value) : undefined })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#3d1f00] mb-1">Giới tính</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3d1f00] mb-1">Trạng thái</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              >
                <option value="alive">Còn sống</option>
                <option value="deceased">Đã mất</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#3d1f00] mb-1">Quan hệ</label>
              <select
                value={form.lineage}
                onChange={(e) => setForm({ ...form, lineage: e.target.value as Lineage })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              >
                <option value="patriarch">Chính tộc</option>
                <option value="matriarch">Ngoại tộc</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3d1f00] mb-1">Đời thứ</label>
              <input
                type="number"
                min={1}
                max={8}
                required
                value={form.generation}
                onChange={(e) => setForm({ ...form, generation: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3d1f00] mb-1">Ghi chú</label>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#d4a017] bg-white text-[#3d1f00] focus:outline-none focus:ring-2 focus:ring-[#facc15]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-[#d4a017] text-[#7f1d1d] hover:bg-[#fef3c7]"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-[#7f1d1d] text-[#facc15] font-semibold hover:bg-[#991b1b]"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
