import type { LucideIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { TEXT_MARK_LABELS } from "@/config/pdf-editor";
import { keepSelection } from "@/lib/keep-selection";
import type { TextMarkStyle } from "@/lib/pdf-editor/types";

interface TextMarkButtonProps {
  icon: LucideIcon;
  onMark: (style: TextMarkStyle) => void;
  style: TextMarkStyle;
}

export function TextMarkButton({
  icon: Icon,
  onMark,
  style,
}: TextMarkButtonProps) {
  const handleClick = useCallback(() => onMark(style), [onMark, style]);

  return (
    <Button
      aria-label={TEXT_MARK_LABELS[style]}
      onClick={handleClick}
      onMouseDown={keepSelection}
      size="icon-sm"
      title={TEXT_MARK_LABELS[style]}
      variant="ghost"
    >
      <Icon />
    </Button>
  );
}
