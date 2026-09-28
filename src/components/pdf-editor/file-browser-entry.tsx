import { Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { KindIcon } from "@/components/drive/kind-icon";
import { OpenFileDot } from "@/components/pdf-editor/open-file-dot";
import {
  EDITOR_PATH,
  FILE_ROW_ACTIVE_CLASS,
  FILE_ROW_CLASS,
  FILE_ROW_LINK_CLASS,
} from "@/config/pdf-editor";
import { usePlaceFileSearch } from "@/hooks/use-place-file-search";
import type { BrowserEntry } from "@/lib/pdf-editor/browser-entries";
import { cn } from "@/lib/utils";

interface FileBrowserEntryProps {
  entry: BrowserEntry;
  isActive: boolean;
  isOpen: boolean;
  onOpenFolder: (id: string) => void;
}

export function FileBrowserEntry({
  entry,
  isActive,
  isOpen,
  onOpenFolder,
}: FileBrowserEntryProps) {
  const handleClick = useCallback(
    () => onOpenFolder(entry.id),
    [entry.id, onOpenFolder]
  );
  const placeSearch = usePlaceFileSearch(entry.id, "drive");

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
      from={EDITOR_PATH}
      search={placeSearch}
      to={EDITOR_PATH}
    >
      <KindIcon className="size-4 shrink-0" kind={entry.kind} />
      <span className="truncate">{entry.name}</span>
      {isOpen && !isActive ? <OpenFileDot /> : null}
    </Link>
  );
}
