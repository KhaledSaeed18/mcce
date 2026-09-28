import type { PDFFont } from "pdf-lib";
import { SUMMARY_MISSING_CHARACTER } from "@/config/pdf-editor";

const TAB_PATTERN = /\t/g;

/**
 * The text with every character the font cannot write swapped for a stand-in.
 * The summary is set in Helvetica, which every reader carries but which only
 * covers Latin script: rather than fail the whole download over one word, a
 * character outside it is marked where it was. Line breaks are kept for the
 * layout to act on.
 */
export function toWritableText(font: PDFFont, text: string): string {
  const supported = new Set(font.getCharacterSet());
  return Array.from(text.replace(TAB_PATTERN, " "), (character) => {
    const code = character.codePointAt(0) ?? 0;
    return character === "\n" || supported.has(code)
      ? character
      : SUMMARY_MISSING_CHARACTER;
  }).join("");
}
