import { EditorPreviewPage } from "@/components/marketing/editor-preview-page";
import { EditorPreviewSidebar } from "@/components/marketing/editor-preview-sidebar";
import { EditorPreviewToolbar } from "@/components/marketing/editor-preview-toolbar";

/** A drawn stand-in for the editor, not the editor itself: nothing here loads a PDF. */
export function EditorPreview() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col overflow-hidden rounded border-2 bg-background shadow-sm"
    >
      <EditorPreviewToolbar />
      <div className="flex">
        <EditorPreviewSidebar />
        <div className="flex flex-1 bg-muted p-4 sm:p-6">
          <EditorPreviewPage />
        </div>
      </div>
    </div>
  );
}
