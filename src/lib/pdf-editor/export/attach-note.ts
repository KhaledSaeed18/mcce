import { PDFHexString, type PDFPage } from "pdf-lib";
import { NOTE_SIZE } from "@/config/pdf-editor";
import { getRenderedSize } from "../rotation";
import type { NoteAnnotation, Point } from "../types";
import { type ContentMatrix, flipY, getContentMatrix } from "./content-space";
import { hexToRgb } from "./hex-to-rgb";

/** The PDF flag that has a reader print the note's icon along with the page. */
const PRINT_FLAG = 4;

function transform([a, b, c, d, e, f]: ContentMatrix, point: Point): Point {
  return { x: a * point.x + c * point.y + e, y: b * point.x + d * point.y + f };
}

/**
 * Writes a note as the PDF's own sticky note, which every reader shows as an
 * icon that opens to the text, rather than as ink on the page. Its place is
 * worked out the way drawn markup is, through the turn the page carries.
 * The text is written in UTF-16, so a note in any script survives.
 */
export function attachNote(
  page: PDFPage,
  note: NoteAnnotation,
  rotation: number
): void {
  const content = { height: page.getHeight(), width: page.getWidth() };
  const { height } = getRenderedSize(content, rotation);
  const matrix = getContentMatrix(content, rotation);
  const [first, second] = [
    { x: note.x, y: note.y },
    { x: note.x + NOTE_SIZE, y: note.y + NOTE_SIZE },
  ].map((corner) =>
    transform(matrix, { x: corner.x, y: flipY(height, corner.y) })
  );
  const { blue, green, red } = hexToRgb(note.color);

  const annotation = page.doc.context.obj({
    C: [red, green, blue],
    Contents: PDFHexString.fromText(note.text),
    F: PRINT_FLAG,
    Name: "Note",
    Open: false,
    Rect: [
      Math.min(first.x, second.x),
      Math.min(first.y, second.y),
      Math.max(first.x, second.x),
      Math.max(first.y, second.y),
    ],
    Subtype: "Text",
    Type: "Annot",
  });
  page.node.addAnnot(page.doc.context.register(annotation));
}
