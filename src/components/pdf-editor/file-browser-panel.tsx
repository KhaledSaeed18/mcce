import { useMemo } from "react";
import { FileBrowserIndex } from "@/components/pdf-editor/file-browser-index";
import { LocalPdfList } from "@/components/pdf-editor/local-pdf-list";
import { OpenLocalPdfButton } from "@/components/pdf-editor/open-local-pdf-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FILE_PANEL_DEVICE_TAB,
  FILE_PANEL_INDEX_TAB,
} from "@/config/pdf-editor";
import { useFilePanelTab } from "@/hooks/use-file-panel-tab";
import type {
  EditorFile,
  EditorTreeNode,
  FilePanelTab,
  OpenFile,
} from "@/lib/pdf-editor/types";

const INDEX_TAB: FilePanelTab = "index";
const DEVICE_TAB: FilePanelTab = "device";

interface FileBrowserPanelProps {
  activeNode: EditorFile | null;
  nodes: EditorTreeNode[];
  onForget: (id: string) => void;
  openFiles: OpenFile[];
}

export function FileBrowserPanel({
  activeNode,
  nodes,
  onForget,
  openFiles,
}: FileBrowserPanelProps) {
  const openIds = useMemo(
    () => new Set(openFiles.map((file) => file.id)),
    [openFiles]
  );
  const { setTab, tab } = useFilePanelTab(
    activeNode ? activeNode.source : null
  );
  const isLocal = activeNode?.source === "local";

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r-2 bg-card">
      <Tabs className="min-h-0 flex-1 gap-0" onValueChange={setTab} value={tab}>
        <TabsList className="m-2 w-auto">
          <TabsTrigger value={INDEX_TAB}>{FILE_PANEL_INDEX_TAB}</TabsTrigger>
          <TabsTrigger value={DEVICE_TAB}>{FILE_PANEL_DEVICE_TAB}</TabsTrigger>
        </TabsList>
        <TabsContent
          className="flex min-h-0 flex-1 flex-col border-t-2"
          value={INDEX_TAB}
        >
          <FileBrowserIndex
            activeNode={activeNode}
            nodes={nodes}
            openIds={openIds}
          />
        </TabsContent>
        <TabsContent
          className="flex min-h-0 flex-1 flex-col border-t-2"
          value={DEVICE_TAB}
        >
          <LocalPdfList
            activeId={isLocal ? activeNode.id : null}
            onForget={onForget}
            openIds={openIds}
          />
          <OpenLocalPdfButton className="border-t-2 p-2" />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
