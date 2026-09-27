import { useCoverReveal } from "@/hooks/use-cover-reveal";
import { usePageBookmarks } from "@/hooks/use-page-bookmarks";
import type { Annotation, EditorPage } from "@/lib/pdf-editor/types";

interface EditorStudyOptions {
  activeIndex: number;
  annotations: Annotation[];
  fileId: string | undefined;
  pages: EditorPage[];
}

/** What the editor keeps for studying a file rather than marking it up: the
 * answers the reader has looked under and the pages they bookmarked. */
export function useEditorStudy({
  activeIndex,
  annotations,
  fileId,
  pages,
}: EditorStudyOptions) {
  const covers = useCoverReveal(fileId, annotations);
  const bookmarks = usePageBookmarks(fileId, pages, activeIndex);

  return { bookmarks, covers };
}
