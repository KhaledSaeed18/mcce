import { type KeyboardEvent, useCallback } from "react";
import { readStyleShortcut } from "@/lib/pdf-editor/text-style";
import type { TextStyle } from "@/lib/pdf-editor/types";

interface TextFieldKeyOptions {
  onFinish: () => void;
  onRestyle: (style: Partial<TextStyle>) => void;
  style: TextStyle;
}

function isFinishKey(event: KeyboardEvent<HTMLTextAreaElement>): boolean {
  const { key, metaKey, ctrlKey, shiftKey } = event;
  // Enter while an input method is composing picks a word rather than leaving.
  if (event.nativeEvent.isComposing) {
    return false;
  }
  if (key === "Enter") {
    return !shiftKey;
  }
  return (
    key === "Escape" ||
    key === "Tab" ||
    ((metaKey || ctrlKey) && key.toLowerCase() === "s")
  );
}

/** Enter finishes and Shift+Enter makes a new line. Escape finishes too, since
 * undo takes back anything the reader did not want, and nothing typed is lost
 * to a slip of one key. */
export function useTextFieldKeys({
  onFinish,
  onRestyle,
  style,
}: TextFieldKeyOptions) {
  return useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (isFinishKey(event)) {
        event.preventDefault();
        onFinish();
        return;
      }
      const change = readStyleShortcut(event, style);
      if (change) {
        event.preventDefault();
        onRestyle(change);
      }
    },
    [onFinish, onRestyle, style]
  );
}
