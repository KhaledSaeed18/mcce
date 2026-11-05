import {
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  TEXT_SIZE_STEPS,
} from "@/config/pdf-editor";
import type { TextStyle } from "./types";

export function clampFontSize(fontSize: number): number {
  return Math.min(Math.max(fontSize, MIN_FONT_SIZE), MAX_FONT_SIZE);
}

/** The next size on the toolbar's scale, from any size a corner drag left behind. */
export function stepFontSize(fontSize: number, direction: 1 | -1): number {
  const next =
    direction === 1
      ? TEXT_SIZE_STEPS.find((step) => step > fontSize)
      : TEXT_SIZE_STEPS.filter((step) => step < fontSize).at(-1);
  return next ?? fontSize;
}

const SHORTCUT_TOGGLES = {
  b: "bold",
  i: "italic",
  u: "underline",
} as const;

function isShortcutToggle(key: string): key is keyof typeof SHORTCUT_TOGGLES {
  return key in SHORTCUT_TOGGLES;
}

/** The change a formatting shortcut asks for, or null when the keys are not one. */
export function readStyleShortcut(
  event: Pick<
    KeyboardEvent,
    "altKey" | "ctrlKey" | "key" | "metaKey" | "shiftKey"
  >,
  style: TextStyle
): Partial<TextStyle> | null {
  if (!(event.metaKey || event.ctrlKey) || event.altKey) {
    return null;
  }
  const key = event.key.toLowerCase();
  if (event.shiftKey && (key === "." || key === ">")) {
    return { fontSize: stepFontSize(style.fontSize, 1) };
  }
  if (event.shiftKey && (key === "," || key === "<")) {
    return { fontSize: stepFontSize(style.fontSize, -1) };
  }
  if (event.shiftKey || !isShortcutToggle(key)) {
    return null;
  }
  const field = SHORTCUT_TOGGLES[key];
  return { [field]: !style[field] };
}
