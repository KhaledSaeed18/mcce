import { measureTextWidth } from "./text-metrics";
import type { TextFormat } from "./types";

/** Splits one word that is wider than the box, which no space can break for us. */
function breakWord(
  word: string,
  fontSize: number,
  width: number,
  format: TextFormat
): string[] {
  const parts: string[] = [];
  let current = "";

  for (const character of word) {
    const next = current + character;
    if (current && measureTextWidth(next, fontSize, format) > width) {
      parts.push(current);
      current = character;
      continue;
    }
    current = next;
  }

  parts.push(current);
  return parts;
}

function wrapLine(
  line: string,
  fontSize: number,
  width: number,
  format: TextFormat
): string[] {
  const lines: string[] = [];
  let current = "";

  for (const word of line.split(" ")) {
    const candidate = current ? `${current} ${word}` : word;
    if (measureTextWidth(candidate, fontSize, format) <= width) {
      current = candidate;
      continue;
    }
    // A word too wide for an empty line has to be split rather than pushed on.
    if (current) {
      lines.push(current);
    }
    const parts = breakWord(word, fontSize, width, format);
    lines.push(...parts.slice(0, -1));
    current = parts.at(-1) ?? "";
  }

  lines.push(current);
  return lines;
}

/** Typed newlines always break; a box with a width breaks between words as well. */
export function wrapText(
  text: string,
  fontSize: number,
  width: number | undefined,
  format: TextFormat = {}
): string[] {
  const paragraphs = text.split("\n");
  if (width === undefined) {
    return paragraphs;
  }
  return paragraphs.flatMap((line) => wrapLine(line, fontSize, width, format));
}
