import { useCallback } from "react";
import { CommandItem } from "@/components/ui/command";
import {
  FILE_SEARCH_RESULT_LIMIT,
  FILE_SEARCH_SHOW_ALL_VALUE,
  FILE_SEARCH_VALUE_SEPARATOR,
} from "@/config/pdf-editor";

interface FileSearchShowAllProps {
  count: number;
  fileId: string;
  onSelect: (value: string) => void;
}

function describe(count: number): string {
  return count > FILE_SEARCH_RESULT_LIMIT
    ? `Show the first ${FILE_SEARCH_RESULT_LIMIT} of ${count}`
    : `Show all ${count}`;
}

/** The line under a file's first few results that lists the rest. */
export function FileSearchShowAll({
  count,
  fileId,
  onSelect,
}: FileSearchShowAllProps) {
  const value = `${fileId}${FILE_SEARCH_VALUE_SEPARATOR}${FILE_SEARCH_SHOW_ALL_VALUE}`;
  const handleSelect = useCallback(() => onSelect(value), [onSelect, value]);

  return (
    <CommandItem
      className="pl-4 font-medium underline underline-offset-2"
      onSelect={handleSelect}
      value={value}
    >
      {describe(count)}
    </CommandItem>
  );
}
