import { createServerFn } from "@tanstack/react-start";
import type { DriveIndex } from "@/lib/drive/types";
import type { EditorFile } from "./types";

/** Resolves the file in the editor's URL, and only when it is an indexed PDF. */
export const getEditorFile = createServerFn({ method: "GET" })
  .inputValidator((data: { fileId: string }) => data)
  .handler(async ({ data }): Promise<EditorFile | null> => {
    const { nodes } = (await import("@/data/drive-index.json"))
      .default as DriveIndex;
    const node = nodes.find(
      (candidate) => candidate.id === data.fileId && candidate.kind === "pdf"
    );
    if (!node) {
      return null;
    }

    return {
      id: node.id,
      name: node.name,
      parentId: node.parentId,
      webViewLink: node.webViewLink,
    };
  });
