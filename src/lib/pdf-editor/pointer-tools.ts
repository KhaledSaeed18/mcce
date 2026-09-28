import type { PointerEvent } from "react";
import type { EditorTool } from "./types";

export interface PointerHandlers {
  handleDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  handleMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  handleUp: (event: PointerEvent<HTMLCanvasElement>) => void;
}

/** The tools that take the pointer on a page, each with its own handlers. */
export interface PointerTools {
  eraser: PointerHandlers;
  hand: PointerHandlers;
  note: PointerHandlers;
  shapes: PointerHandlers;
  text: PointerHandlers;
}

const IGNORE_POINTER: PointerHandlers = {
  handleDown: () => undefined,
  handleMove: () => undefined,
  handleUp: () => undefined,
};

/** Tools with handlers of their own; the rest draw shapes. */
const OWN_HANDLERS: Partial<Record<EditorTool, keyof PointerTools>> = {
  eraser: "eraser",
  hand: "hand",
  note: "note",
  text: "text",
};

/** The handlers for the tool in hand. With the select tool the text layer
 * takes the pointer, so the page ignores it. */
export function pickPointerTool(
  tool: EditorTool,
  tools: PointerTools
): PointerHandlers {
  if (tool === "select") {
    return IGNORE_POINTER;
  }
  return tools[OWN_HANDLERS[tool] ?? "shapes"];
}
