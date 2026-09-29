import {
  CLIP_LINK_PART_SEPARATOR,
  CLIP_LINK_SEPARATOR,
  PAGE_FULL_TURN,
  PAGE_QUARTER_TURN,
} from "@/config/pdf-editor";
import type { EditorTreeNode, OpenFile } from "../types";
import type { SharedClip } from "./types";

/** Page, box, and an optional turn, which links from before turns were
 * carried leave out. */
const NUMBERS = 5;
const NUMBERS_WITH_TURN = 6;

function isTurn(value: number): boolean {
  return (
    value >= 0 && value < PAGE_FULL_TURN && value % PAGE_QUARTER_TURN === 0
  );
}

/** The clips a link names, those on index files this browser knows. */
export function readClipLink(
  value: string | undefined,
  nodes: EditorTreeNode[]
): SharedClip[] {
  return (value ?? "").split(CLIP_LINK_SEPARATOR).flatMap((part) => {
    const [id, ...rest] = part.split(CLIP_LINK_PART_SEPARATOR);
    const numbers = rest.map(Number);
    const node = nodes.find((item) => item.id === id && item.kind === "pdf");
    const [sourceIndex, x, y, width, height, rotation = 0] = numbers;
    const isValid =
      (rest.length === NUMBERS || rest.length === NUMBERS_WITH_TURN) &&
      numbers.every(Number.isFinite) &&
      Number.isInteger(sourceIndex) &&
      sourceIndex >= 0 &&
      width > 0 &&
      height > 0 &&
      isTurn(rotation);
    if (!(node && isValid)) {
      return [];
    }
    const file: OpenFile = { id: node.id, name: node.name, source: "drive" };
    return [{ box: { height, width, x, y }, file, rotation, sourceIndex }];
  });
}
