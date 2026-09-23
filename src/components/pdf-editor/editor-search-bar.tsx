import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import {
  SEARCH_LABEL,
  SEARCH_NO_MATCHES,
  SEARCH_PLACEHOLDER,
  SEARCH_READING,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import { useFocusOnRequest } from "@/hooks/use-focus-on-request";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";

const PREVIOUS_LABEL = "Previous match";
const NEXT_LABEL = "Next match";
const CLOSE_LABEL = "Close search";

interface EditorSearchBarProps {
  current: number;
  focusRequest: number;
  isReading: boolean;
  matchCount: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onQueryChange: (query: string) => void;
  query: string;
}

function describeResult(
  query: string,
  current: number,
  matchCount: number,
  isReading: boolean
): string {
  if (matchCount > 0) {
    return `${current + 1} of ${matchCount}`;
  }
  if (isReading) {
    return SEARCH_READING;
  }
  return query.trim() ? SEARCH_NO_MATCHES : "";
}

export function EditorSearchBar({
  current,
  focusRequest,
  isReading,
  matchCount,
  onClose,
  onNext,
  onPrevious,
  onQueryChange,
  query,
}: EditorSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useFocusOnRequest(inputRef, focusRequest);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value),
    [onQueryChange]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        (event.shiftKey ? onPrevious : onNext)();
      } else if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose, onNext, onPrevious]
  );

  return (
    <search className="absolute top-3 right-6 z-20 flex items-center gap-1 rounded border-2 bg-card p-1 shadow-md">
      <SearchIcon
        aria-hidden="true"
        className="ml-1.5 size-4 text-muted-foreground"
      />
      <input
        aria-label={SEARCH_LABEL}
        className="h-8 w-48 bg-transparent px-1.5 text-sm outline-none"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={SEARCH_PLACEHOLDER}
        ref={inputRef}
        type="search"
        value={query}
      />
      <span
        aria-live="polite"
        className="min-w-20 text-center font-head text-muted-foreground text-xs tabular-nums"
      >
        {describeResult(query, current, matchCount, isReading)}
      </span>
      <Button
        aria-label={PREVIOUS_LABEL}
        disabled={matchCount === 0}
        onClick={onPrevious}
        size="icon-sm"
        title={withShortcut(PREVIOUS_LABEL, SHORTCUT_HINTS.searchPrevious)}
        variant="ghost"
      >
        <ChevronUpIcon />
      </Button>
      <Button
        aria-label={NEXT_LABEL}
        disabled={matchCount === 0}
        onClick={onNext}
        size="icon-sm"
        title={withShortcut(NEXT_LABEL, SHORTCUT_HINTS.searchNext)}
        variant="ghost"
      >
        <ChevronDownIcon />
      </Button>
      <Button
        aria-label={CLOSE_LABEL}
        onClick={onClose}
        size="icon-sm"
        title={withShortcut(CLOSE_LABEL, SHORTCUT_HINTS.deselect)}
        variant="ghost"
      >
        <XIcon />
      </Button>
    </search>
  );
}
