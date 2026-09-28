import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BOOKMARK_ADD_LABEL,
  BOOKMARK_REMOVE_LABEL,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  isMarked: boolean;
  onToggle: () => void;
}

/** Bookmarks the page being read, or takes the bookmark off it. */
export function BookmarkButton({ isMarked, onToggle }: BookmarkButtonProps) {
  const label = isMarked ? BOOKMARK_REMOVE_LABEL : BOOKMARK_ADD_LABEL;

  return (
    <Button
      aria-label={label}
      aria-pressed={isMarked}
      onClick={onToggle}
      size="icon"
      title={withShortcut(label, SHORTCUT_HINTS.bookmark)}
      variant="outline"
    >
      <BookmarkIcon className={cn(isMarked && "fill-current")} />
    </Button>
  );
}
