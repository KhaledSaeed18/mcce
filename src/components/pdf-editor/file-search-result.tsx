import { useCallback } from "react";
import { CommandItem } from "@/components/ui/command";
import {
  FILE_SEARCH_PAGE_PREFIX,
  FILE_SEARCH_VALUE_SEPARATOR,
} from "@/config/pdf-editor";
import { buildSnippet } from "@/lib/pdf-editor/file-search/file-snippet";
import type { FileSearchHit } from "@/lib/pdf-editor/file-search/types";

interface FileSearchResultProps {
  fileId: string;
  hit: FileSearchHit;
  onSelect: (value: string) => void;
  pageText: string;
  queryLength: number;
}

/** One match: the words around it with the match in bold, and its page. */
export function FileSearchResult({
  fileId,
  hit,
  onSelect,
  pageText,
  queryLength,
}: FileSearchResultProps) {
  const value = `${fileId}${FILE_SEARCH_VALUE_SEPARATOR}${hit.matchIndex}`;
  const handleSelect = useCallback(() => onSelect(value), [onSelect, value]);
  const { after, before, match } = buildSnippet(
    pageText,
    hit.offset,
    queryLength
  );

  return (
    <CommandItem className="pl-4" onSelect={handleSelect} value={value}>
      <span className="min-w-0 flex-1 truncate text-muted-foreground group-data-selected/command-item:text-foreground">
        {before}
        <strong className="font-bold text-foreground">{match}</strong>
        {after}
      </span>
      <span className="shrink-0 font-head text-muted-foreground text-xs tabular-nums">
        {FILE_SEARCH_PAGE_PREFIX} {hit.position + 1}
      </span>
    </CommandItem>
  );
}
