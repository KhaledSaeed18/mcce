import { BookmarkIcon, XIcon } from "lucide-react";
import { useCallback } from "react";
import {
  BOOKMARK_REMOVE_LABEL,
  FILE_ROW_ACTIVE_CLASS,
  FILE_ROW_CLASS,
  FILE_ROW_LINK_CLASS,
} from "@/config/pdf-editor";
import { cn } from "@/lib/utils";

interface BookmarkListItemProps {
  isActive: boolean;
  onGoToPage: (position: number) => void;
  onRemove: (pageId: string) => void;
  pageId: string;
  position: number;
}

export function BookmarkListItem({
  isActive,
  onGoToPage,
  onRemove,
  pageId,
  position,
}: BookmarkListItemProps) {
  const handleGo = useCallback(
    () => onGoToPage(position),
    [onGoToPage, position]
  );
  const handleRemove = useCallback(() => onRemove(pageId), [onRemove, pageId]);
  const label = `Page ${position + 1}`;

  return (
    <li className="flex items-center gap-1">
      <button
        aria-current={isActive ? "page" : undefined}
        className={cn(
          FILE_ROW_CLASS,
          FILE_ROW_LINK_CLASS,
          "min-w-0",
          isActive && FILE_ROW_ACTIVE_CLASS
        )}
        onClick={handleGo}
        type="button"
      >
        <BookmarkIcon className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate">{label}</span>
      </button>
      <button
        aria-label={`${BOOKMARK_REMOVE_LABEL}: ${label}`}
        className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded border-2 border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground"
        onClick={handleRemove}
        title={BOOKMARK_REMOVE_LABEL}
        type="button"
      >
        <XIcon className="size-3.5" />
      </button>
    </li>
  );
}
