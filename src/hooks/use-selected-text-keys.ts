import { useEffect, useRef } from "react";
import { TEXT_NUDGE, TEXT_NUDGE_LARGE } from "@/config/pdf-editor";
import { isDialogTarget } from "@/lib/is-dialog-target";
import { isEditableTarget } from "@/lib/is-editable-target";
import { clampDelta } from "@/lib/pdf-editor/bounds";
import { getTextBox } from "@/lib/pdf-editor/text-layout";
import { readStyleShortcut } from "@/lib/pdf-editor/text-style";
import type {
  AnnotationActions,
  PageSize,
  Point,
  TextAnnotation,
} from "@/lib/pdf-editor/types";

const ARROW_DIRECTIONS: Readonly<Record<string, Point>> = {
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
};

interface SelectedTextKeyOptions {
  actions: AnnotationActions;
  onEdit: (text: TextAnnotation) => void;
  selected: TextAnnotation | null;
  size: PageSize;
}

function isDuplicateKey(event: KeyboardEvent): boolean {
  return (
    (event.metaKey || event.ctrlKey) &&
    !(event.altKey || event.shiftKey) &&
    event.key.toLowerCase() === "d"
  );
}

function nudge(
  event: KeyboardEvent,
  selected: TextAnnotation,
  size: PageSize,
  actions: AnnotationActions
): boolean {
  const direction = ARROW_DIRECTIONS[event.key];
  if (!direction) {
    return false;
  }
  const step = event.shiftKey ? TEXT_NUDGE_LARGE : TEXT_NUDGE;
  const delta = clampDelta(
    getTextBox(selected),
    { x: direction.x * step, y: direction.y * step },
    size
  );
  actions.moveText(selected.id, delta.x, delta.y);
  return true;
}

/** Whether the key was one that acts on selected text, having acted on it. */
function runKey(
  event: KeyboardEvent,
  { actions, onEdit, size }: SelectedTextKeyOptions,
  selected: TextAnnotation
): boolean {
  if (!(event.metaKey || event.ctrlKey || event.altKey)) {
    if (event.key === "Enter" && !event.shiftKey) {
      onEdit(selected);
      return true;
    }
    return nudge(event, selected, size, actions);
  }
  if (isDuplicateKey(event)) {
    actions.duplicateText();
    return true;
  }
  const style = readStyleShortcut(event, selected);
  if (style) {
    actions.restyleText(style);
  }
  return style !== null;
}

/**
 * The keys that act on selected text: Enter opens it, the arrows nudge it, and
 * the formatting shortcuts restyle it. They listen ahead of the editor's own
 * keys, where the arrows turn pages, and only for as long as text is selected.
 */
export function useSelectedTextKeys(options: SelectedTextKeyOptions) {
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const isSelected = options.selected !== null;

  useEffect(() => {
    if (!isSelected) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      const { current } = optionsRef;
      if (
        !current.selected ||
        isEditableTarget(event.target) ||
        isDialogTarget(event.target)
      ) {
        return;
      }
      if (runKey(event, current, current.selected)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isSelected]);
}
