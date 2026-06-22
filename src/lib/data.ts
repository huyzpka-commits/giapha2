import { PersonNode } from "./types";

export const initialPeople: PersonNode[] = [
  {
    id: "p1",
    name: "Nguyễn Văn Giáp",
    birthYear: 1890,
    deathYear: 1965,
    status: "deceased",
    gender: "male",
    lineage: "patriarch",
    generation: 1,
  },
  {
    id: "p2",
    name: "Trần Thị Nga",
    birthYear: 1895,
    deathYear: 1970,
    status: "deceased",
    gender: "female",
    lineage: "matriarch",
    generation: 1,
    spouseId: "p1",
  },
  {
    id: "p3",
    name: "Nguyễn Văn Bếp",
    birthYear: 1920,
    deathYear: 2000,
    status: "deceased",
    gender: "male",
    lineage: "patriarch",
    generation: 2,
    parentId: "p1",
  },
  {
    id: "p4",
    name: "Lê Thị Hương",
    birthYear: 1925,
    deathYear: 2010,
    status: "deceased",
    gender: "female",
    lineage: "matriarch",
    generation: 2,
    spouseId: "p3",
  },
  {
    id: "p5",
    name: "Nguyễn Văn Trưởng",
    birthYear: 1923,
    deathYear: 1995,
    status: "deceased",
    gender: "male",
    lineage: "patriarch",
    generation: 2,
    parentId: "p1",
  },
  {
    id: "p6",
    name: "Phạm Thị Lan",
    birthYear: 1928,
    deathYear: 2005,
    status: "deceased",
    gender: "female",
    lineage: "matriarch",
    generation: 2,
    spouseId: "p5",
  },
  {
    id: "p7",
    name: "Nguyễn Văn Chiến",
    birthYear: 1945,
    status: "alive",
    gender: "male",
    lineage: "patriarch",
    generation: 3,
    parentId: "p3",
  },
  {
    id: "p8",
    name: "Hoàng Thị Mai",
    birthYear: 1950,
    status: "alive",
    gender: "female",
    lineage: "matriarch",
    generation: 3,
    spouseId: "p7",
  },
  {
    id: "p9",
    name: "Nguyễn Thị Hoa",
    birthYear: 1948,
    status: "alive",
    gender: "female",
    lineage: "patriarch",
    generation: 3,
    parentId: "p3",
  },
  {
    id: "p10",
    name: "Nguyễn Văn Thành",
    birthYear: 1970,
    status: "alive",
    gender: "male",
    lineage: "patriarch",
    generation: 4,
    parentId: "p7",
  },
  {
    id: "p11",
    name: "Vũ Thị Hồng",
    birthYear: 1972,
    status: "alive",
    gender: "female",
    lineage: "matriarch",
    generation: 4,
    spouseId: "p10",
  },
  {
    id: "p12",
    name: "Nguyễn Thị Lan Anh",
    birthYear: 1975,
    status: "alive",
    gender: "female",
    lineage: "patriarch",
    generation: 4,
    parentId: "p7",
  },
  {
    id: "p13",
    name: "Nguyễn Văn Minh",
    birthYear: 1973,
    status: "alive",
    gender: "male",
    lineage: "patriarch",
    generation: 4,
    parentId: "p9",
  },
  {
    id: "p14",
    name: "Nguyễn Văn Hùng",
    birthYear: 1978,
    status: "alive",
    gender: "male",
    lineage: "patriarch",
    generation: 4,
    parentId: "p5",
  },
  {
    id: "p15",
    name: "Nguyễn Thị Thanh",
    birthYear: 1980,
    status: "alive",
    gender: "female",
    lineage: "matriarch",
    generation: 4,
    spouseId: "p14",
  },
];

export function buildTreeLayout(people: PersonNode[]) {
  const nodeWidth = 180;
  const nodeHeight = 100;
  const generationGapY = 160;
  const siblingGapX = 40;

  const roots = people.filter((p) => !p.parentId);
  const byParent: Record<string, PersonNode[]> = {};

  for (const p of people) {
    if (p.parentId) {
      byParent[p.parentId] = byParent[p.parentId] || [];
      byParent[p.parentId].push(p);
    }
  }

  const positions: Record<string, { x: number; y: number }> = {};
  const subtreeWidth: Record<string, number> = {};

  function computeWidth(person: PersonNode): number {
    const children = byParent[person.id] || [];
    const spouse = people.find((p) => p.spouseId === person.id);
    const family = spouse ? [person, spouse] : [person];
    const ownWidth = family.length * nodeWidth + (family.length - 1) * 8;
    if (children.length === 0) {
      subtreeWidth[person.id] = ownWidth;
      return ownWidth;
    }
    const childrenWidth = children.reduce((sum, c) => sum + computeWidth(c), 0) +
      (children.length - 1) * siblingGapX;
    const width = Math.max(ownWidth, childrenWidth);
    subtreeWidth[person.id] = width;
    return width;
  }

  for (const root of roots) {
    computeWidth(root);
  }

  function placeNode(
    person: PersonNode,
    centerX: number,
  ) {
    const y = (person.generation - 1) * generationGapY;
    const spouse = people.find((p) => p.spouseId === person.id);
    const family = spouse ? [person, spouse] : [person];
    const familyWidth = family.length * nodeWidth + (family.length - 1) * 8;
    const startX = centerX - familyWidth / 2;

    family.forEach((member, idx) => {
      positions[member.id] = {
        x: startX + idx * (nodeWidth + 8),
        y,
      };
    });

    const children = byParent[person.id] || [];
    if (children.length === 0) return;

    const childrenTotalWidth = children.reduce(
      (sum, c) => sum + subtreeWidth[c.id],
      0,
    ) + (children.length - 1) * siblingGapX;
    let childStartX = centerX - childrenTotalWidth / 2;

    for (const child of children) {
      const childCenter = childStartX + subtreeWidth[child.id] / 2;
      placeNode(child, childCenter);
      childStartX += subtreeWidth[child.id] + siblingGapX;
    }
  }

  let rootOffsetX = 0;
  for (const root of roots) {
    placeNode(root, rootOffsetX + subtreeWidth[root.id] / 2);
    rootOffsetX += subtreeWidth[root.id] + siblingGapX;
  }

  return { positions, nodeWidth, nodeHeight, generationGapY };
}
