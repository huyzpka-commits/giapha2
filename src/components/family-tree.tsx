"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Background,
  Edge,
  Node,
  ReactFlowInstance,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { PersonNode, ViewMode, NodeData } from "@/lib/types";
import { buildTreeLayout, initialPeople } from "@/lib/data";
import { NodeComponent } from "./node-component";
import { Header } from "./header";
import { Legend } from "./legend";
import { NodeEditor } from "./node-editor";
import { Sidebar } from "./sidebar";

const nodeTypes = {
  familyNode: NodeComponent,
};

function FlowInner({
  people,
  searchQuery,
  viewMode,
  onEdit,
  onDelete,
  onAddChild,
  onAddSpouse,
  setZoomDisplay,
  setRfInstance,
}: {
  people: PersonNode[];
  searchQuery: string;
  viewMode: ViewMode;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onAddSpouse: (personId: string) => void;
  setZoomDisplay: (z: string) => void;
  setRfInstance: (rf: ReactFlowInstance<Node<NodeData>, Edge>) => void;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { fitView, getViewport } = useReactFlow();
  const initialized = useRef(false);

  const filteredPeople = useMemo(() => {
    if (viewMode === "full") return people;
    if (viewMode === "ancestors") return people.filter((p) => p.generation <= 2);
    return people.filter((p) => p.generation >= 2);
  }, [people, viewMode]);

  useEffect(() => {
    const layout = buildTreeLayout(filteredPeople);
    const highlightIds = new Set(
      searchQuery
        ? filteredPeople
            .filter((p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((p) => p.id)
        : [],
    );

    const newNodes: Node<NodeData>[] = filteredPeople.map((person) => {
      const pos = layout.positions[person.id] ?? { x: 0, y: 0 };
      return {
        id: person.id,
        type: "familyNode",
        position: pos,
        data: {
          person,
          onEdit,
          onDelete,
          onAddChild,
          onAddSpouse,
          isHighlighted: highlightIds.has(person.id),
          isDimmed: searchQuery ? !highlightIds.has(person.id) : false,
        },
      };
    });

    const newEdges: Edge[] = [];
    for (const person of filteredPeople) {
      if (person.parentId) {
        const parent = filteredPeople.find((p) => p.id === person.parentId);
        if (parent) {
          newEdges.push({
            id: `${parent.id}-${person.id}`,
            source: parent.id,
            target: person.id,
            type: "smoothstep",
            style: { stroke: "#8b5cf6", strokeWidth: 2 },
          });
        }
      }
      if (person.spouseId) {
        const spouse = filteredPeople.find((p) => p.id === person.spouseId);
        if (spouse && person.id < spouse.id) {
          newEdges.push({
            id: `spouse-${person.id}-${spouse.id}`,
            source: person.id,
            target: spouse.id,
            type: "smoothstep",
            style: { stroke: "#facc15", strokeWidth: 2, strokeDasharray: "4 4" },
          });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);

    if (!initialized.current) {
      initialized.current = true;
      setTimeout(() => fitView({ padding: 0.2, duration: 500 }), 50);
    } else {
      setTimeout(() => fitView({ padding: 0.2, duration: 300 }), 50);
    }
  }, [filteredPeople, searchQuery, setNodes, setEdges, fitView, onEdit, onDelete, onAddChild, onAddSpouse]);

  useEffect(() => {
    const updateZoom = () => {
      const zoom = getViewport().zoom;
      setZoomDisplay(`${Math.round(zoom * 100)}%`);
    };
    updateZoom();
    const id = setInterval(updateZoom, 300);
    return () => clearInterval(id);
  }, [getViewport, setZoomDisplay]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.2, duration: 500 }}
      minZoom={0.1}
      maxZoom={2}
      onInit={(rf) => setRfInstance(rf)}
      onMove={(_, viewport) => setZoomDisplay(`${Math.round(viewport.zoom * 100)}%`)}
      className="bg-pattern"
    >
      <Background gap={20} size={1} color="#d4a017" />
    </ReactFlow>
  );
}

function FamilyTreeInner() {
  const [people, setPeople] = useState<PersonNode[]>(initialPeople);
  const [viewMode, setViewMode] = useState<ViewMode>("full");
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomDisplay, setZoomDisplay] = useState("72%");
  const [editor, setEditor] = useState<{ isOpen: boolean; person?: PersonNode; parentId?: string; spouseId?: string }>({ isOpen: false });
  const [activeMenu, setActiveMenu] = useState("Cây gia phả");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const rfInstanceRef = useRef<ReactFlowInstance<Node<NodeData>, Edge> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = useCallback(() => {
    rfInstanceRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    rfInstanceRef.current?.zoomOut();
  }, []);

  const handleFitView = useCallback(() => {
    rfInstanceRef.current?.fitView({ padding: 0.2, duration: 500 });
  }, []);

  const handleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  const handleEdit = useCallback((id: string) => {
    const person = people.find((p) => p.id === id);
    if (person) setEditor({ isOpen: true, person });
  }, [people]);

  const handleDelete = useCallback((id: string) => {
    if (confirm("Bạn có chắc muốn xóa thành viên này?")) {
      setPeople((prev) => {
        const target = prev.find((p) => p.id === id);
        return prev
          .filter((p) => p.id !== id)
          .map((p) => {
            if (p.parentId === id) return { ...p, parentId: undefined };
            if (target?.spouseId === p.id || p.spouseId === id)
              return { ...p, spouseId: undefined };
            return p;
          });
      });
    }
  }, []);

  const handleAddChild = useCallback((parentId: string) => {
    setEditor({ isOpen: true, parentId });
  }, []);

  const handleAddSpouse = useCallback((spouseId: string) => {
    setEditor({ isOpen: true, spouseId });
  }, []);

  const handleSave = useCallback((person: PersonNode) => {
    setPeople((prev) => {
      const exists = prev.find((p) => p.id === person.id);
      let next = exists
        ? prev.map((p) => (p.id === person.id ? person : p))
        : [...prev, person];

      if (person.spouseId) {
        next = next.map((p) =>
          p.id === person.spouseId && !p.spouseId
            ? { ...p, spouseId: person.id }
            : p,
        );
      }

      return next;
    });
    setEditor({ isOpen: false });
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fff9e6]">
      <div className="hidden md:flex h-full">
        <Sidebar activeItem={activeMenu} onItemClick={setActiveMenu} />
      </div>

      <div className="flex flex-col flex-1 h-full relative">
        <div className="relative z-10">
          <Header
            title="GIA PHẢ BẾP TRƯỞNG CHI GIÁP - HỌ NGUYỄN VĂN"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFitView={handleFitView}
            onFullscreen={handleFullscreen}
            zoomDisplay={zoomDisplay}
          />
        </div>

        <div
          className="absolute left-0 top-0 bottom-0 w-12 hidden lg:flex flex-col items-center justify-center pointer-events-none z-0"
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        >
          <div className="text-[#7f1d1d] text-sm tracking-[0.5em] font-serif opacity-70">
            Tổ tông công đức - Con cháu hiếu kính
          </div>
        </div>
        <div
          className="absolute right-0 top-0 bottom-0 w-12 hidden lg:flex flex-col items-center justify-center pointer-events-none z-0"
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        >
          <div className="text-[#7f1d1d] text-sm tracking-[0.5em] font-serif opacity-70">
            Văn võ song toàn - Gia phong truyền thống
          </div>
        </div>

        <div ref={containerRef} className="flex-1 relative min-h-0">
          {mounted && (
            <FlowInner
              people={people}
              searchQuery={searchQuery}
              viewMode={viewMode}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddChild={handleAddChild}
              onAddSpouse={handleAddSpouse}
              setZoomDisplay={setZoomDisplay}
              setRfInstance={(rf) => {
                rfInstanceRef.current = rf;
              }}
            />
          )}
        </div>

        <div className="relative z-10">
          <Legend />
        </div>
      </div>

      <NodeEditor
        key={editor.person?.id ?? editor.parentId ?? editor.spouseId ?? "new"}
        isOpen={editor.isOpen}
        person={editor.person}
        parentId={editor.parentId}
        spouseId={editor.spouseId}
        allPeople={people}
        onClose={() => setEditor({ isOpen: false })}
        onSave={handleSave}
      />
    </div>
  );
}

export function FamilyTree() {
  return (
    <ReactFlowProvider>
      <FamilyTreeInner />
    </ReactFlowProvider>
  );
}
