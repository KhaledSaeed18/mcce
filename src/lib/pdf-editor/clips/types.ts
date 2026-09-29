import type { Box, OpenFile } from "../types";

/** The corner of the pages a card keeps to as the space around it changes. */
export type ClipCorner =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

/** Where a card sits: how far its nearest corner is from the same corner of
 * the pages, and how wide it is. Its height follows from its picture. */
export interface ClipPlace {
  corner: ClipCorner;
  width: number;
  x: number;
  y: number;
}

/** A part of a page kept in view as a picture. */
export interface EditorClip {
  /** Width over height of the picture, which the card keeps. */
  aspect: number;
  /** The part of the page, in the page's upright space, as markup is kept. */
  box: Box;
  file: OpenFile;
  id: string;
  isFolded: boolean;
  /** The page by identity, so the clip follows it when pages move. */
  pageId: string;
  /** The page's number when it was clipped, shown until the file's pages
   * are known. */
  pageNumber: number;
  place: ClipPlace;
  /** Quarter turns the page had when the picture was drawn, so a shared
   * link draws it turned the same way. */
  rotation: number;
  /** Bumped when the picture is drawn again, so it is read afresh. */
  version: number;
}

/** Every clip, on screen and closed, and whether they are all hidden. */
export interface ClipDesk {
  /** The order they stack in, the last on top. */
  clips: EditorClip[];
  /** Newest first. */
  closed: EditorClip[];
  isHidden: boolean;
}

/** A picture drawn from a page, with its size in pixels. */
export interface ClipPicture {
  blob: Blob;
  height: number;
  width: number;
}

/** A clip as a shared link names it, for the browser opening the link to
 * draw from its file. */
export interface SharedClip {
  box: Box;
  file: OpenFile;
  rotation: number;
  /** The page's place in the file, which is the same in every browser. */
  sourceIndex: number;
}
