import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import type { Annotation, NoteAnnotation } from "@/lib/pdf-editor/types";

interface NoteDraftOptions {
  note: NoteAnnotation;
  onClose: () => void;
  onRemove: (id: string) => void;
  onReplace: (annotation: Annotation) => void;
}

/**
 * The text of a note while its card is open. It is written back once, as one
 * undo step, when the card loses focus or Escape closes it, and a note left
 * empty is taken off the page. A press elsewhere on the page takes focus from
 * the card before it closes, so that writes it too.
 */
export function useNoteDraft({
  note,
  onClose,
  onRemove,
  onReplace,
}: NoteDraftOptions) {
  const [text, setText] = useState(note.text);
  const textRef = useRef(text);
  const noteRef = useRef(note);
  // What the note last said on the page, or null while nothing has been written.
  const savedRef = useRef<string | null>(note.text || null);
  textRef.current = text;
  noteRef.current = note;

  const commit = useCallback(() => {
    const next = textRef.current.trim();
    if (next === savedRef.current) {
      return;
    }
    savedRef.current = next;
    if (next) {
      onReplace({ ...noteRef.current, text: next });
    } else {
      onRemove(noteRef.current.id);
    }
  }, [onRemove, onReplace]);

  const remove = useCallback(() => {
    savedRef.current = textRef.current.trim();
    onRemove(noteRef.current.id);
  }, [onRemove]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value),
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Escape") {
        commit();
        onClose();
      }
    },
    [commit, onClose]
  );

  return { commit, handleChange, handleKeyDown, remove, text };
}
