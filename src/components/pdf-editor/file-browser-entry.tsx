import { Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { KindIcon } from "@/components/drive/kind-icon";
import {
  FILE_ROW_ACTIVE_CLASS,
  FILE_ROW_CLASS,
  FILE_ROW_LINK_CLASS,
} from "@/config/pdf-editor";
import type { BrowserEntry } from "@/lib/pdf-editor/browser-entries";
import { cn } from "@/lib/utils";

interface FileBrowserEntryProps {
  entry: BrowserEntry;
  isActive: boolean;
  onOpenFolder: (id: string) => void;
}

export function FileBrowserEntry({
  entry,
  isActive,
  onOpenFolder,
}: FileBrowserEntryProps) {
  const handleClick = useCallback(
    () => onOpenFolder(entry.id),
    [entry.id, onOpenFolder]
  );

  if (!entry.isFile) {
    return (
      <button
        className={cn(FILE_ROW_CLASS, FILE_ROW_LINK_CLASS, "cursor-pointer")}
        onClick={handleClick}
        type="button"
      >
        <KindIcon className="size-4 shrink-0" kind={entry.kind} />
        <span className="truncate">{entry.name}</span>
      </button>
    );
  }

  if (entry.kind !== "pdf") {
    return (
      <span
        className={cn(FILE_ROW_CLASS, "text-muted-foreground")}
        title="Only PDFs open in the editor"
      >
        <KindIcon className="size-4 shrink-0" kind={entry.kind} />
        <span className="truncate">{entry.name}</span>
      </span>
    );
  }

  return (
    <Link
      className={cn(
        FILE_ROW_CLASS,
        FILE_ROW_LINK_CLASS,
        isActive && FILE_ROW_ACTIVE_CLASS
      )}
      search={{ file: entry.id }}
      to="/editor"
    >
      <KindIcon className="size-4 shrink-0" kind={entry.kind} />
      <span className="truncate">{entry.name}</span>
    </Link>
  );
}
