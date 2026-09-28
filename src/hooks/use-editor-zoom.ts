import type { RefObject } from "react";
import { useDocumentScroller } from "@/hooks/use-document-scroller";
import { useElementSize } from "@/hooks/use-element-size";
import { usePdfZoom } from "@/hooks/use-pdf-zoom";
import { useViewResume } from "@/hooks/use-view-resume";
import type { PageNavigation, PageSize } from "@/lib/pdf-editor/types";

interface EditorZoomOptions {
  /** The page being read, which a fitted zoom is fitted to. */
  activeSize: PageSize | null;
  fileId: string | undefined;
  navigation: PageNavigation;
  scrollRef: RefObject<HTMLDivElement | null>;
}

/** How the file sits in its scroller: the zoom, the spot kept in view as it
 * changes, and the page and zoom the file reopens at. */
export function useEditorZoom({
  activeSize,
  fileId,
  navigation,
  scrollRef,
}: EditorZoomOptions) {
  const viewport = useElementSize(scrollRef);
  const zoom = usePdfZoom({ pageSize: activeSize, viewport });
  useDocumentScroller(scrollRef, fileId, zoom);
  useViewResume(fileId, navigation, zoom);
  return zoom;
}
