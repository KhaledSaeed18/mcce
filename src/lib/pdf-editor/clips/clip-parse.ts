import { isOpenFile } from "../open-file-parse";
import type { Box } from "../types";
import type { ClipCorner, ClipPlace, EditorClip } from "./types";

const CORNERS: readonly ClipCorner[] = [
  "bottom-left",
  "bottom-right",
  "top-left",
  "top-right",
];

type Stored = Record<string, unknown>;

function isRecord(value: unknown): value is Stored {
  return typeof value === "object" && value !== null;
}

function areNumbers(stored: Stored, keys: readonly string[]): boolean {
  return keys.every((key) => Number.isFinite(stored[key]));
}

function parseBox(value: unknown): Box | null {
  return isRecord(value) && areNumbers(value, ["height", "width", "x", "y"])
    ? (value as unknown as Box)
    : null;
}

function parsePlace(value: unknown): ClipPlace | null {
  const isPlace =
    isRecord(value) &&
    CORNERS.includes(value.corner as ClipCorner) &&
    areNumbers(value, ["width", "x", "y"]);
  return isPlace ? (value as unknown as ClipPlace) : null;
}

/** A clip as stored, or null when it does not hold together. */
export function parseClip(value: unknown): EditorClip | null {
  if (!isRecord(value)) {
    return null;
  }
  const box = parseBox(value.box);
  const place = parsePlace(value.place);
  const isClip =
    box !== null &&
    place !== null &&
    isOpenFile(value.file) &&
    typeof value.id === "string" &&
    typeof value.pageId === "string" &&
    areNumbers(value, ["aspect", "pageNumber", "version"]);
  if (!isClip) {
    return null;
  }
  return {
    aspect: value.aspect as number,
    box,
    file: value.file as EditorClip["file"],
    id: value.id as string,
    isFolded: value.isFolded === true,
    pageId: value.pageId as string,
    pageNumber: value.pageNumber as number,
    place,
    // Clips kept before turns were recorded were drawn from their pages as
    // they were turned then, which is not known; upright is the best guess.
    rotation: Number.isFinite(value.rotation) ? (value.rotation as number) : 0,
    version: value.version as number,
  };
}
