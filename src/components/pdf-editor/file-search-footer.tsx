import { EditorKey } from "@/components/pdf-editor/editor-key";
import {
  FILE_SEARCH_HINT_BESIDE,
  FILE_SEARCH_HINT_OPEN,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import type { FileReadProgress } from "@/lib/pdf-editor/file-search/types";
import { formatKeys } from "@/lib/pdf-editor/shortcut-label";

interface FileSearchFooterProps {
  progress: FileReadProgress | null;
}

const HINTS = [
  { keys: SHORTCUT_HINTS.searchFilesOpen, label: FILE_SEARCH_HINT_OPEN },
  {
    keys: SHORTCUT_HINTS.searchFilesOpenBeside,
    label: FILE_SEARCH_HINT_BESIDE,
  },
];

/** How far through reading the files it is, and what the keys do. */
export function FileSearchFooter({ progress }: FileSearchFooterProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t-2 bg-muted px-3 py-2 text-muted-foreground text-xs">
      <span aria-live="polite" className="font-medium text-foreground">
        {progress
          ? `Reading ${progress.done + 1} of ${progress.total} files`
          : null}
      </span>
      <span className="ml-auto flex items-center gap-4">
        {HINTS.map((hint) => (
          <span className="flex items-center gap-1" key={hint.label}>
            {formatKeys(hint.keys).map((key) => (
              <EditorKey key={key}>{key}</EditorKey>
            ))}
            <span className="ml-1">{hint.label}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
