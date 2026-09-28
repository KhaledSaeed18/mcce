import { EditorSidePanel } from "@/components/pdf-editor/editor-side-panel";
import { StudyPanel } from "@/components/pdf-editor/study-panel";
import { DEFAULT_EXPORT_NAME } from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";

interface EditorStudySideProps {
  isAnimated: boolean;
  isOpen: boolean;
  /** The pane with focus, whose contents, bookmarks, and notes are listed. */
  pane: EditorPaneView;
}

/** The contents and notes panel right of the pages, for the file in hand. */
export function EditorStudySide({
  isAnimated,
  isOpen,
  pane,
}: EditorStudySideProps) {
  const { node, session } = pane;

  return (
    <EditorSidePanel
      isAnimated={isAnimated}
      isOpen={isOpen && session.doc !== null}
    >
      {session.doc ? (
        <StudyPanel
          annotations={session.markup.annotations}
          bookmarks={session.bookmarks}
          doc={session.doc}
          fileName={node ? node.name : DEFAULT_EXPORT_NAME}
          navigation={session.navigation}
          onSelect={session.markup.actions.select}
          pages={session.markup.pages}
        />
      ) : null}
    </EditorSidePanel>
  );
}
