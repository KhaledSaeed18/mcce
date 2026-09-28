import { HighlighterIcon, StickyNoteIcon } from "lucide-react";
import { useCallback } from "react";
import { FILE_ROW_CLASS, FILE_ROW_LINK_CLASS } from "@/config/pdf-editor";
import { describeStudyItem } from "@/lib/pdf-editor/describe-study-item";
import type { StudyItem } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface NotesListItemProps {
  item: StudyItem;
  onOpen: (item: StudyItem) => void;
}

export function NotesListItem({ item, onOpen }: NotesListItemProps) {
  const Icon =
    item.annotation.type === "note" ? StickyNoteIcon : HighlighterIcon;
  const handleClick = useCallback(() => onOpen(item), [item, onOpen]);

  return (
    <li>
      <button
        className={cn(FILE_ROW_CLASS, FILE_ROW_LINK_CLASS, "items-start")}
        onClick={handleClick}
        type="button"
      >
        <Icon className="mt-0.5 size-4 shrink-0" />
        <span className="line-clamp-3 min-w-0 flex-1 whitespace-pre-line break-words">
          {describeStudyItem(item)}
        </span>
      </button>
    </li>
  );
}
