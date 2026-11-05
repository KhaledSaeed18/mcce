import { useCallback } from "react";
import { useTextBoxTransform } from "@/hooks/use-text-box-transform";
import { useTextCommit } from "@/hooks/use-text-commit";
import type {
  Annotation,
  AnnotationActions,
  PageSize,
  TextDraft,
} from "@/lib/pdf-editor/types";

interface TextDraftOptions {
  actions: AnnotationActions;
  annotations: Annotation[];
  draft: TextDraft | null;
  onChange: (draft: TextDraft | null) => void;
  size: PageSize;
}

/** The box being typed into: what its handles and keys do, and what leaving it does. */
export function useTextDraft({
  actions,
  annotations,
  draft,
  onChange,
  size,
}: TextDraftOptions) {
  const commit = useTextCommit({ actions, annotations, draft, onChange, size });

  const handleUpdate = useCallback(
    (next: TextDraft) => onChange({ ...next, isEdgeWrapped: false }),
    [onChange]
  );
  const { finish, resizeCorner, resizeSide } = useTextBoxTransform({
    onUpdate: handleUpdate,
    size,
    target: draft,
  });

  const edit = useCallback(
    (text: string) => {
      if (draft) {
        onChange({ ...draft, text });
      }
    },
    [draft, onChange]
  );

  const move = useCallback(
    (dx: number, dy: number) => {
      if (draft) {
        onChange({ ...draft, x: draft.x + dx, y: draft.y + dy });
      }
    },
    [draft, onChange]
  );

  const fitWidth = useCallback(() => {
    if (draft) {
      onChange({ ...draft, isEdgeWrapped: false, width: undefined });
    }
  }, [draft, onChange]);

  return { commit, edit, finish, fitWidth, move, resizeCorner, resizeSide };
}
