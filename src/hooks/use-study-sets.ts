import { useSyncExternalStore } from "react";
import {
  readServerStudySets,
  readStudySets,
  subscribeStudySets,
} from "@/lib/pdf-editor/study-sets";
import type { StudySet } from "@/lib/pdf-editor/types";

/** The study sets saved in this browser, newest first, kept up to date as
 * any part of the editor changes them. */
export function useStudySets(): StudySet[] {
  return useSyncExternalStore(
    subscribeStudySets,
    readStudySets,
    readServerStudySets
  );
}
