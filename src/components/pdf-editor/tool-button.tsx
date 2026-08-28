import type { LucideIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { TOOL_LABELS } from "@/config/pdf-editor";
import type { EditorTool } from "@/lib/pdf-editor/types";

interface ToolButtonProps {
  icon: LucideIcon;
  isActive: boolean;
  onSelect: (tool: EditorTool) => void;
  tool: EditorTool;
}

export function ToolButton({
  icon: Icon,
  isActive,
  onSelect,
  tool,
}: ToolButtonProps) {
  const handleClick = useCallback(() => onSelect(tool), [onSelect, tool]);

  return (
    <Button
      aria-label={TOOL_LABELS[tool]}
      aria-pressed={isActive}
      onClick={handleClick}
      size="icon"
      title={TOOL_LABELS[tool]}
      variant={isActive ? "default" : "outline"}
    >
      <Icon />
    </Button>
  );
}
