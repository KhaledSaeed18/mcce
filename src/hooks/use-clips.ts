import { useSyncExternalStore } from "react";
import {
  readClipDesk,
  readServerClipDesk,
  subscribeClips,
} from "@/lib/pdf-editor/clips/clip-store";
import type { ClipDesk } from "@/lib/pdf-editor/clips/types";

/** The clips kept in this browser, kept up to date as any part of the
 * editor changes them. */
export function useClips(): ClipDesk {
  return useSyncExternalStore(subscribeClips, readClipDesk, readServerClipDesk);
}
