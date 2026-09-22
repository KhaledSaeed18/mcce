import { createServerFn } from "@tanstack/react-start";
import type { DriveIndex } from "@/lib/drive/types";
import type { EditorTreeNode } from "./types";

/**
 * The file sidebar walks the whole tree, but only by id, name, kind, and
 * parent. Trimming every node to those four fields server-side keeps the
 * editor from hydrating the full drive index with each page load.
 */
export const getEditorTree = createServerFn({ method: "GET" }).handler(
  async (): Promise<EditorTreeNode[]> => {
    const { nodes } = (await import("@/data/drive-index.json"))
      .default as DriveIndex;

    return nodes.map(({ id, kind, name, parentId }) => ({
      id,
      kind,
      name,
      parentId,
    }));
  }
);
