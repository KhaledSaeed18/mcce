import { Link } from "@tanstack/react-router";
import { FileTextIcon } from "lucide-react";
import { OpenFileDot } from "@/components/pdf-editor/open-file-dot";
import { RemoveLocalPdfButton } from "@/components/pdf-editor/remove-local-pdf-button";
import {
  EDITOR_PATH,
  FILE_LINK_ACTIVE_OPTIONS,
  FILE_ROW_ACTIVE_CLASS,
  FILE_ROW_CLASS,
  FILE_ROW_LINK_CLASS,
} from "@/config/pdf-editor";
import { usePlaceFileSearch } from "@/hooks/use-place-file-search";
import { formatBytes } from "@/lib/drive/format";
import type { LocalPdfMeta } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface LocalPdfListItemProps {
  file: LocalPdfMeta;
  isActive: boolean;
  isOpen: boolean;
  onRemove: (id: string) => void;
}

export function LocalPdfListItem({
  file,
  isActive,
  isOpen,
  onRemove,
}: LocalPdfListItemProps) {
  const placeSearch = usePlaceFileSearch(file.id, "local");

  return (
    <li className="flex items-center gap-1">
      <Link
        activeOptions={FILE_LINK_ACTIVE_OPTIONS}
        className={cn(
          FILE_ROW_CLASS,
          FILE_ROW_LINK_CLASS,
          "min-w-0",
          isActive && FILE_ROW_ACTIVE_CLASS
        )}
        from={EDITOR_PATH}
        search={placeSearch}
        to={EDITOR_PATH}
      >
        <FileTextIcon className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate">{file.name}</span>
        <span className="shrink-0 text-xs opacity-70">
          {formatBytes(file.size)}
        </span>
        {isOpen && !isActive ? <OpenFileDot /> : null}
      </Link>
      <RemoveLocalPdfButton id={file.id} name={file.name} onRemove={onRemove} />
    </li>
  );
}
