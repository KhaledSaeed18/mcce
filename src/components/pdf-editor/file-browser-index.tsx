import { FileBrowserCrumbs } from "@/components/pdf-editor/file-browser-crumbs";
import { FileBrowserEntry } from "@/components/pdf-editor/file-browser-entry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorFileBrowser } from "@/hooks/use-editor-file-browser";
import type { EditorFile, EditorTreeNode } from "@/lib/pdf-editor/types";

interface FileBrowserIndexProps {
  activeNode: EditorFile | null;
  nodes: EditorTreeNode[];
}

/** The index's folders and files, walked one folder at a time. */
export function FileBrowserIndex({ activeNode, nodes }: FileBrowserIndexProps) {
  const { crumbs, entries, openFolder } = useEditorFileBrowser(
    nodes,
    activeNode
  );

  return (
    <>
      <FileBrowserCrumbs crumbs={crumbs} onSelect={openFolder} />
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-0.5 p-2">
          {entries.length === 0 ? (
            <p className="p-2 text-muted-foreground text-sm">Empty folder.</p>
          ) : (
            entries.map((entry) => (
              <FileBrowserEntry
                entry={entry}
                isActive={entry.id === activeNode?.id}
                key={entry.id}
                onOpenFolder={openFolder}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </>
  );
}
