import { NOTE_SIZE } from "@/config/pdf-editor";
import type { Box, NoteAnnotation } from "./types";

/** The square a note's icon takes up on the page, whatever the note says. */
export function getNoteBox(note: Pick<NoteAnnotation, "x" | "y">): Box {
  return { height: NOTE_SIZE, width: NOTE_SIZE, x: note.x, y: note.y };
}
