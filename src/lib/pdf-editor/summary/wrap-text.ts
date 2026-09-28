/** Measures a run of text at the size it will be written in. */
export type MeasureText = (text: string) => number;

/** A word too long for a line on its own is broken wherever it runs out. */
function breakWord(
  word: string,
  width: number,
  measure: MeasureText
): string[] {
  const pieces: string[] = [];
  let piece = "";
  for (const character of word) {
    if (piece && measure(piece + character) > width) {
      pieces.push(piece);
      piece = "";
    }
    piece += character;
  }
  return piece ? [...pieces, piece] : pieces;
}

function wrapParagraph(
  paragraph: string,
  width: number,
  measure: MeasureText
): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of paragraph.split(" ").filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (measure(candidate) <= width) {
      line = candidate;
      continue;
    }
    if (line) {
      lines.push(line);
    }
    const pieces = breakWord(word, width, measure);
    line = pieces.pop() ?? "";
    lines.push(...pieces);
  }
  return line || lines.length === 0 ? [...lines, line] : lines;
}

/** Text laid into lines no wider than the width, keeping the line breaks it
 * was written with. */
export function wrapText(
  text: string,
  width: number,
  measure: MeasureText
): string[] {
  return text
    .split("\n")
    .flatMap((paragraph) => wrapParagraph(paragraph, width, measure));
}
