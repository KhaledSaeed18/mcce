import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { COURSE_KIND_BADGE_LABEL } from "@/config/courses";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";
import {
  buildRoadmapGraph,
  type RoadmapEdgeKind,
  type RoadmapGraph,
} from "@/lib/curriculum/roadmap-graph";
import {
  buildRoadmapLayout,
  columnX,
  ROADMAP_HEADER_HEIGHT,
  ROADMAP_NODE_HEIGHT,
  ROADMAP_NODE_WIDTH,
  type RoadmapLayout,
  type RoadmapLayoutNode,
} from "@/lib/curriculum/roadmap-layout";
import {
  type RoadmapTrace,
  traceRoadmap,
} from "@/lib/curriculum/roadmap-trace";
import type { CurriculumTerm, CurriculumYear } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

const TERM_SHORT_LABEL: Record<CurriculumTerm, string> = {
  fall: "Fall",
  spring: "Spring",
  summer: "Summer",
};

const DIM_EDGE_OPACITY = 0.08;
const BASE_EDGE_OPACITY = 0.45;
const DIM_NODE_OPACITY = 0.35;
const TRACED_EDGE_WIDTH = 2.5;
const BASE_EDGE_WIDTH = 1.5;

const compareCodes = (a: string, b: string) => a.localeCompare(b);

function edgeDash(kind: RoadmapEdgeKind, traced: boolean): string | undefined {
  if (kind === "outside") {
    return "6 5";
  }
  if (kind === "corequisite") {
    return "8 5";
  }
  if (traced) {
    return "12 4";
  }
}

function edgeOpacity(traced: boolean, dimmed: boolean): number {
  if (dimmed) {
    return DIM_EDGE_OPACITY;
  }
  if (traced) {
    return 1;
  }
  return BASE_EDGE_OPACITY;
}

function nodeBorderColor(node: RoadmapLayoutNode, focused: boolean) {
  if (focused) {
    return "var(--primary)";
  }
  if (node.isMissing) {
    return "var(--muted-foreground)";
  }
}

function nodeAccent(node: RoadmapLayoutNode, yearOneColumns: number): string {
  if (node.isMissing) {
    return "var(--muted-foreground)";
  }
  if (node.course?.kind === "thesis") {
    return "var(--chart-2)";
  }
  return node.column < yearOneColumns ? "var(--chart-1)" : "var(--chart-5)";
}

function joinCodes(codes: string[]): string {
  if (codes.length === 0) {
    return "";
  }
  if (codes.length === 1) {
    return codes[0];
  }
  return `${codes.slice(0, -1).join(", ")} and ${codes.at(-1)}`;
}

interface CurriculumRoadmapProps {
  onSelectCourse: (code: string) => void;
  years: CurriculumYear[];
}

export function CurriculumRoadmap({
  onSelectCourse,
  years,
}: CurriculumRoadmapProps) {
  const [focusedCode, setFocusedCode] = useState<string | null>(null);

  const graph: RoadmapGraph = useMemo(() => buildRoadmapGraph(years), [years]);
  const layout: RoadmapLayout = useMemo(
    () => buildRoadmapLayout(graph),
    [graph]
  );

  const nodeByCode = useMemo(
    () => new Map(layout.nodes.map((node) => [node.code, node])),
    [layout]
  );
  const missingCodes = useMemo(
    () =>
      new Set(
        layout.nodes.filter((node) => node.isMissing).map((node) => node.code)
      ),
    [layout]
  );
  const yearOneColumns = graph.columns.filter(
    (column) => column.year === 1
  ).length;

  const trace = useMemo(
    () => (focusedCode ? traceRoadmap(graph, focusedCode) : null),
    [focusedCode, graph]
  );
  const traceSet = useMemo(() => {
    if (!(focusedCode && trace)) {
      return null;
    }
    return new Set([focusedCode, ...trace.needs, ...trace.unlocks]);
  }, [focusedCode, trace]);

  const focusedNode = focusedCode ? nodeByCode.get(focusedCode) : undefined;
  const caption = buildCaption(focusedNode, trace, layout, missingCodes);

  const handleFocus = useCallback((code: string) => setFocusedCode(code), []);
  const handleClear = useCallback(() => setFocusedCode(null), []);
  const handleSelect = useCallback(
    (code: string) => onSelectCourse(code),
    [onSelectCourse]
  );

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      <div className="flex flex-col gap-2">
        <Badge className="w-fit gap-1.5" variant="outline">
          <span className="size-1.5 rounded-full bg-primary" />
          ROADMAP
        </Badge>
        <h2 className="font-head text-2xl tracking-tight sm:text-3xl">
          Courses build on courses.
        </h2>
        <p className="max-w-3xl text-muted-foreground text-sm sm:text-base">
          The whole program as a map. Follow the lines to see what to take
          first, and what each course unlocks.
        </p>
      </div>

      <div className="overflow-hidden rounded border-2 bg-card shadow-md">
        <div className="overflow-x-auto">
          <div
            className="relative"
            style={{ height: layout.height, width: layout.width }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07]"
              style={DOT_GRID_BACKGROUND}
            />

            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${layout.width} ${layout.height}`}
            >
              <defs>
                <marker
                  id="roadmap-arrow"
                  markerHeight="6"
                  markerUnits="strokeWidth"
                  markerWidth="6"
                  orient="auto"
                  refX="5"
                  refY="3"
                  viewBox="0 0 6 6"
                >
                  <path d="M0 0 L6 3 L0 6 z" fill="currentColor" />
                </marker>
              </defs>
              {layout.edges.map((edge) => {
                const traced =
                  traceSet?.has(edge.from) === true &&
                  traceSet.has(edge.to) === true;
                const dimmed = traceSet !== null && !traced;
                return (
                  <path
                    className={cn(
                      "stroke-current",
                      traced
                        ? "roadmap-edge-flow text-primary"
                        : "text-muted-foreground"
                    )}
                    d={edge.path}
                    fill="none"
                    key={`${edge.from}-${edge.to}-${edge.kind}`}
                    markerEnd="url(#roadmap-arrow)"
                    opacity={edgeOpacity(traced, dimmed)}
                    strokeDasharray={edgeDash(edge.kind, traced)}
                    strokeWidth={traced ? TRACED_EDGE_WIDTH : BASE_EDGE_WIDTH}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {graph.columns.map((column, index) => {
              const x = columnX(index);
              return (
                <div
                  aria-hidden="true"
                  className="absolute top-0 flex flex-col items-center justify-center gap-0.5"
                  key={`${column.year}-${column.term}`}
                  style={{
                    height: ROADMAP_HEADER_HEIGHT,
                    left: x,
                    width: ROADMAP_NODE_WIDTH,
                  }}
                >
                  <span className="font-head text-sm leading-none">
                    {TERM_SHORT_LABEL[column.term]}
                  </span>
                  <span className="text-[11px] text-muted-foreground leading-none">
                    Year {column.year}
                  </span>
                </div>
              );
            })}

            {layout.nodes.map((node) => {
              const focused = node.code === focusedCode;
              const dimmed = traceSet !== null && !traceSet.has(node.code);
              return (
                <RoadmapNodeButton
                  accent={nodeAccent(node, yearOneColumns)}
                  dimmed={dimmed}
                  focused={focused}
                  key={node.code}
                  node={node}
                  onClear={handleClear}
                  onFocus={handleFocus}
                  onSelect={handleSelect}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div aria-live="polite" className="flex min-w-0 flex-col gap-1">
            <p className="font-head text-lg leading-tight">{caption.title}</p>
            <p className="text-muted-foreground text-sm">{caption.detail}</p>
          </div>

          <RoadmapLegend />
        </div>
      </div>
    </motion.div>
  );
}

interface RoadmapNodeButtonProps {
  accent: string;
  dimmed: boolean;
  focused: boolean;
  node: RoadmapLayoutNode;
  onClear: () => void;
  onFocus: (code: string) => void;
  onSelect: (code: string) => void;
}

function RoadmapNodeButton({
  accent,
  dimmed,
  focused,
  node,
  onClear,
  onFocus,
  onSelect,
}: RoadmapNodeButtonProps) {
  const handleBlur = useCallback(onClear, [onClear]);
  const handleClick = useCallback(() => {
    if (node.course) {
      onSelect(node.code);
    }
  }, [node, onSelect]);
  const handleFocus = useCallback(
    () => onFocus(node.code),
    [node.code, onFocus]
  );
  const handleMouseEnter = useCallback(
    () => onFocus(node.code),
    [node.code, onFocus]
  );
  const handleMouseLeave = useCallback(onClear, [onClear]);

  const kindLabel = node.course
    ? COURSE_KIND_BADGE_LABEL[node.course.kind]
    : undefined;

  return (
    <button
      aria-label={
        node.course
          ? `${node.code}: ${node.course.name}`
          : `${node.code}: not offered in this plan`
      }
      className={cn(
        "absolute flex flex-col justify-center gap-0.5 rounded border-2 bg-card px-2.5 py-1.5 text-left transition-[border-color,box-shadow,opacity] duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        node.isMissing ? "border-dashed shadow-none" : "shadow-sm",
        focused && "shadow-lg"
      )}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderColor: nodeBorderColor(node, focused),
        borderLeftColor: accent,
        borderLeftWidth: 6,
        height: ROADMAP_NODE_HEIGHT,
        left: node.x,
        opacity: dimmed ? DIM_NODE_OPACITY : 1,
        top: node.y,
        width: ROADMAP_NODE_WIDTH,
      }}
      title={node.course ? node.course.name : node.code}
      type="button"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-head text-[12px] leading-none">{node.code}</span>
        {node.course ? (
          <Badge className="px-1.5 text-[9px]" variant="outline">
            {kindLabel ?? `${node.course.credits} cr`}
          </Badge>
        ) : (
          <Badge className="px-1.5 text-[9px]" variant="ghost">
            Not offered
          </Badge>
        )}
      </span>
      <span className="line-clamp-2 text-[11px] text-muted-foreground leading-tight">
        {node.course ? node.course.name : "Outside this plan"}
      </span>
    </button>
  );
}

interface RoadmapCaption {
  detail: string;
  title: string;
}

function buildCaption(
  focused: RoadmapLayoutNode | undefined,
  trace: RoadmapTrace | null,
  layout: RoadmapLayout,
  missingCodes: Set<string>
): RoadmapCaption {
  if (!(focused && trace)) {
    return {
      detail:
        "Hover any course to see what it needs first and what it unlocks.",
      title: "Trace a course",
    };
  }

  if (focused.isMissing) {
    const dependents = layout.edges
      .filter((edge) => edge.from === focused.code)
      .map((edge) => edge.to)
      .sort(compareCodes);
    const detail = dependents.length
      ? `Not offered in this plan of study. ${joinCodes(dependents)} still list it as a prerequisite.`
      : "Not offered in this plan of study.";
    return { detail, title: `${focused.code} is outside the plan` };
  }

  const needs = [...trace.needs]
    .filter((code) => !missingCodes.has(code))
    .sort(compareCodes);
  const unlocks = [...trace.unlocks].sort(compareCodes);
  const needsPhrase =
    needs.length === 0 ? "Needs no prior courses" : `Needs ${joinCodes(needs)}`;
  const unlocksPhrase =
    unlocks.length === 0
      ? "Unlocks nothing yet"
      : `Unlocks ${joinCodes(unlocks)}`;

  let detail = `${needsPhrase}. ${unlocksPhrase}.`;
  const outside = [...trace.needs]
    .filter((code) => missingCodes.has(code))
    .sort(compareCodes);
  if (outside.length > 0) {
    detail += ` ${joinCodes(outside)} ${outside.length === 1 ? "is" : "are"} not offered in this plan.`;
  }

  return { detail, title: focused.course ? focused.course.name : focused.code };
}

function RoadmapLegend() {
  const legendItems = [
    { dash: undefined, label: "Prerequisite: take it first" },
    { dash: "8 5", label: "Corequisite: same term" },
    { dash: "6 5", label: "Not offered: outside the plan" },
  ];

  return (
    <ul className="flex shrink-0 flex-wrap gap-x-5 gap-y-2 text-muted-foreground text-xs">
      {legendItems.map((item) => (
        <li className="flex items-center gap-1.5" key={item.label}>
          <svg
            aria-hidden="true"
            className="text-foreground"
            height="10"
            viewBox="0 0 32 10"
            width="32"
          >
            <path
              d="M0 5 H28"
              fill="none"
              markerEnd="url(#roadmap-arrow)"
              stroke="currentColor"
              strokeDasharray={item.dash}
              strokeWidth="2"
            />
          </svg>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
