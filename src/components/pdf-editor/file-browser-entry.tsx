import { Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { KindIcon } from "@/components/drive/kind-icon";
import type { BrowserEntry } from "@/lib/pdf-editor/browser-entries";
import { cn } from "@/lib/utils";

const ROW_CLASSES =
  "flex w-full items-center gap-2 rounded border-2 border-transparent px-2 py-1.5 text-left text-sm";

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
        className={cn(
          ROW_CLASSES,
          "cursor-pointer hover:border-border hover:bg-accent"
        )}
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
        className={cn(ROW_CLASSES, "text-muted-foreground")}
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
        ROW_CLASSES,
        "hover:border-border hover:bg-accent",
        isActive && "border-border bg-primary text-primary-foreground"
      )}
      search={{ file: entry.id }}
      to="/editor"
    >
      <KindIcon className="size-4 shrink-0" kind={entry.kind} />
      <span className="truncate">{entry.name}</span>
    </Link>
  );
}
