import { FileTextIcon, FolderOpenIcon } from "lucide-react";
import {
  EDITOR_PREVIEW_ACTIVE_FILE,
  EDITOR_PREVIEW_FILES,
  EDITOR_PREVIEW_FOLDER,
} from "@/config/features";
import { cn } from "@/lib/utils";

export function EditorPreviewSidebar() {
  return (
    <div className="hidden w-44 shrink-0 flex-col gap-1 border-r-2 bg-card p-2 text-[11px] sm:flex">
      <span className="flex items-center gap-1.5 px-1.5 py-1 font-head">
        <FolderOpenIcon className="size-3.5 shrink-0" />
        {EDITOR_PREVIEW_FOLDER}
      </span>
      {EDITOR_PREVIEW_FILES.map((file) => (
        <span
          className={cn(
            "flex items-center gap-1.5 rounded border-2 border-transparent py-1 pr-1.5 pl-4",
            file === EDITOR_PREVIEW_ACTIVE_FILE && "border-border bg-accent"
          )}
          key={file}
        >
          <FileTextIcon className="size-3 shrink-0 text-muted-foreground" />
          <span className="truncate">{file}</span>
        </span>
      ))}
    </div>
  );
}
