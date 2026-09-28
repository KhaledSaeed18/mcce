import { FileSearchResult } from "@/components/pdf-editor/file-search-result";
import { FileSearchShowAll } from "@/components/pdf-editor/file-search-show-all";
import { FileTypeChip } from "@/components/pdf-editor/file-type-chip";
import { CommandGroup } from "@/components/ui/command";
import { FILE_SEARCH_PREVIEW_COUNT } from "@/config/pdf-editor";
import type { FileSearchGroup as FileSearchGroupData } from "@/lib/pdf-editor/file-search/types";
import type { TabLabel } from "@/lib/pdf-editor/types";

interface FileSearchGroupProps {
  group: FileSearchGroupData;
  isExpanded: boolean;
  label: TabLabel | undefined;
  onSelect: (value: string) => void;
  /** The file's text by the page's place in the file. */
  pages: string[];
  queryLength: number;
}

/** One file's results, headed by its chip, short name, and match count. */
export function FileSearchGroup({
  group,
  isExpanded,
  label,
  onSelect,
  pages,
  queryLength,
}: FileSearchGroupProps) {
  const { count, file, hits } = group;
  const shown = isExpanded ? hits : hits.slice(0, FILE_SEARCH_PREVIEW_COUNT);
  const heading = (
    <span className="flex items-center gap-2 text-foreground">
      {label?.chip ? <FileTypeChip chip={label.chip} /> : null}
      <span className="truncate font-bold">{label?.text ?? file.name}</span>
      <span className="ml-auto shrink-0 font-head tabular-nums">{count}</span>
    </span>
  );

  return (
    <CommandGroup heading={heading}>
      {shown.map((hit) => (
        <FileSearchResult
          fileId={file.id}
          hit={hit}
          key={hit.matchIndex}
          onSelect={onSelect}
          pageText={pages[hit.sourceIndex]}
          queryLength={queryLength}
        />
      ))}
      {count > shown.length ? (
        <FileSearchShowAll count={count} fileId={file.id} onSelect={onSelect} />
      ) : null}
    </CommandGroup>
  );
}
