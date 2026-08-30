import { type RefObject, useLayoutEffect } from "react";

/**
 * Keeps a textarea exactly as tall as the lines it holds. It runs after every
 * render because the content, the font size and the zoom all change that height.
 */
export function useAutoGrow(ref: RefObject<HTMLTextAreaElement | null>): void {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  });
}
