import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { TextDraftHandle } from "@/components/pdf-editor/text-draft-handle";
import { Input } from "@/components/ui/input";
import { clampBox } from "@/lib/pdf-editor/bounds";
import { getDraftBox, getDraftSize } from "@/lib/pdf-editor/text-metrics";
import type { PageSize, TextDraft } from "@/lib/pdf-editor/types";

interface TextDraftInputProps {
  draft: TextDraft;
  onCancel: () => void;
  onCommit: (value: string) => void;
  onMove: (dx: number, dy: number) => void;
  size: PageSize;
  zoom: number;
}

export function TextDraftInput({
  draft,
  onCancel,
  onCommit,
  onMove,
  size,
  zoom,
}: TextDraftInputProps) {
  const [value, setValue] = useState(draft.text);
  // The anchor stays where the text belongs; only the field is pulled inside.
  const box = clampBox(getDraftBox(draft, zoom), size);
  const draftSize = getDraftSize(draft.fontSize, zoom);

  const commit = useCallback(() => onCommit(value), [onCommit, value]);

  /** Opening a field over existing text offers it up for replacing. */
  const selectAll = useCallback((node: HTMLInputElement | null) => {
    node?.select();
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        commit();
      }
      if (event.key === "Escape") {
        onCancel();
      }
    },
    [commit, onCancel]
  );

  return (
    <div
      className="absolute z-10 flex items-stretch"
      style={{
        height: draftSize.height,
        left: box.x * zoom,
        top: box.y * zoom,
        width: draftSize.width,
      }}
    >
      <TextDraftHandle onMove={onMove} zoom={zoom} />
      <Input
        aria-label="Annotation text"
        autoFocus
        className="h-full flex-1 rounded-l-none bg-card"
        onBlur={commit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here"
        ref={selectAll}
        style={{ fontSize: draft.fontSize * zoom }}
        value={value}
      />
    </div>
  );
}
