import { Link } from "@tanstack/react-router";
import { PanelLeftIcon, PanelRightIcon, XIcon } from "lucide-react";
import { useCallback } from "react";
import { FileTypeChip } from "@/components/pdf-editor/file-type-chip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  CLOSE_TAB_LABEL,
  EDITOR_PATH,
  FILE_LINK_ACTIVE_OPTIONS,
  OPEN_BESIDE_LABEL,
  PANE_LABELS,
  SHORTCUT_HINTS,
  TAB_ACTIVE_CLASS,
  TAB_BESIDE_CLASS,
  TAB_CLASS,
  TAB_IDLE_CLASS,
} from "@/config/pdf-editor";
import { usePlaceFileSearch } from "@/hooks/use-place-file-search";
import type { TabDragHandlers } from "@/hooks/use-tab-drag";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";
import type {
  EditorPaneSide,
  OpenFile,
  TabLabel,
} from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface EditorTabProps {
  dragHandlers: TabDragHandlers;
  file: OpenFile;
  /** The file in the pane with focus. */
  isActive: boolean;
  isDragging: boolean;
  label: TabLabel;
  onClose: (id: string) => void;
  onOpenBeside: (file: OpenFile) => void;
  /** Which pane shows the file while the view is split, if either does. */
  side: EditorPaneSide | null;
}

function stateClass(isActive: boolean, side: EditorPaneSide | null): string {
  if (isActive) {
    return TAB_ACTIVE_CLASS;
  }
  return side ? TAB_BESIDE_CLASS : TAB_IDLE_CLASS;
}

export function EditorTab({
  dragHandlers,
  file,
  isActive,
  isDragging,
  label,
  onClose,
  onOpenBeside,
  side,
}: EditorTabProps) {
  const handleClose = useCallback(() => onClose(file.id), [file.id, onClose]);
  const handleOpenBeside = useCallback(
    () => onOpenBeside(file),
    [file, onOpenBeside]
  );
  const placeSearch = usePlaceFileSearch(file.id, file.source);
  const SideIcon = side === "beside" ? PanelRightIcon : PanelLeftIcon;

  return (
    <ContextMenu>
      <ContextMenuTrigger
        {...dragHandlers}
        className={cn(
          TAB_CLASS,
          stateClass(isActive, side),
          isDragging && "opacity-50"
        )}
        render={<li />}
        title={file.name}
      >
        <Link
          activeOptions={FILE_LINK_ACTIVE_OPTIONS}
          aria-current={isActive ? "page" : undefined}
          className="flex h-full min-w-0 items-center gap-1.5 pl-1.5"
          // The whole tab is what drags, not the link's address.
          draggable={false}
          from={EDITOR_PATH}
          search={placeSearch}
          to={EDITOR_PATH}
        >
          {side ? (
            <SideIcon aria-label={PANE_LABELS[side]} className="size-3.5" />
          ) : null}
          {label.chip ? <FileTypeChip chip={label.chip} /> : null}
          <span className="truncate">{label.text}</span>
        </Link>
        <button
          aria-label={`${CLOSE_TAB_LABEL} ${label.text}`}
          className={cn(
            "mx-0.5 grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm hover:bg-foreground/10 focus-visible:opacity-100 group-hover:opacity-100",
            isActive ? "opacity-100" : "opacity-0"
          )}
          onClick={handleClose}
          title={
            isActive
              ? withShortcut(CLOSE_TAB_LABEL, SHORTCUT_HINTS.closeTab)
              : CLOSE_TAB_LABEL
          }
          type="button"
        >
          <XIcon className="size-3" />
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          disabled={isActive || side !== null}
          onClick={handleOpenBeside}
        >
          <PanelRightIcon />
          {OPEN_BESIDE_LABEL}
        </ContextMenuItem>
        <ContextMenuItem onClick={handleClose}>
          <XIcon />
          {CLOSE_TAB_LABEL}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
