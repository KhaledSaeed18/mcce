import type { RoadmapEdge, RoadmapGraph, RoadmapNode } from "./roadmap-graph";

export const ROADMAP_NODE_WIDTH = 184;
export const ROADMAP_NODE_HEIGHT = 64;
export const ROADMAP_COLUMN_GAP = 112;
export const ROADMAP_ROW_GAP = 24;
export const ROADMAP_STAGE_PAD = 16;
export const ROADMAP_HEADER_HEIGHT = 44;

const LAYOUT_PASSES = 4;
const ROW_STEP = ROADMAP_NODE_HEIGHT + ROADMAP_ROW_GAP;

export interface RoadmapLayoutNode extends RoadmapNode {
  x: number;
  y: number;
}

export interface RoadmapLayoutEdge extends RoadmapEdge {
  path: string;
}

export interface RoadmapLayout {
  edges: RoadmapLayoutEdge[];
  height: number;
  nodes: RoadmapLayoutNode[];
  width: number;
}

function columnStackHeight(nodeCount: number): number {
  if (nodeCount === 0) {
    return 0;
  }
  return nodeCount * ROADMAP_NODE_HEIGHT + (nodeCount - 1) * ROADMAP_ROW_GAP;
}

/** Reorders nodes within each column so edges to earlier columns cross as little as possible. */
function reduceEdgeCrossings(
  graph: RoadmapGraph,
  realNodes: RoadmapNode[]
): RoadmapNode[][] {
  const orders: RoadmapNode[][] = graph.columns.map(() => []);

  for (const node of realNodes) {
    orders[node.column].push(node);
  }

  const indexByCode = new Map<string, number>();
  const setIndexes = () => {
    indexByCode.clear();
    for (const column of orders) {
      for (const [index, node] of column.entries()) {
        indexByCode.set(node.code, index);
      }
    }
  };
  setIndexes();

  const predecessorIndexes = (code: string, graphEdges: RoadmapEdge[]) => {
    const indexes: number[] = [];
    for (const edge of graphEdges) {
      if (edge.to !== code) {
        continue;
      }
      const fromIndex = indexByCode.get(edge.from);
      if (fromIndex !== undefined) {
        indexes.push(fromIndex);
      }
    }
    return indexes;
  };

  const average = (indexes: number[]) =>
    indexes.length === 0
      ? Number.POSITIVE_INFINITY
      : indexes.reduce((sum, value) => sum + value, 0) / indexes.length;

  for (let pass = 0; pass < LAYOUT_PASSES; pass += 1) {
    for (let column = 1; column < orders.length; column += 1) {
      const current = new Map(
        orders[column].map((node, index) => [node.code, index])
      );
      const sorted = [...orders[column]].sort((a, b) => {
        const left = average(predecessorIndexes(a.code, graph.edges));
        const right = average(predecessorIndexes(b.code, graph.edges));
        if (left !== right) {
          return left - right;
        }
        return (current.get(a.code) ?? 0) - (current.get(b.code) ?? 0);
      });
      orders[column] = sorted;
    }
    setIndexes();
  }

  return orders;
}

/** Inserts missing courses as an extra row directly under the course that requires them. */
function insertMissingRows(graph: RoadmapGraph, orders: RoadmapNode[][]): void {
  const missingNodes = graph.nodes.filter((node) => node.isMissing);

  for (const missing of missingNodes) {
    const target = graph.edges.find(
      (edge) => edge.kind === "outside" && edge.from === missing.code
    );
    const targetColumn = target
      ? graph.nodes.find((node) => node.code === target.to)?.column
      : undefined;
    if (targetColumn === undefined) {
      continue;
    }
    const row = orders[targetColumn].findIndex(
      (node) => node.code === target?.to
    );
    orders[targetColumn].splice(row + 1, 0, {
      ...missing,
      column: targetColumn,
    });
  }
}

/** Lays courses out in left-to-right semester columns with coordinates ready for rendering. */
export function buildRoadmapLayout(graph: RoadmapGraph): RoadmapLayout {
  const orders = reduceEdgeCrossings(
    graph,
    graph.nodes.filter((node) => !node.isMissing)
  );
  insertMissingRows(graph, orders);

  const tallestStack = Math.max(
    ...orders.map((column) => columnStackHeight(column.length))
  );
  const width =
    ROADMAP_STAGE_PAD * 2 +
    graph.columns.length * ROADMAP_NODE_WIDTH +
    (graph.columns.length - 1) * ROADMAP_COLUMN_GAP;

  const nodes: RoadmapLayoutNode[] = [];

  for (const [columnIndex, column] of orders.entries()) {
    const x = columnX(columnIndex);
    const stackHeight = columnStackHeight(column.length);
    const yOffset =
      ROADMAP_HEADER_HEIGHT +
      ROADMAP_STAGE_PAD +
      (tallestStack - stackHeight) / 2;

    column.forEach((node, row) => {
      nodes.push({
        ...node,
        x,
        y: yOffset + row * ROW_STEP,
      });
    });
  }

  const bottom = Math.max(
    ...nodes.map((node) => node.y + ROADMAP_NODE_HEIGHT),
    ROADMAP_HEADER_HEIGHT + ROADMAP_STAGE_PAD + tallestStack
  );
  const height = bottom + ROADMAP_STAGE_PAD;

  const nodesByCode = new Map(nodes.map((node) => [node.code, node]));
  const edges: RoadmapLayoutEdge[] = graph.edges.map((edge) => {
    const from = nodesByCode.get(edge.from);
    const to = nodesByCode.get(edge.to);
    return {
      ...edge,
      path: from && to ? buildEdgePath(from, to) : "",
    };
  });

  return { edges, height, nodes, width };
}

function buildEdgePath(from: RoadmapLayoutNode, to: RoadmapLayoutNode): string {
  const fromX = from.x + ROADMAP_NODE_WIDTH;
  const fromY = from.y + ROADMAP_NODE_HEIGHT / 2;
  const toX = to.x;
  const toY = to.y + ROADMAP_NODE_HEIGHT / 2;

  if (from.column === to.column) {
    const endX = to.x + ROADMAP_NODE_WIDTH;
    const arcX = Math.max(fromX, endX) + 14;
    return `M ${fromX} ${fromY} C ${arcX} ${fromY}, ${arcX} ${toY}, ${endX} ${toY}`;
  }

  const span = toX - fromX;
  const curve = Math.max(36, span * 0.45);
  return `M ${fromX} ${fromY} C ${fromX + curve} ${fromY}, ${toX - curve} ${toY}, ${toX} ${toY}`;
}

export function columnX(column: number): number {
  return ROADMAP_STAGE_PAD + column * (ROADMAP_NODE_WIDTH + ROADMAP_COLUMN_GAP);
}
