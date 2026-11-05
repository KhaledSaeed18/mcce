import type { RefObject } from "react";
import { useEffect } from "react";
import { TextToolbar } from "@/components/pdf-editor/text-toolbar";
import type { EditorMarkup } from "@/hooks/use-editor-markup";
import type { EditorTool } from "@/lib/pdf-editor/types";

interface TextToolbarLayerProps {
  markup: EditorMarkup;
  scrollRef: RefObject<HTMLElement | null>;
  tool: EditorTool;
}

/** Shows the text toolbar while a pane has text in hand, and lets go of selected
 * text once the reader picks up a tool that has nothing to do with it. */
export function TextToolbarLayer({
  markup,
  scrollRef,
  tool,
}: TextToolbarLayerProps) {
  const { activeText, actions, deselect, draft, editSelected, removeActive } =
    markup;
  const isTextTool = tool === "select" || tool === "text";
  const isSelected = activeText !== null && draft === null;

  useEffect(() => {
    if (isSelected && !isTextTool) {
      deselect();
    }
  }, [deselect, isSelected, isTextTool]);

  if (!activeText) {
    return null;
  }
  return (
    <TextToolbar
      isEditing={draft !== null}
      onDuplicate={actions.duplicateText}
      onEdit={editSelected}
      onRemove={removeActive}
      onRestyle={actions.restyleText}
      scrollRef={scrollRef}
      style={activeText}
    />
  );
}
