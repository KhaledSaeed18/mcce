import { EditorQuickOpen } from "@/components/pdf-editor/editor-quick-open";
import { EditorStudySetMenu } from "@/components/pdf-editor/editor-study-set-menu";
import { EditorTabStrip } from "@/components/pdf-editor/editor-tab-strip";
import type { EditorDeskControls } from "@/hooks/use-editor-desk";
import { suggestStudySetName } from "@/lib/pdf-editor/study-set-summary";
import type {
  EditorPaneSide,
  EditorTreeNode,
  OpenFile,
} from "@/lib/pdf-editor/types";

interface EditorFileBarTabsProps {
  desk: EditorDeskControls;
  match: EditorTreeNode | null;
  nodes: EditorTreeNode[];
  onOpenBeside: (file: OpenFile) => void;
  onOpenMatch: () => void;
  onSaveSet: (name: string) => void;
  sides: Partial<Record<string, EditorPaneSide>>;
}

/** The middle of the file bar: the tabs, then opening another file and the
 * study sets. */
export function EditorFileBarTabs({
  desk,
  match,
  nodes,
  onOpenBeside,
  onOpenMatch,
  onSaveSet,
  sides,
}: EditorFileBarTabsProps) {
  return (
    <EditorTabStrip
      activeId={desk.activeId}
      desk={desk.desk}
      match={match}
      nodes={nodes}
      onClose={desk.close}
      onMove={desk.move}
      onOpenBeside={onOpenBeside}
      onOpenMatch={onOpenMatch}
      onShow={desk.show}
      sides={sides}
    >
      <EditorQuickOpen
        activeId={desk.activeId}
        nodes={nodes}
        onShow={desk.show}
      />
      <EditorStudySetMenu
        canSave={desk.desk.files.length > 0}
        defaultName={suggestStudySetName(nodes, desk.activeId)}
        onSave={onSaveSet}
      />
    </EditorTabStrip>
  );
}
