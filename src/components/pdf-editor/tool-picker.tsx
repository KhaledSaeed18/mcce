import type { LucideIcon } from "lucide-react";
import {
  CircleIcon,
  EraserIcon,
  PenLineIcon,
  SquareIcon,
  TypeIcon,
} from "lucide-react";
import { ToolButton } from "@/components/pdf-editor/tool-button";
import type { EditorTool } from "@/lib/pdf-editor/types";

const TOOLS: Array<{ icon: LucideIcon; tool: EditorTool }> = [
  { icon: PenLineIcon, tool: "pen" },
  { icon: SquareIcon, tool: "rect" },
  { icon: CircleIcon, tool: "ellipse" },
  { icon: TypeIcon, tool: "text" },
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
