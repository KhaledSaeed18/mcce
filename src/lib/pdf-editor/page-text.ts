import type { PageText, PageTextItem, TextPoint } from "./types";

/** Items that end a line are followed by a space, so words either side of a
 * line break stay apart instead of running together into one. */
const LINE_BREAK = " ";

/** Lowercased one character at a time: a character whose lowercase is longer
 * is kept as it is, so every offset still points at the same character. */
function lowercaseInPlace(text: string): string {
  let result = "";
  for (const character of text) {
    const lower = character.toLowerCase();
    result += lower.length === character.length ? lower : character;
  }
  return result;
}

export function buildPageText(items: readonly PageTextItem[]): PageText {
  const itemStarts: number[] = [];
  let text = "";
  for (const item of items) {
    itemStarts.push(text.length);
    text += item.str;
    if (item.hasEOL) {
      text += LINE_BREAK;
    }
  }
  return { itemStarts, text: lowercaseInPlace(text) };
}

/** The last item starting at or before an offset, found by halving. */
function findItem(itemStarts: readonly number[], offset: number): number {
  let low = 0;
  let high = itemStarts.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (itemStarts[middle] <= offset) {
      low = middle;
    } else {
      high = middle - 1;
    }
  }
  return low;
}

/** The item and offset of the character at `offset` in the run-together text. */
export function locateCharacter(page: PageText, offset: number): TextPoint {
  const item = findItem(page.itemStarts, offset);
  return { item, offset: offset - page.itemStarts[item] };
}
