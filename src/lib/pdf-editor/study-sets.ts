import { STUDY_SETS_STORAGE_KEY } from "@/config/pdf-editor";
import { readJson, writeJson } from "@/lib/storage";
import { dropClipPictures } from "./clips/copy-clips";
import { parseStudySets } from "./study-set-parse";
import type { StudySet } from "./types";

const NO_SETS: StudySet[] = [];
const listeners = new Set<() => void>();
let cache: StudySet[] | null = null;

function write(next: StudySet[]): void {
  cache = next;
  writeJson(STUDY_SETS_STORAGE_KEY, next);
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeStudySets(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Read from storage once, then kept, so every read hands back the same
 * list until it changes, as React's external store reads require. */
export function readStudySets(): StudySet[] {
  cache ??= parseStudySets(readJson<unknown>(STUDY_SETS_STORAGE_KEY, null));
  return cache;
}

export function readServerStudySets(): StudySet[] {
  return NO_SETS;
}

/** Newest first. */
export function addStudySet(set: StudySet): void {
  write([set, ...readStudySets()]);
}

export function renameStudySet(id: string, name: string): void {
  write(readStudySets().map((set) => (set.id === id ? { ...set, name } : set)));
}

export function removeStudySet(id: string): void {
  const sets = readStudySets();
  dropClipPictures(sets.find((set) => set.id === id)?.clips ?? []);
  write(sets.filter((set) => set.id !== id));
}

/** For a file taken off this device: it leaves every set with its clips,
 * and a set left with nothing in it goes too. */
export function forgetFileInStudySets(fileId: string): void {
  const next = readStudySets().flatMap((set) => {
    const files = set.files.filter((file) => file.id !== fileId);
    const isGone = files.length === 0;
    dropClipPictures(
      set.clips.filter((clip) => isGone || clip.file.id === fileId)
    );
    if (isGone) {
      return [];
    }
    return [
      {
        ...set,
        besideId: set.besideId === fileId ? null : set.besideId,
        clips: set.clips.filter((clip) => clip.file.id !== fileId),
        files,
        lockGap: set.besideId === fileId ? null : set.lockGap,
        primaryId: set.primaryId === fileId ? files[0].id : set.primaryId,
      },
    ];
  });
  write(next);
}
