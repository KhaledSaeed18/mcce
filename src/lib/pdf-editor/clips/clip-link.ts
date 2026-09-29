import {
  CLIP_LINK_PART_SEPARATOR,
  CLIP_LINK_SEPARATOR,
} from "@/config/pdf-editor";
import type { Box, EditorTreeNode, OpenFile } from "../types";
import type { EditorClip } from "./types";

/** A clip as a shared link names it, for the browser opening the link to
 * draw from its file. */
export interface SharedClip {
  box: Box;
  file: OpenFile;
  /** The page's place in the file, which is the same in every browser. */
  sourceIndex: number;
}

const OWN_PAGE_ID = /^p(\d+)$/;
const PARTS = 6;

/** The clips a link can carry: from index files, on pages the file came
 * with. Files from this device and pages put in by the reader stay here. */
export function writeClipLink(
  clips: readonly EditorClip[]
): string | undefined {
  const parts = clips.flatMap((clip) => {
    const page = OWN_PAGE_ID.exec(clip.pageId);
    if (clip.file.source !== "drive" || !page) {
      return [];
    }
    const { height, width, x, y } = clip.box;
    const numbers = [page[1], x, y, width, height].map((n) =>
      Math.round(Number(n))
    );
    return [[clip.file.id, ...numbers].join(CLIP_LINK_PART_SEPARATOR)];
  });
  return parts.length > 0 ? parts.join(CLIP_LINK_SEPARATOR) : undefined;
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
    const [sourceIndex, x, y, width, height] = numbers;
    const isValid =
      rest.length === PARTS - 1 &&
      numbers.every(Number.isFinite) &&
      Number.isInteger(sourceIndex) &&
      sourceIndex >= 0 &&
      width > 0 &&
      height > 0;
    if (!(node && isValid)) {
      return [];
    }
    const file: OpenFile = { id: node.id, name: node.name, source: "drive" };
    return [{ box: { height, width, x, y }, file, sourceIndex }];
  });
}
