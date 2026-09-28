import { FileTypeChip } from "@/components/pdf-editor/file-type-chip";
import { CLIP_PAGE_GONE, PAGE_NUMBER_PREFIX } from "@/config/pdf-editor";
import type { TabLabel } from "@/lib/pdf-editor/types";

interface ClipTitleProps {
  label: TabLabel | undefined;
  /** Null once the clip's page has been removed from its file. */
  pageNumber: number | null;
}

/** A clip named as its tab would be, with its page. */
export function ClipTitle({ label, pageNumber }: ClipTitleProps) {
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      {label?.chip ? <FileTypeChip chip={label.chip} /> : null}
      <span className="truncate font-bold">{label?.text}</span>
      <span className="shrink-0 font-head text-muted-foreground text-xs tabular-nums">
        {pageNumber === null
          ? CLIP_PAGE_GONE
          : `${PAGE_NUMBER_PREFIX} ${pageNumber}`}
      </span>
    </span>
  );
}
