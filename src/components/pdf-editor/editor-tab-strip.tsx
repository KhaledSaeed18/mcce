import { Fragment, type ReactNode, useRef } from "react";
import { EditorMatchTab } from "@/components/pdf-editor/editor-match-tab";
import { EditorTab } from "@/components/pdf-editor/editor-tab";
import { EditorTabMenu } from "@/components/pdf-editor/editor-tab-menu";
import { OPEN_FILES_LABEL } from "@/config/pdf-editor";
import { useActiveTabInView } from "@/hooks/use-active-tab-in-view";
import { useEditorTabKeys } from "@/hooks/use-editor-tab-keys";
import { useHiddenTabCount } from "@/hooks/use-hidden-tab-count";
import { useTabDrag } from "@/hooks/use-tab-drag";
import { useTabLabels } from "@/hooks/use-tab-labels";
import type {
  EditorDesk,
  EditorPaneSide,
  EditorTreeNode,
  OpenFile,
} from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface EditorTabStripProps {
  activeId: string | undefined;
  /** Controls that follow the last tab, like opening another file. */
  children: ReactNode;
  desk: EditorDesk;
  /** The match of the file on screen, offered next to its tab when it is
   * not on screen too. */
  match: EditorTreeNode | null;
  nodes: EditorTreeNode[];
  onClose: (id: string) => void;
  onMove: (from: number, to: number) => void;
  onOpenBeside: (file: OpenFile) => void;
  onOpenMatch: () => void;
  onShow: (file: OpenFile) => void;
  /** Where each file on screen sits while the view is split, by id. */
  sides: Partial<Record<string, EditorPaneSide>>;
}

/** The open files, in the file bar where the file's title used to be. */
export function EditorTabStrip({
  activeId,
  children,
  desk,
  match,
  nodes,
  onClose,
  onMove,
  onOpenBeside,
  onOpenMatch,
  onShow,
  sides,
}: EditorTabStripProps) {
  const stripRef = useRef<HTMLUListElement>(null);
  const labels = useTabLabels(desk.files, nodes);
  const closedLabels = useTabLabels(desk.closed, nodes);
  const hiddenCount = useHiddenTabCount(stripRef, desk.files.length);
  useActiveTabInView(
    stripRef,
    desk.files.findIndex((file) => file.id === activeId)
  );
  const { draggingIndex, handlersFor } = useTabDrag(onMove);
  // Bound even with no tab open, so a tab closed last can still come back.
  useEditorTabKeys({ activeId, desk, onClose, onMove, onShow });

  const hasTabs = desk.files.length > 0;
  const offered = match && sides[match.id] === undefined ? match : null;

  return (
    <nav
      aria-label={OPEN_FILES_LABEL}
      className={cn("flex min-w-0 items-center gap-1.5", hasTabs && "flex-1")}
    >
      {hasTabs ? (
        <>
          {/* Room below and right for the active tab's shadow, which the
              scroller would clip, taken back from the bar so it keeps its
              height. */}
          <ul
            className="-mb-1 flex min-w-0 items-center gap-1.5 overflow-x-auto pr-1 pb-1 [scrollbar-width:none]"
            ref={stripRef}
          >
            {desk.files.map((file, index) => (
              <Fragment key={file.id}>
                <EditorTab
                  dragHandlers={handlersFor(index, file)}
                  file={file}
                  isActive={file.id === activeId}
                  isDragging={index === draggingIndex}
                  label={labels[index]}
                  onClose={onClose}
                  onOpenBeside={onOpenBeside}
                  side={sides[file.id] ?? null}
                />
                {offered && file.id === activeId ? (
                  <EditorMatchTab match={offered} onOpen={onOpenMatch} />
                ) : null}
              </Fragment>
            ))}
          </ul>
          <EditorTabMenu
            activeId={activeId}
            closed={desk.closed}
            closedLabels={closedLabels}
            files={desk.files}
            hiddenCount={hiddenCount}
            labels={labels}
            onShow={onShow}
          />
        </>
      ) : null}
      {children}
    </nav>
  );
}
