import type { PDFDocumentProxy } from "pdfjs-dist";
import { EditorPanelNote } from "@/components/pdf-editor/editor-panel-note";
import { OutlineListItem } from "@/components/pdf-editor/outline-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OUTLINE_EMPTY, OUTLINE_LOADING } from "@/config/pdf-editor";
import { usePdfOutline } from "@/hooks/use-pdf-outline";
import { findSourcePosition } from "@/lib/pdf-editor/source-position";
import type { EditorPage } from "@/lib/pdf-editor/types";

interface OutlineListProps {
  doc: PDFDocumentProxy;
  onGoToPage: (position: number) => void;
  pages: EditorPage[];
}

/** The file's own table of contents, pointed at the pages where they sit now. */
export function OutlineList({ doc, onGoToPage, pages }: OutlineListProps) {
  const { entries, isLoading } = usePdfOutline(doc);

  if (isLoading) {
    return <EditorPanelNote>{OUTLINE_LOADING}</EditorPanelNote>;
  }
  if (entries.length === 0) {
    return <EditorPanelNote>{OUTLINE_EMPTY}</EditorPanelNote>;
  }

  return (
    <ScrollArea className="min-h-0 flex-1">
      <ul className="flex flex-col gap-0.5 p-2">
        {entries.map((entry) => (
          <OutlineListItem
            entry={entry}
            key={entry.id}
            onGoToPage={onGoToPage}
            position={
              entry.sourceIndex === null
                ? -1
                : findSourcePosition(pages, entry.sourceIndex)
            }
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
