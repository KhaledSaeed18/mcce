import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { TextDraftHandle } from "@/components/pdf-editor/text-draft-handle";
import { Input } from "@/components/ui/input";
import type { TextDraft } from "@/lib/pdf-editor/types";

interface TextDraftInputProps {
  draft: TextDraft;
  fontSize: number;
  onCancel: () => void;
  onCommit: (text: string) => void;
  onMove: (dx: number, dy: number) => void;
  zoom: number;
}

export function TextDraftInput({
  draft,
  fontSize,
  onCancel,
  onCommit,
  onMove,
  zoom,
}: TextDraftInputProps) {
  const [value, setValue] = useState("");

  const commit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed) {
      onCommit(trimmed);
      return;
    }
    onCancel();
  }, [onCancel, onCommit, value]);

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
        left: draft.x * zoom,
        top: draft.y * zoom - fontSize * zoom,
      }}
    >
      <TextDraftHandle onMove={onMove} zoom={zoom} />
      <Input
        aria-label="Annotation text"
        autoFocus
        className="w-48 rounded-l-none bg-card"
        onBlur={commit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here"
        style={{ fontSize: fontSize * zoom }}
        value={value}
      />
    </div>
  );
}
