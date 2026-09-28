import { ExamTimeUpDialog } from "@/components/pdf-editor/exam-time-up-dialog";
import type { EditorPaneView } from "@/hooks/use-editor-panes";

interface EditorExamDialogsProps {
  panes: EditorPaneView[];
}

/** One time-up dialog per pane, since an exam can run in either file and
 * end while the other has focus. */
export function EditorExamDialogs({ panes }: EditorExamDialogsProps) {
  return panes.map((pane) => (
    <ExamTimeUpDialog
      isOpen={pane.session.exam.isOver}
      key={pane.side}
      onClose={pane.session.exam.end}
      onDownload={pane.session.exportPdf}
    />
  ));
}
