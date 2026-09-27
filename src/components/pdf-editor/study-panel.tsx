import type { PDFDocumentProxy } from "pdfjs-dist";
import { BookmarkList } from "@/components/pdf-editor/bookmark-list";
import { OutlineList } from "@/components/pdf-editor/outline-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STUDY_PANEL_TAB_LABELS } from "@/config/pdf-editor";
import type { PageBookmarks } from "@/hooks/use-page-bookmarks";
import type {
  EditorPage,
  PageNavigation,
  StudyPanelTab,
} from "@/lib/pdf-editor/types";

const TABS: readonly StudyPanelTab[] = ["contents", "bookmarks"];

const TAB_CONTENT_CLASS = "flex min-h-0 flex-1 flex-col border-t-2";

interface StudyPanelProps {
  bookmarks: PageBookmarks;
  doc: PDFDocumentProxy;
  navigation: PageNavigation;
  pages: EditorPage[];
}

/** The panel right of the pages: ways to find a place in the file. */
export function StudyPanel({
  bookmarks,
  doc,
  navigation,
  pages,
}: StudyPanelProps) {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-l-2 bg-card">
      <Tabs className="min-h-0 flex-1 gap-0" defaultValue={TABS[0]}>
        <TabsList className="m-2 w-auto">
          {TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {STUDY_PANEL_TAB_LABELS[tab]}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent className={TAB_CONTENT_CLASS} value="contents">
          <OutlineList
            doc={doc}
            onGoToPage={navigation.goToPage}
            pages={pages}
          />
        </TabsContent>
        <TabsContent className={TAB_CONTENT_CLASS} value="bookmarks">
          <BookmarkList
            bookmarks={bookmarks}
            navigation={navigation}
            pages={pages}
          />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
