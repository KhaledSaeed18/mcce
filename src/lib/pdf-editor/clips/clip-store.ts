import { CLIPS_STORAGE_KEY } from "@/config/pdf-editor";
import { readJson, writeJson } from "@/lib/storage";
import {
  addClip,
  type ClipDeskChange,
  changeClip,
  closeClip,
  EMPTY_CLIP_DESK,
  reopenClip,
} from "./clip-desk";
import { forgetFileClips } from "./clip-desk-forget";
import { parseClipDesk } from "./clip-desk-parse";
import { replaceClips } from "./clip-desk-replace";
import { removeClipPictures } from "./clip-picture-store";
import { copyClips } from "./copy-clips";
import { drawSharedClips } from "./draw-shared-clips";
import type { ClipDesk, EditorClip, SharedClip } from "./types";

const listeners = new Set<() => void>();
let cache: ClipDesk | null = null;

function write(next: ClipDesk): void {
  cache = next;
  writeJson(CLIPS_STORAGE_KEY, next);
  for (const listener of listeners) {
    listener();
  }
}

function apply({ desk, dropped }: ClipDeskChange): void {
  write(desk);
  if (dropped.length > 0) {
    removeClipPictures(dropped).catch(() => undefined);
  }
}

export function subscribeClips(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Read from storage once, then kept, as React's external store reads need. */
export function readClipDesk(): ClipDesk {
  cache ??= parseClipDesk(readJson<unknown>(CLIPS_STORAGE_KEY, null));
  return cache;
}

export function readServerClipDesk(): ClipDesk {
  return EMPTY_CLIP_DESK;
}

export const storeClip = (clip: EditorClip) =>
  apply(addClip(readClipDesk(), clip));
export const closeStoredClip = (id: string) =>
  apply(closeClip(readClipDesk(), id));
export const reopenStoredClip = (id: string) =>
  apply(reopenClip(readClipDesk(), id));

/** Shows a saved set's clips, as copies with pictures of their own, in
 * place of the clips on screen. */
export async function openSetClips(clips: readonly EditorClip[]) {
  const copies = await copyClips(clips);
  apply(replaceClips(readClipDesk(), copies));
}

/** Draws a shared link's clips from their files and shows them in place of
 * the clips on screen. */
export async function openSharedClips(shared: readonly SharedClip[]) {
  const clips = await drawSharedClips(shared);
  if (clips.length > 0) {
    apply(replaceClips(readClipDesk(), clips));
  }
}

export const forgetStoredFileClips = (fileId: string) =>
  apply(forgetFileClips(readClipDesk(), fileId));

export function changeStoredClip(id: string, change: Partial<EditorClip>) {
  write(changeClip(readClipDesk(), id, change));
}

export function setClipsHidden(isHidden: boolean): void {
  write({ ...readClipDesk(), isHidden });
}
