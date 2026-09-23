import { useEffect, useRef } from "react";
import { COPY_HOTKEY_KEY, PASTE_HOTKEY_KEY } from "@/config/pdf-editor";
import { isDialogTarget } from "@/lib/is-dialog-target";
import { isEditableTarget } from "@/lib/is-editable-target";
import { pasteAnnotation } from "@/lib/pdf-editor/paste-annotation";
import type { Annotation, EditorPage } from "@/lib/pdf-editor/types";

interface MarkupClipboardOptions {
  activeIndex: number;
  annotations: Annotation[];
  onAdd: (annotation: Annotation) => void;
  onSelect: (id: string | null) => void;
  pages: EditorPage[];
  selectedId: string | null;
}

/** Selected text on the page copies as text, the way the browser does it. */
function hasTextSelection(): boolean {
  return !(document.getSelection()?.isCollapsed ?? true);
}

/**
 * Cmd/Ctrl+C copies the selected markup and Cmd/Ctrl+V pastes it onto the
 * page being read, selected so it can be moved into place. The copy is kept
 * in the editor rather than the system clipboard, which cannot hold markup.
 */
export function useMarkupClipboard({
  activeIndex,
  annotations,
  onAdd,
  onSelect,
  pages,
  selectedId,
}: MarkupClipboardOptions) {
  const copiedRef = useRef<Annotation | null>(null);
  const pastesRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModified = (event.metaKey || event.ctrlKey) && !event.altKey;
      if (
        !isModified ||
        isEditableTarget(event.target) ||
        isDialogTarget(event.target)
      ) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === COPY_HOTKEY_KEY && !hasTextSelection()) {
        const selected = annotations.find((item) => item.id === selectedId);
        if (selected) {
          copiedRef.current = selected;
          pastesRef.current = 0;
        }
        return;
      }
      const copied = copiedRef.current;
      const page = pages[activeIndex];
      if (key !== PASTE_HOTKEY_KEY || !copied || !page) {
        return;
      }
      event.preventDefault();
      pastesRef.current += 1;
      const pasted = pasteAnnotation(copied, page.id, pastesRef.current);
      onAdd(pasted);
      onSelect(pasted.id);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, annotations, onAdd, onSelect, pages, selectedId]);
}
