import type { RefObject } from "react";
import { useEffect } from "react";
import { MarkupToolbar } from "@/components/pdf-editor/markup-toolbar";
import { TextToolbar } from "@/components/pdf-editor/text-toolbar";
import type { EditorMarkup } from "@/hooks/use-editor-markup";
import type { Annotation, EditorTool } from "@/lib/pdf-editor/types";

interface MarkupToolbarLayerProps {
  markup: EditorMarkup;
  scrollRef: RefObject<HTMLElement | null>;
  tool: EditorTool;
}

/** Whether a tool has anything to do with what is selected. The select tool
 * handles all of it, and the text and note tools their own. */
function canHold(tool: EditorTool, selected: Annotation): boolean {
  return (
    tool === "select" ||
    (tool === "text" && selected.type === "text") ||
    (tool === "note" && selected.type === "note")
  );
}

/** Shows the floating toolbar for what a pane has in hand, and lets go of a
 * selection once the reader picks up a tool that has nothing to do with it. */
export function MarkupToolbarLayer({
  markup,
  scrollRef,
  tool,
}: MarkupToolbarLayerProps) {
  const {
    actions,
    activeText,
    deselect,
    draft,
    editSelected,
    removeActive,
    selected,
  } = markup;
  const isStale = selected !== null && !canHold(tool, selected);

  useEffect(() => {
    if (isStale) {
      deselect();
    }
  }, [deselect, isStale]);

  if (activeText) {
    return (
      <TextToolbar
        isEditing={draft !== null}
        onDuplicate={actions.duplicateSelected}
        onEdit={editSelected}
        onRemove={removeActive}
        onRestyle={actions.restyleText}
        scrollRef={scrollRef}
        style={activeText}
      />
    );
  }
  if (!selected || selected.type === "note") {
    return null;
  }
  return (
    <MarkupToolbar
      annotation={selected}
      onDuplicate={actions.duplicateSelected}
      onRemove={removeActive}
      onReplace={actions.replace}
      scrollRef={scrollRef}
    />
  );
}
