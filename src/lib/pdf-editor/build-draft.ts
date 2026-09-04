import type { Point, TextAnnotation, TextDraft, ToolSettings } from "./types";

/** A field for text that does not exist yet, styled by whatever the toolbar holds. */
export function buildDraft(
  point: Point,
  pageId: string,
  settings: ToolSettings
): TextDraft {
  return {
    color: settings.color,
    fontSize: settings.fontSize,
    pageId,
    text: "",
    x: point.x,
    y: point.y,
  };
}

/** A field over text already on the page, which keeps the style it was written in. */
export function toDraft(annotation: TextAnnotation): TextDraft {
  return {
    color: annotation.color,
    fontSize: annotation.fontSize,
    id: annotation.id,
    pageId: annotation.pageId,
    text: annotation.text,
    width: annotation.width,
    x: annotation.x,
    y: annotation.y,
  };
}
