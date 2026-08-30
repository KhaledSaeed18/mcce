import { useCallback, useRef, useState } from "react";
import type { Annotation, TextDraft } from "@/lib/pdf-editor/types";

type TextStyle = Pick<TextDraft, "color" | "fontSize">;

interface EditorTextOptions {
  annotations: Annotation[];
  onRemove: (id: string) => void;
  onReplace: (annotation: Annotation) => void;
  setColor: (color: string) => void;
  setFontSize: (fontSize: number) => void;
}

/**
 * The one piece of text the editor is working on, in either of its two states:
 * selected, which is what the toolbar and the Delete key act on, or open for
 * typing. Entering one leaves the other.
 */
export function useEditorText({
  annotations,
  onRemove,
  onReplace,
  setColor,
  setFontSize,
}: EditorTextOptions) {
  const [draft, setDraft] = useState<TextDraft | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isOpenRef = useRef(false);

  const openDraft = useCallback(
    (next: TextDraft | null) => {
      // Opening a box points the toolbar at the style that text is written in.
      if (next && !isOpenRef.current) {
        setColor(next.color);
        setFontSize(next.fontSize);
        setSelectedId(null);
      }
      isOpenRef.current = next !== null;
      setDraft(next);
    },
    [setColor, setFontSize]
  );

  const select = useCallback((id: string | null) => setSelectedId(id), []);

  const restyle = useCallback(
    (style: Partial<TextStyle>) => {
      setDraft((current) => (current ? { ...current, ...style } : current));
      const target = annotations.find(
        (annotation) => annotation.id === selectedId
      );
      if (target?.type === "text") {
        onReplace({ ...target, ...style });
      }
    },
    [annotations, onReplace, selectedId]
  );

  const changeColor = useCallback(
    (color: string) => {
      setColor(color);
      restyle({ color });
    },
    [restyle, setColor]
  );

  const changeFontSize = useCallback(
    (fontSize: number) => {
      setFontSize(fontSize);
      restyle({ fontSize });
    },
    [restyle, setFontSize]
  );

  const removeSelected = useCallback(() => {
    if (selectedId) {
      onRemove(selectedId);
      setSelectedId(null);
    }
  }, [onRemove, selectedId]);

  return {
    changeColor,
    changeFontSize,
    draft,
    openDraft,
    removeSelected,
    select,
    selectedId,
  };
}
