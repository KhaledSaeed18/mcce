import { type KeyboardEvent, useCallback, useState } from "react";
import {
  FILE_SEARCH_SHOW_ALL_VALUE,
  FILE_SEARCH_VALUE_SEPARATOR,
} from "@/config/pdf-editor";
import type {
  FileSearchGroup,
  FileSearchPick,
} from "@/lib/pdf-editor/file-search/types";
import type { OpenFile } from "@/lib/pdf-editor/types";

interface FileSearchPickerOptions {
  groups: FileSearchGroup[];
  onClose: () => void;
  onPick: (file: OpenFile, pick: FileSearchPick, isBeside: boolean) => void;
  query: string;
}

/** Which result is highlighted, which files show all their results, and what
 * Enter and Alt+Enter do with the highlighted one. */
export function useFileSearchPicker({
  groups,
  onClose,
  onPick,
  query,
}: FileSearchPickerOptions) {
  const [value, setValue] = useState("");
  // Kept with the query they were opened for, so a new search starts folded.
  const [shownAll, setShownAll] = useState({ ids: new Set<string>(), query });
  const expanded = shownAll.query === query ? shownAll.ids : new Set<string>();

  const choose = useCallback(
    (itemValue: string, isBeside: boolean) => {
      const [fileId, place] = itemValue.split(FILE_SEARCH_VALUE_SEPARATOR);
      const group = groups.find((item) => item.file.id === fileId);
      if (!group) {
        return;
      }
      if (place === FILE_SEARCH_SHOW_ALL_VALUE) {
        setShownAll({ ids: new Set(expanded).add(fileId), query });
        return;
      }
      onPick(
        group.file,
        { fileId, matchIndex: Number(place), query },
        isBeside
      );
      onClose();
    },
    [expanded, groups, onClose, onPick, query]
  );

  const handleSelect = useCallback(
    (itemValue: string) => choose(itemValue, false),
    [choose]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.altKey) {
        event.preventDefault();
        choose(value, true);
      }
    },
    [choose, value]
  );

  return { expanded, handleKeyDown, handleSelect, setValue, value };
}
