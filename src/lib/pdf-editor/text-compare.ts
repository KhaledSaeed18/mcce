import type { TextAnnotation } from "./types";

const TAB_PATTERN = /\t/gu;
const LINE_END_PATTERN = /\r\n?/gu;
const TAB_AS_SPACES = "    ";

/** Typed or pasted text as the page keeps it: no tabs, which the PDF fonts
 * cannot write, one kind of line break, and nothing dangling off the end. */
export function cleanTypedText(text: string): string {
  return text
    .replace(LINE_END_PATTERN, "\n")
    .replace(TAB_PATTERN, TAB_AS_SPACES)
    .trimEnd();
}

const COMPARED_FIELDS = [
  "align",
  "background",
  "bold",
  "color",
  "fontFamily",
  "fontSize",
  "italic",
  "text",
  "underline",
  "width",
  "x",
  "y",
] as const satisfies ReadonlyArray<keyof TextAnnotation>;

export function isSameText(a: TextAnnotation, b: TextAnnotation): boolean {
  return COMPARED_FIELDS.every((field) => a[field] === b[field]);
}
