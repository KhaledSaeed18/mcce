import { createServerFn } from "@tanstack/react-start";
import type { DriveIndex } from "@/lib/drive/types";
import type { EditorTreeNode } from "./types";

/**
 * The editor walks the whole tree, but only by id, name, kind, and parent,
 * labels files by their material type and course, and tells kept text of a
 * file from an older copy by its modified time. Trimming every node to
 * those fields server-side keeps the editor from hydrating the full drive
 * index with each page load.
 */
export const getEditorTree = createServerFn({ method: "GET" }).handler(
  async (): Promise<EditorTreeNode[]> => {
    const { nodes } = (await import("@/data/drive-index.json"))
      .default as DriveIndex;

    return nodes.map(
      ({
        courseCode,
        id,
        kind,
        materialType,
        modifiedTime,
        name,
        parentId,
      }) => ({
        courseCode,
        id,
        kind,
        materialType,
        modifiedTime,
        name,
        parentId,
      })
    );
  }
);
