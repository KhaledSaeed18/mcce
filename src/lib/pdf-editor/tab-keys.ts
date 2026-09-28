import type { TabKey } from "./types";

const DIGIT = /^Digit[1-9]$/;
const LAST_TAB_DIGIT = 9;

type KeyPress = Pick<
  KeyboardEvent,
  "altKey" | "code" | "ctrlKey" | "metaKey" | "shiftKey"
>;

function readShiftedTabKey(code: string): TabKey | null {
  switch (code) {
    case "BracketLeft":
      return { step: -1, type: "move" };
    case "BracketRight":
      return { step: 1, type: "move" };
    case "KeyT":
      return { type: "reopen" };
    default:
      return null;
  }
}

/** Alt with a digit, a bracket, the backquote, W, or Shift with a bracket
 * or T. Keys are read by position, since Option on a Mac types a symbol
 * rather than the letter. Cmd and Ctrl versions belong to the browser's own
 * tabs. */
export function readTabKey(event: KeyPress): TabKey | null {
  if (!event.altKey || event.ctrlKey || event.metaKey) {
    return null;
  }
  if (event.shiftKey) {
    return readShiftedTabKey(event.code);
  }
  if (DIGIT.test(event.code)) {
    const number = Number(event.code.slice(-1));
    return {
      index: number === LAST_TAB_DIGIT ? "last" : number - 1,
      type: "go",
    };
  }
  switch (event.code) {
    case "BracketLeft":
      return { step: -1, type: "step" };
    case "BracketRight":
      return { step: 1, type: "step" };
    case "Backquote":
      return { type: "back" };
    case "KeyW":
      return { type: "close" };
    default:
      return null;
  }
}
