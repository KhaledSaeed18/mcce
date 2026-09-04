import { FileBrowserCrumbs } from "@/components/pdf-editor/file-browser-crumbs";
import { FileBrowserEntry } from "@/components/pdf-editor/file-browser-entry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorFileBrowser } from "@/hooks/use-editor-file-browser";
import type { DriveNode } from "@/lib/drive/types";

interface FileBrowserPanelProps {
  activeNode: DriveNode | null;
  nodes: DriveNode[];
}

export function FileBrowserPanel({ activeNode, nodes }: FileBrowserPanelProps) {
  const { crumbs, entries, openFolder } = useEditorFileBrowser(
    nodes,
    activeNode
  );

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r-2 bg-card">
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
    </aside>
  );
}
