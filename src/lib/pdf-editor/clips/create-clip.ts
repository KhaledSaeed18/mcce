import type { PDFDocumentProxy } from "pdfjs-dist";
import type { Annotation, Box, EditorPage, OpenFile } from "../types";
import { drawClipPicture } from "./clip-picture";
import { saveClipPicture } from "./clip-picture-store";
import { placeNewClip } from "./clip-place";
import { changeStoredClip, readClipDesk, storeClip } from "./clip-store";
import type { EditorClip } from "./types";

/** What a clip is taken from: a page of a loaded file and its markup. */
export interface ClipSource {
  annotations: Annotation[];
  doc: PDFDocumentProxy;
  file: OpenFile;
  page: EditorPage;
  position: number;
}

function onPage(annotations: Annotation[], pageId: string): Annotation[] {
  return annotations.filter((annotation) => annotation.pageId === pageId);
}

/** Draws the box as a picture, keeps it, and puts the new card on screen. */
export async function createClip(source: ClipSource, box: Box): Promise<void> {
  const { doc, file, page, position } = source;
  const annotations = onPage(source.annotations, page.id);
  const picture = await drawClipPicture({ annotations, box, doc, page });
  const id = crypto.randomUUID();
  await saveClipPicture(id, picture.blob);
  const clip: EditorClip = {
    aspect: picture.width / picture.height,
    box,
    file,
    id,
    isFolded: false,
    pageId: page.id,
    pageNumber: position + 1,
    place: placeNewClip(readClipDesk().clips),
    rotation: page.rotation,
    version: 0,
  };
  storeClip(clip);
}

/** Draws a clip's picture again from its page as it is now. */
export async function redrawClip(
  clip: EditorClip,
  source: ClipSource
): Promise<void> {
  const annotations = onPage(source.annotations, clip.pageId);
  const picture = await drawClipPicture({
    annotations,
    box: clip.box,
    doc: source.doc,
    page: source.page,
  });
  await saveClipPicture(clip.id, picture.blob);
  changeStoredClip(clip.id, {
    aspect: picture.width / picture.height,
    pageNumber: source.position + 1,
    rotation: source.page.rotation,
    version: clip.version + 1,
  });
}
