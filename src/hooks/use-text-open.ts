import { type PointerEvent, useCallback } from "react";
import { buildDraft, toDraft } from "@/lib/pdf-editor/build-draft";
import { findTextAt } from "@/lib/pdf-editor/move";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type {
  Annotation,
  PageSize,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface TextOpenOptions {
  annotations: Annotation[];
  onDraft: (draft: TextDraft) => void;
  pageId: string;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/** The two ways a field opens: on bare page, or on text already written there. */
export function useTextOpen({
  annotations,
  onDraft,
  pageId,
  settings,
  size,
  zoom,
}: TextOpenOptions) {
  const openAt = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) =>
      onDraft(buildDraft(toPagePoint(event, zoom, size), pageId, settings)),
    [onDraft, pageId, settings, size, zoom]
  );

  const openOn = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const target = findTextAt(
        annotations,
        pageId,
        toPagePoint(event, zoom, size)
      );
      if (target) {
        onDraft(toDraft(target));
      }
    },
    [annotations, onDraft, pageId, size, zoom]
  );

  return { openAt, openOn };
}
