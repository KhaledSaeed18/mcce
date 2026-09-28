import type { MaterialType } from "@/lib/drive/types";
import type { FileChip } from "./types";

const SOLUTION_TAG = /\[[^\]]*(?:solution|solved)[^\]]*\]/i;
const BOOK_TAG = /\[book\]/i;
const SHEET_NAME = /formula|cheat.?sheet|table.of/i;

const CHIP_BY_MATERIAL: Partial<Record<MaterialType, FileChip>> = {
  assessment: "quiz",
  assignment: "hw",
  book: "book",
  exam: "exam",
  exercise: "ex",
  lab: "lab",
  lecture: "lec",
};

/** What a file is for, from its name first and its folder second: a solution,
 * a book, or a formula sheet says so in its name, whatever folder it sits
 * in. A file from the reader's computer has no material type, and gets no
 * chip unless its name gives one. */
export function findFileChip(
  name: string,
  materialType: MaterialType | null
): FileChip | null {
  if (SOLUTION_TAG.test(name)) {
    return "sol";
  }
  if (BOOK_TAG.test(name)) {
    return "book";
  }
  if (SHEET_NAME.test(name)) {
    return "sheet";
  }
  return materialType ? (CHIP_BY_MATERIAL[materialType] ?? null) : null;
}
