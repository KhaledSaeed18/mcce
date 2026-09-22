import { EditorIdleSection } from "@/components/pdf-editor/editor-idle-section";
import { EditorRecentFile } from "@/components/pdf-editor/editor-recent-file";
import { EDITOR_RECENT_TITLE } from "@/config/pdf-editor";
import type { DriveNode } from "@/lib/drive/types";

interface EditorRecentFilesProps {
  nodes: DriveNode[];
}

export function EditorRecentFiles({ nodes }: EditorRecentFilesProps) {
  return (
    <EditorIdleSection title={EDITOR_RECENT_TITLE}>
      <ul className="grid grid-cols-2 gap-2">
        {nodes.map((node) => (
          <li className="min-w-0" key={node.id}>
            <EditorRecentFile node={node} />
          </li>
        ))}
      </ul>
    </EditorIdleSection>
  );
}
