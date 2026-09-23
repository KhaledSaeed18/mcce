import { Link } from "@tanstack/react-router";
import { FileTextIcon } from "lucide-react";
import { RemoveLocalPdfButton } from "@/components/pdf-editor/remove-local-pdf-button";
import {
  EDITOR_PATH,
  FILE_ROW_ACTIVE_CLASS,
  FILE_ROW_CLASS,
  FILE_ROW_LINK_CLASS,
} from "@/config/pdf-editor";
import { formatBytes } from "@/lib/drive/format";
import type { LocalPdfMeta } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface LocalPdfListItemProps {
  file: LocalPdfMeta;
  isActive: boolean;
  onRemove: (id: string) => void;
}

export function LocalPdfListItem({
  file,
  isActive,
  onRemove,
}: LocalPdfListItemProps) {
  return (
    <li className="flex items-center gap-1">
      <Link
        className={cn(
          FILE_ROW_CLASS,
          FILE_ROW_LINK_CLASS,
          "min-w-0",
          isActive && FILE_ROW_ACTIVE_CLASS
        )}
        search={{ local: file.id }}
        to={EDITOR_PATH}
      >
        <FileTextIcon className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate">{file.name}</span>
        <span className="shrink-0 text-xs opacity-70">
          {formatBytes(file.size)}
        </span>
      </Link>
      <RemoveLocalPdfButton id={file.id} name={file.name} onRemove={onRemove} />
    </li>
  );
}
