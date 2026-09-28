import { useEffect, useMemo, useRef } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { ScrollLock } from "@/hooks/use-scroll-lock";
import { isSolutionName } from "@/lib/pdf-editor/file-chip";
import { findMatchingFile } from "@/lib/pdf-editor/match-files";
import type { EditorPaneSide, EditorTreeNode } from "@/lib/pdf-editor/types";

/** The pane to cover while an exam runs beside it, and the time left. */
export interface ExamCover {
  remaining: number;
  side: EditorPaneSide;
}

interface ExamPairingOptions {
  lock: ScrollLock;
  nodes: EditorTreeNode[];
  panes: EditorPaneView[];
}

/** Which pane sits an exam with its own solution in the other, if one does. */
function findExamSide(
  nodes: EditorTreeNode[],
  panes: EditorPaneView[]
): EditorPaneSide | null {
  for (const exam of panes) {
    const other = panes.find((pane) => pane !== exam);
    const paper = nodes.find((node) => node.id === exam.node?.id);
    const isPaired =
      exam.session.exam.isRunning &&
      paper !== undefined &&
      other?.node !== undefined &&
      other.node !== null &&
      isSolutionName(other.node.name) &&
      findMatchingFile(nodes, paper)?.id === other.node.id;
    if (isPaired) {
      return exam.side;
    }
  }
  return null;
}

/** While an exam runs in one pane, its solution in the other stays covered,
 * as the answer covers do. When time is up the solution uncovers on the
 * page the exam is on, with the two scrolling together, to mark from. */
export function useExamPairing({
  lock,
  nodes,
  panes,
}: ExamPairingOptions): ExamCover | null {
  const running = panes.map((pane) => pane.session.exam.isRunning).join("|");
  const shown = panes.map((pane) => pane.node?.id ?? "").join("|");
  // biome-ignore lint/correctness/useExhaustiveDependencies: the pairing changes only when the files on screen or their exams do, which shown and running stand for
  const examSide = useMemo(
    () => findExamSide(nodes, panes),
    [nodes, running, shown]
  );
  const wasCoveringRef = useRef<EditorPaneSide | null>(null);
  const examPane = panes.find((pane) => pane.side === examSide);
  const endedPane = panes.find((pane) => pane.side === wasCoveringRef.current);
  const isTimeUp = examSide === null && endedPane?.session.exam.isOver === true;
  const { alignAndLock } = lock;

  useEffect(() => {
    if (examSide) {
      wasCoveringRef.current = examSide;
      return;
    }
    const side = wasCoveringRef.current;
    wasCoveringRef.current = null;
    if (side && isTimeUp) {
      alignAndLock(side);
    }
  }, [alignAndLock, examSide, isTimeUp]);

  if (!(examSide && examPane)) {
    return null;
  }
  return {
    remaining: examPane.session.exam.remaining,
    side: examSide === "primary" ? "beside" : "primary",
  };
}
