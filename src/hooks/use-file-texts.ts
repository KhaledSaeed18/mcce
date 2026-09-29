import { useEffect, useMemo, useState } from "react";
import { hasLoadedDocument } from "@/lib/pdf-editor/document-cache";
import {
  loadKnownText,
  readNewText,
} from "@/lib/pdf-editor/file-search/file-text";
import { findTextVersion } from "@/lib/pdf-editor/file-search/text-version";
import type {
  FileReadProgress,
  FileText,
} from "@/lib/pdf-editor/file-search/types";
import type { EditorTreeNode, OpenFile } from "@/lib/pdf-editor/types";

interface VersionedFile {
  file: OpenFile;
  version: string;
}

/** The text of every file to search, while search is open. Text kept from
 * before comes at once; loaded files are read next, then the rest are
 * fetched and read one at a time, each let go once read. */
export function useFileTexts(
  files: OpenFile[],
  nodes: EditorTreeNode[],
  isEnabled: boolean
) {
  const [texts, setTexts] = useState<ReadonlyMap<string, FileText>>(new Map());
  const [progress, setProgress] = useState<FileReadProgress | null>(null);
  const byId = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes]
  );
  const versioned = useMemo<VersionedFile[]>(
    () =>
      files.map((file) => ({
        file,
        version: findTextVersion(file, byId.get(file.id)),
      })),
    [byId, files]
  );

  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    let isCancelled = false;
    const found = new Map<string, FileText>();
    const keep = (id: string, text: FileText | null) => {
      if (text && !isCancelled) {
        found.set(id, text);
        setTexts(new Map(found));
      }
    };

    const run = async () => {
      const known = await Promise.all(
        versioned.map(({ file, version }) => loadKnownText(file, version))
      );
      for (const [index, text] of known.entries()) {
        keep(versioned[index].file.id, text);
      }
      const unread = versioned.filter(({ file }) => !found.has(file.id));
      // Files already loaded need no download, so they go first.
      unread.sort(
        (a, b) =>
          Number(hasLoadedDocument(b.file.id)) -
          Number(hasLoadedDocument(a.file.id))
      );
      for (const [index, { file, version }] of unread.entries()) {
        if (isCancelled) {
          return;
        }
        setProgress({ done: index, total: unread.length });
        // biome-ignore lint/performance/noAwaitInLoops: files are read one at a time so only one extra file is ever loaded
        keep(file.id, await readNewText(file, version).catch(() => null));
      }
      if (!isCancelled) {
        setProgress(null);
      }
    };
    setProgress(null);
    run().catch(() => setProgress(null));
    return () => {
      isCancelled = true;
    };
  }, [isEnabled, versioned]);

  return { progress: isEnabled ? progress : null, texts };
}
