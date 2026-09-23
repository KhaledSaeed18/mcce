import { createServerFn } from "@tanstack/react-start";
import type { DriveIndex } from "@/lib/drive/types";
import type { DriveEditorFile } from "./types";

/** Resolves the file in the editor's URL, and only when it is an indexed PDF. */
export const getEditorFile = createServerFn({ method: "GET" })
  .validator((data: { fileId: string }) => data)
  .handler(async ({ data }): Promise<DriveEditorFile | null> => {
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
      source: "drive",
      webViewLink: node.webViewLink,
    };
  });
