import { LOCAL_FILE_TEXT_VERSION } from "@/config/pdf-editor";
import type { EditorTreeNode, OpenFile } from "../types";

/** Which copy of a file its text belongs to: the index's modified time, or
 * for a local file, which is named by its content, one that never changes. */
export function findTextVersion(
  file: OpenFile,
  node: EditorTreeNode | undefined
): string {
  return file.source === "local"
    ? LOCAL_FILE_TEXT_VERSION
    : (node?.modifiedTime ?? "");
}
