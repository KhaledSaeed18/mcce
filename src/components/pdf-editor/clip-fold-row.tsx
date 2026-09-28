import { ClipFoldChip } from "@/components/pdf-editor/clip-fold-chip";
import { CLIP_FOLD_ROW_HEIGHT, CLIP_FOLDED_LABEL } from "@/config/pdf-editor";
import type { EditorClip } from "@/lib/pdf-editor/clips/types";
import type { TabLabel } from "@/lib/pdf-editor/types";

interface ClipFoldRowProps {
  clips: EditorClip[];
  labels: ReadonlyMap<string, TabLabel>;
  onFold: (id: string, isFolded: boolean) => void;
  pageNumbers: ReadonlyMap<string, number | null>;
}

/** Folded clips, in a row along the bottom edge of the pages. */
export function ClipFoldRow({
  clips,
  labels,
  onFold,
  pageNumbers,
}: ClipFoldRowProps) {
  return (
    <ul
      aria-label={CLIP_FOLDED_LABEL}
      className="pointer-events-auto absolute inset-x-3 bottom-0 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]"
      style={{ height: CLIP_FOLD_ROW_HEIGHT }}
    >
      {clips.map((clip) => (
        <li key={clip.id}>
          <ClipFoldChip
            id={clip.id}
            label={labels.get(clip.id)}
            onFold={onFold}
            pageNumber={pageNumbers.get(clip.id) ?? null}
          />
        </li>
      ))}
    </ul>
  );
}
