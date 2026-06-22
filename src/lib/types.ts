export type Gender = "male" | "female";
export type Lineage = "patriarch" | "matriarch";
export type Status = "alive" | "deceased";

export interface PersonNode {
  id: string;
  name: string;
  birthYear?: number;
  deathYear?: number;
  status: Status;
  gender: Gender;
  lineage: Lineage;
  generation: number;
  parentId?: string;
  spouseId?: string;
  notes?: string;
}

export interface NodeData extends Record<string, unknown> {
  person: PersonNode;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onAddSpouse: (personId: string) => void;
  isHighlighted: boolean;
  isDimmed: boolean;
}

export type ViewMode = "full" | "ancestors" | "descendants";

export interface EditorState {
  isOpen: boolean;
  person?: PersonNode;
  parentId?: string;
  spouseId?: string;
}
