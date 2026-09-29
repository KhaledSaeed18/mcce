import { SearchIcon, TextSearchIcon } from "lucide-react";
import { SearchButton } from "@/components/pdf-editor/search-button";
import {
  FILE_SEARCH_LABEL,
  SEARCH_LABEL,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";

interface SearchButtonsProps {
  onOpenFileSearch: () => void;
  onOpenSearch: () => void;
}

/** Search this file, and search every open file, side by side. */
export function SearchButtons({
  onOpenFileSearch,
  onOpenSearch,
}: SearchButtonsProps) {
  return (
    <>
      <SearchButton
        icon={SearchIcon}
        label={SEARCH_LABEL}
        onOpen={onOpenSearch}
        shortcut={SHORTCUT_HINTS.search}
      />
      <SearchButton
        icon={TextSearchIcon}
        label={FILE_SEARCH_LABEL}
        onOpen={onOpenFileSearch}
        shortcut={SHORTCUT_HINTS.searchFiles}
      />
    </>
  );
}
