import { LocalPdfListItem } from "@/components/pdf-editor/local-pdf-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LOCAL_PDF_LIST_EMPTY } from "@/config/pdf-editor";
import { useLocalPdfList } from "@/hooks/use-local-pdf-list";

interface LocalPdfListProps {
  activeId: string | null;
}

export function LocalPdfList({ activeId }: LocalPdfListProps) {
  const { files, remove } = useLocalPdfList(activeId);

  return (
    <ScrollArea className="min-h-0 flex-1">
      {files.length === 0 ? (
        <p className="p-4 text-muted-foreground text-sm">
          {LOCAL_PDF_LIST_EMPTY}
        </p>
      ) : (
        <ul className="flex flex-col gap-0.5 p-2">
          {files.map((file) => (
            <LocalPdfListItem
              file={file}
              isActive={file.id === activeId}
              key={file.id}
              onRemove={remove}
            />
          ))}
        </ul>
      )}
    </ScrollArea>
  );
}
