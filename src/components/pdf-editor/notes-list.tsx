import { DownloadIcon, LoaderIcon } from "lucide-react";
import { useCallback } from "react";
import { EditorPanelNote } from "@/components/pdf-editor/editor-panel-note";
import { NotesListItem } from "@/components/pdf-editor/notes-list-item";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  NOTES_EMPTY,
  SUMMARY_DOWNLOAD_HINT,
  SUMMARY_DOWNLOAD_LABEL,
  SUMMARY_ERROR,
} from "@/config/pdf-editor";
import { useNotesList } from "@/hooks/use-notes-list";
import type {
  Annotation,
  EditorPage,
  PageNavigation,
  StudyItem,
} from "@/lib/pdf-editor/types";

interface NotesListProps {
  annotations: Annotation[];
  fileName: string;
  navigation: PageNavigation;
  onSelect: (id: string | null) => void;
  pages: EditorPage[];
}

/** Every note and highlight in the file by page, each one a way back to it. */
export function NotesList({
  annotations,
  fileName,
  navigation,
  onSelect,
  pages,
}: NotesListProps) {
  const { groups, summary } = useNotesList(annotations, pages, fileName);
  const { goToPage } = navigation;
  const handleOpen = useCallback(
    (item: StudyItem) => {
      goToPage(item.position);
      onSelect(item.annotation.id);
    },
    [goToPage, onSelect]
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {groups.length === 0 ? (
        <EditorPanelNote>{NOTES_EMPTY}</EditorPanelNote>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          {groups.map(({ items, position }) => (
            <section className="p-2" key={position}>
              <h3 className="px-2 pb-1 font-head text-muted-foreground text-xs">
                Page {position + 1}
              </h3>
              <ul className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <NotesListItem
                    item={item}
                    key={item.annotation.id}
                    onOpen={handleOpen}
                  />
                ))}
              </ul>
            </section>
          ))}
        </ScrollArea>
      )}
      <div className="flex flex-col gap-2 border-t-2 p-2">
        {summary.status === "error" ? (
          <p className="font-head text-destructive text-sm" role="alert">
            {SUMMARY_ERROR}
          </p>
        ) : null}
        <Button
          disabled={groups.length === 0 || summary.status === "working"}
          onClick={summary.download}
          size="sm"
          title={SUMMARY_DOWNLOAD_HINT}
          variant="outline"
        >
          {summary.status === "working" ? (
            <LoaderIcon className="animate-spin" data-icon="inline-start" />
          ) : (
            <DownloadIcon data-icon="inline-start" />
          )}
          {SUMMARY_DOWNLOAD_LABEL}
        </Button>
      </div>
    </div>
  );
}
