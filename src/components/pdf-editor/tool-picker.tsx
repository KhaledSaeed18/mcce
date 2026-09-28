import type { LucideIcon } from "lucide-react";
import {
  BlindsIcon,
  CircleIcon,
  CropIcon,
  EraserIcon,
  HandIcon,
  HighlighterIcon,
  MoveUpRightIcon,
  PenLineIcon,
  SquareIcon,
  StickyNoteIcon,
  TextCursorIcon,
  TypeIcon,
} from "lucide-react";
import { ToolButton } from "@/components/pdf-editor/tool-button";
import type { EditorTool } from "@/lib/pdf-editor/types";

const TOOLS: Array<{ icon: LucideIcon; tool: EditorTool }> = [
  { icon: HandIcon, tool: "hand" },
  { icon: TextCursorIcon, tool: "select" },
  { icon: PenLineIcon, tool: "pen" },
  { icon: HighlighterIcon, tool: "highlight" },
  { icon: SquareIcon, tool: "rect" },
  { icon: CircleIcon, tool: "ellipse" },
  { icon: MoveUpRightIcon, tool: "arrow" },
  { icon: TypeIcon, tool: "text" },
  { icon: StickyNoteIcon, tool: "note" },
  { icon: BlindsIcon, tool: "cover" },
  { icon: CropIcon, tool: "clip" },
  { icon: EraserIcon, tool: "eraser" },
];

interface ToolPickerProps {
  onSelect: (tool: EditorTool) => void;
  value: EditorTool;
}

export function ToolPicker({ onSelect, value }: ToolPickerProps) {
  return (
    <fieldset className="flex items-center gap-1">
      <legend className="sr-only">Tools</legend>
      {TOOLS.map(({ icon, tool }) => (
        <ToolButton
          icon={icon}
          isActive={tool === value}
          key={tool}
          onSelect={onSelect}
          tool={tool}
        />
      ))}
    </fieldset>
  );
}
