import { TEXT_FONTS } from "@/config/pdf-editor";
import type { TextFormat } from "./types";

/** The CSS font for canvas drawing and measuring, in the one order canvas accepts. */
export function getCanvasFont(format: TextFormat, fontSize: number): string {
  const style = format.italic ? "italic " : "";
  const weight = format.bold ? "bold " : "";
  const { stack } = TEXT_FONTS[format.fontFamily ?? "sans"];
  return `${style}${weight}${fontSize}px ${stack}`;
}
