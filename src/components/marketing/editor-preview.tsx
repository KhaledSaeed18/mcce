import { EditorPreviewPage } from "@/components/marketing/editor-preview-page";
import { EditorPreviewSidebar } from "@/components/marketing/editor-preview-sidebar";
import { EditorPreviewToolbar } from "@/components/marketing/editor-preview-toolbar";

/** A drawn stand-in for the editor, not the editor itself: nothing here loads a PDF. */
export function EditorPreview() {
  return (
    <div
      aria-hidden="true"
      className="bg-background flex flex-col overflow-hidden rounded border-2 shadow-sm"
    >
      <EditorPreviewToolbar />
      <div className="flex">
        <EditorPreviewSidebar />
        <div className="bg-muted flex flex-1 p-4 sm:p-6">
          <EditorPreviewPage />
        </div>
      </div>
    </div>
  );
}
