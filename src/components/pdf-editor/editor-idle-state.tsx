import { PanelLeftIcon } from "lucide-react";
import { EditorIdleSheet } from "@/components/pdf-editor/editor-idle-sheet";
import { EditorRecentFiles } from "@/components/pdf-editor/editor-recent-files";
import { EditorShortcutList } from "@/components/pdf-editor/editor-shortcut-list";
import { Button } from "@/components/ui/button";
import { EDITOR_IDLE_SHOW_FILES } from "@/config/pdf-editor";
import { useEditorRecentFiles } from "@/hooks/use-editor-recent-files";
import type { DriveNode } from "@/lib/drive/types";

interface EditorIdleStateProps {
  isBrowserOpen: boolean;
  nodes: DriveNode[];
  onShowFiles: () => void;
}

export function EditorIdleState({
  isBrowserOpen,
  nodes,
  onShowFiles,
}: EditorIdleStateProps) {
  const recentFiles = useEditorRecentFiles(nodes);

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-10 px-8 py-12">
      <EditorIdleSheet isBrowserOpen={isBrowserOpen} />

      {isBrowserOpen ? null : (
        <Button onClick={onShowFiles}>
          <PanelLeftIcon data-icon="inline-start" />
          {EDITOR_IDLE_SHOW_FILES}
        </Button>
      )}

      <div className="flex w-full max-w-xl flex-col gap-6">
        {recentFiles.length > 0 ? (
          <EditorRecentFiles nodes={recentFiles} />
        ) : null}
        <EditorShortcutList />
      </div>
    </div>
  );
}
