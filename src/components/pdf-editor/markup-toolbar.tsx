import { CopyIcon, Trash2Icon } from "lucide-react";
import { type RefObject, useCallback, useRef } from "react";
import { ColorSwatches } from "@/components/pdf-editor/color-swatches";
import { SizeSelect } from "@/components/pdf-editor/size-select";
import { TextToolbarButton } from "@/components/pdf-editor/text-toolbar-button";
import { Separator } from "@/components/ui/separator";
import { useMarkupToolbarPosition } from "@/hooks/use-markup-toolbar-position";
import {
  getMarkupStyleOptions,
  getMarkupWidth,
  withMarkupWidth,
} from "@/lib/pdf-editor/markup-style";
import type { Annotation } from "@/lib/pdf-editor/types";

interface MarkupToolbarProps {
  annotation: Annotation;
  onDuplicate: () => void;
  onRemove: () => void;
  onReplace: (annotation: Annotation) => void;
  scrollRef: RefObject<HTMLElement | null>;
}

/** What can be done to selected markup other than text, right beside it. */
export function MarkupToolbar({
  annotation,
  onDuplicate,
  onRemove,
  onReplace,
  scrollRef,
}: MarkupToolbarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  useMarkupToolbarPosition(barRef, scrollRef);
  const options = getMarkupStyleOptions(annotation);
  const width = getMarkupWidth(annotation);

  const handleColor = useCallback(
    (color: string) => onReplace({ ...annotation, color }),
    [annotation, onReplace]
  );
  const handleWidth = useCallback(
    (next: number) => onReplace(withMarkupWidth(annotation, next)),
    [annotation, onReplace]
  );

  return (
    <div
      aria-label="Selected markup"
      className="bg-card invisible fixed top-0 left-0 z-30 flex items-center gap-1 rounded border-2 p-1 shadow-md"
      ref={barRef}
      role="toolbar"
    >
      {options ? (
        <>
          <ColorSwatches
            colors={options.colors}
            onSelect={handleColor}
            value={annotation.color}
          />
          {options.widths && width !== null ? (
            <SizeSelect
              label="Line width"
              onValueChange={handleWidth}
              options={options.widths}
              suffix="px"
              value={width}
            />
          ) : null}
          <Separator className="mx-0.5 h-5" orientation="vertical" />
        </>
      ) : null}
      <TextToolbarButton
        icon={CopyIcon}
        label="Duplicate"
        onClick={onDuplicate}
      />
      <TextToolbarButton icon={Trash2Icon} label="Delete" onClick={onRemove} />
    </div>
  );
}
