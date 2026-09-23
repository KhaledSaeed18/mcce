import { type RefObject, useCallback, useMemo } from "react";
import { TextSelectionMenu } from "@/components/pdf-editor/text-selection-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useTextMarking } from "@/hooks/use-text-marking";
import { useTextSelection } from "@/hooks/use-text-selection";
import type {
  Annotation,
  EditorPage,
  PageSize,
  TextMarkStyle,
} from "@/lib/pdf-editor/types";

interface TextSelectionMarkerProps {
  /** Highlights take the highlighter's shade; lines take the pen's color. */
  highlightColor: string;
  isEnabled: boolean;
  onAddMany: (annotations: Annotation[]) => void;
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
  const { copy, isCopied } = useCopyToClipboard();

  const handleMark = useCallback(
    (style: TextMarkStyle) => {
      if (selection) {
        mark(style, selection.range);
      }
    },
    [mark, selection]
  );

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
      onCopy={handleCopy}
      onMark={handleMark}
      rect={selection.rect}
    />
  );
}
