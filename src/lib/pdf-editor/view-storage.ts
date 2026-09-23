import { PDF_VIEW_KEY_PREFIX } from "@/config/pdf-editor";
import { readJson, removeStored, writeJson } from "@/lib/storage";
import { resolveSavedView } from "./saved-view";
import type { SavedView } from "./types";

function buildViewKey(fileId: string): string {
  return `${PDF_VIEW_KEY_PREFIX}.${fileId}`;
}

export function readView(fileId: string, pageCount: number): SavedView | null {
  return resolveSavedView(
    readJson<unknown>(buildViewKey(fileId), null),
    pageCount
  );
}

export function writeView(fileId: string, view: SavedView): void {
  writeJson(buildViewKey(fileId), view);
}

export function removeView(fileId: string): void {
  removeStored(buildViewKey(fileId));
}
