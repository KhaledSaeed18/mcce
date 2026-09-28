import { Link } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { type ComponentProps, useCallback } from "react";
import { FileTypeChip } from "@/components/pdf-editor/file-type-chip";
import {
  CLOSE_TAB_LABEL,
  EDITOR_PATH,
  SHORTCUT_HINTS,
  TAB_ACTIVE_CLASS,
  TAB_CLASS,
  TAB_IDLE_CLASS,
} from "@/config/pdf-editor";
import { buildEditorSearch } from "@/lib/pdf-editor/editor-search";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";
import type { OpenFile, TabLabel } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface EditorTabProps {
  /** Handlers that carry this tab to another place in the strip. */
  dragHandlers: ComponentProps<"li">;
  file: OpenFile;
  isActive: boolean;
  isDragging: boolean;
  label: TabLabel;
  onClose: (id: string) => void;
}

export function EditorTab({
  dragHandlers,
  file,
  isActive,
  isDragging,
  label,
  onClose,
}: EditorTabProps) {
  const handleClose = useCallback(() => onClose(file.id), [file.id, onClose]);

  return (
    <li
      {...dragHandlers}
      className={cn(
        TAB_CLASS,
        isActive ? TAB_ACTIVE_CLASS : TAB_IDLE_CLASS,
        isDragging && "opacity-50"
      )}
      title={file.name}
    >
      <Link
        aria-current={isActive ? "page" : undefined}
        className="flex h-full min-w-0 items-center gap-1.5 pl-1.5"
        // The whole tab is what drags, not the link's address.
        draggable={false}
        search={buildEditorSearch(file)}
        to={EDITOR_PATH}
      >
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
    </li>
  );
}
