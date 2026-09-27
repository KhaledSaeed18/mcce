import { BookmarkListItem } from "@/components/pdf-editor/bookmark-list-item";
import { EditorPanelNote } from "@/components/pdf-editor/editor-panel-note";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BOOKMARKS_EMPTY } from "@/config/pdf-editor";
import type { PageBookmarks } from "@/hooks/use-page-bookmarks";
import type { EditorPage, PageNavigation } from "@/lib/pdf-editor/types";

interface BookmarkListProps {
  bookmarks: PageBookmarks;
  navigation: PageNavigation;
  pages: EditorPage[];
}

export function BookmarkList({
  bookmarks,
  navigation,
  pages,
}: BookmarkListProps) {
  if (bookmarks.positions.length === 0) {
    return <EditorPanelNote>{BOOKMARKS_EMPTY}</EditorPanelNote>;
  }

  return (
    <ScrollArea className="min-h-0 flex-1">
      <ul className="flex flex-col gap-0.5 p-2">
        {bookmarks.positions.map((position) => (
          <BookmarkListItem
            isActive={position === navigation.activeIndex}
            key={pages[position].id}
            onGoToPage={navigation.goToPage}
            onRemove={bookmarks.toggle}
            pageId={pages[position].id}
            position={position}
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
