import { createHistory, EMPTY_HISTORY } from "./history";
import type { EditorHistory, EditorSnapshot } from "./types";

/** Each file's undo steps, kept for as long as the page is open so moving to
 * another file and back does not lose them. Only the snapshot on screen is
 * written to storage; the steps around it end with the visit. */
const histories = new Map<string, EditorHistory>();
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeHistory(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The same object until the file's history changes, as React's external
 * store reads require. A file not opened yet reads as empty. */
export function readHistory(fileId: string | undefined): EditorHistory {
  return (fileId ? histories.get(fileId) : undefined) ?? EMPTY_HISTORY;
}

/** Starts a file's history from what storage holds for it. */
export function openHistory(fileId: string, snapshot: EditorSnapshot): void {
  histories.set(fileId, createHistory(snapshot));
  notify();
}

/** A file not opened yet is left alone: a history started on it would stop
 * its stored markup being read, and the next write would replace it. */
export function updateHistory(
  fileId: string,
  step: (history: EditorHistory) => EditorHistory
): void {
  const current = histories.get(fileId);
  if (!current) {
    return;
  }
  const next = step(current);
  if (next === current) {
    return;
  }
  histories.set(fileId, next);
  notify();
}

export function forgetHistory(fileId: string): void {
  if (histories.delete(fileId)) {
    notify();
  }
}
