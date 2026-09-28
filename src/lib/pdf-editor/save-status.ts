import type { SaveStatus } from "./types";

/** Whether the file's markup made it into storage, once there is a file. */
export function findSaveStatus(
  hasFile: boolean,
  isSaved: boolean
): SaveStatus | null {
  if (!hasFile) {
    return null;
  }
  return isSaved ? "saved" : "failed";
}
