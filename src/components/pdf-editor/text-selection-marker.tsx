import { type RefObject, useCallback, useMemo } from "react";
import { TextSelectionMenu } from "@/components/pdf-editor/text-selection-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useSelectionClip } from "@/hooks/use-selection-clip";
import { useTextMarking } from "@/hooks/use-text-marking";
import { useTextSelection } from "@/hooks/use-text-selection";
import type {
  Annotation,
  Box,
  EditorPage,
  PageSize,
  TextMarkStyle,
} from "@/lib/pdf-editor/types";

interface TextSelectionMarkerProps {
  /** Highlights take the highlighter's shade; lines take the pen's color. */
  highlightColor: string;
  isEnabled: boolean;
  onAddMany: (annotations: Annotation[]) => void;
  onClip: (pageId: string, box: Box) => void;
  pages: EditorPage[];
  penColor: string;
  scrollRef: RefObject<HTMLElement | null>;
  sizes: PageSize[];
  zoom: number;
}

/** Offers to mark or copy whatever text the select tool has picked. */
export function TextSelectionMarker({
  highlightColor,
  isEnabled,
  onAddMany,
  onClip,
  pages,
  penColor,
  scrollRef,
  sizes,
  zoom,
}: TextSelectionMarkerProps) {
  const selection = useTextSelection(scrollRef, isEnabled);
  const colors = useMemo<Record<TextMarkStyle, string>>(
    () => ({
      highlight: highlightColor,
      strike: penColor,
      underline: penColor,
    }),
    [highlightColor, penColor]
  );
  const mark = useTextMarking({
    colors,
    onAddMany,
    pages,
    scrollRef,
    sizes,
    zoom,
  });
  const clip = useSelectionClip({ onClip, pages, scrollRef, sizes, zoom });
  const { copy, isCopied } = useCopyToClipboard();

  const handleMark = useCallback(
    (style: TextMarkStyle) => {
      if (selection) {
        mark(style, selection.range);
      }
    },
    [mark, selection]
  );

  const handleClip = useCallback(() => {
    if (selection) {
      clip(selection.range);
    }
  }, [clip, selection]);

  const handleCopy = useCallback(() => {
    if (selection) {
      copy(selection.text);
    }
  }, [copy, selection]);

  if (!selection) {
    return null;
  }

  return (
    <TextSelectionMenu
      isCopied={isCopied}
      onClip={handleClip}
      onCopy={handleCopy}
      onMark={handleMark}
      rect={selection.rect}
    />
  );
}
