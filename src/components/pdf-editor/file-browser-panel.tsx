import { FileBrowserIndex } from "@/components/pdf-editor/file-browser-index";
import { OpenLocalPdfButton } from "@/components/pdf-editor/open-local-pdf-button";
import type { EditorFile, EditorTreeNode } from "@/lib/pdf-editor/types";

interface FileBrowserPanelProps {
  activeNode: EditorFile | null;
  nodes: EditorTreeNode[];
}

export function FileBrowserPanel({ activeNode, nodes }: FileBrowserPanelProps) {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r-2 bg-card">
      <OpenLocalPdfButton className="border-b-2 p-2" />
      <FileBrowserIndex activeNode={activeNode} nodes={nodes} />
    </aside>
  );
}
