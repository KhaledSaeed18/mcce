import { EditorPanelNote } from "@/components/pdf-editor/editor-panel-note";
import { LocalPdfListItem } from "@/components/pdf-editor/local-pdf-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LOCAL_PDF_LIST_EMPTY } from "@/config/pdf-editor";
import { useLocalPdfList } from "@/hooks/use-local-pdf-list";

interface LocalPdfListProps {
  activeId: string | null;
  /** Told once a file has left this device, so its tab can close. */
  onForget: (id: string) => void;
  openIds: ReadonlySet<string>;
}

export function LocalPdfList({
  activeId,
  onForget,
  openIds,
}: LocalPdfListProps) {
  const { files, remove } = useLocalPdfList(activeId, onForget);

  return (
    <ScrollArea className="min-h-0 flex-1">
      {files.length === 0 ? (
        <EditorPanelNote>{LOCAL_PDF_LIST_EMPTY}</EditorPanelNote>
      ) : (
        <ul className="flex flex-col gap-0.5 p-2">
          {files.map((file) => (
            <LocalPdfListItem
              file={file}
              isActive={file.id === activeId}
              isOpen={openIds.has(file.id)}
              key={file.id}
              onRemove={remove}
            />
          ))}
        </ul>
      )}
    </ScrollArea>
  );
}
