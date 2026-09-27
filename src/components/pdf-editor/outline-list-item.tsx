import { useCallback } from "react";
import {
  FILE_ROW_CLASS,
  FILE_ROW_LINK_CLASS,
  OUTLINE_INDENT_PX,
} from "@/config/pdf-editor";
import type { OutlineEntry } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface OutlineListItemProps {
  entry: OutlineEntry;
  onGoToPage: (position: number) => void;
  /** Where the entry's page sits now, or -1 when it cannot be gone to. */
  position: number;
}

export function OutlineListItem({
  entry,
  onGoToPage,
  position,
}: OutlineListItemProps) {
  const isReachable = position >= 0;
  const handleClick = useCallback(
    () => onGoToPage(position),
    [onGoToPage, position]
  );

  return (
    <li>
      <button
        className={cn(
          FILE_ROW_CLASS,
          isReachable ? FILE_ROW_LINK_CLASS : "cursor-default opacity-50"
        )}
        disabled={!isReachable}
        onClick={handleClick}
        style={{ paddingLeft: `${entry.depth * OUTLINE_INDENT_PX + 8}px` }}
        type="button"
      >
        <span className="min-w-0 flex-1 truncate" title={entry.title}>
          {entry.title}
        </span>
        {isReachable ? (
          <span className="shrink-0 text-xs tabular-nums opacity-70">
            {position + 1}
          </span>
        ) : null}
      </button>
    </li>
  );
}
