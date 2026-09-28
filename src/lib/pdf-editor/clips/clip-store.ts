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
import { parseClipDesk } from "./clip-desk-parse";
import { removeClipPictures } from "./clip-picture-store";
import type { ClipDesk, EditorClip } from "./types";

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

export function changeStoredClip(id: string, change: Partial<EditorClip>) {
  write(changeClip(readClipDesk(), id, change));
}

export function setClipsHidden(isHidden: boolean): void {
  write({ ...readClipDesk(), isHidden });
}
