import type { LucideIcon } from "lucide-react";
import { useCallback } from "react";
import { TextToolbarButton } from "@/components/pdf-editor/text-toolbar-button";
import type { TextAlign, TextStyle } from "@/lib/pdf-editor/types";

interface TextAlignButtonProps {
  align: TextAlign;
  icon: LucideIcon;
  isActive: boolean;
  label: string;
  onRestyle: (style: Partial<TextStyle>) => void;
}

export function TextAlignButton({
  align,
  icon,
  isActive,
  label,
  onRestyle,
}: TextAlignButtonProps) {
  const handleClick = useCallback(
    () => onRestyle({ align }),
    [align, onRestyle]
  );

  return (
    <TextToolbarButton
      icon={icon}
      isActive={isActive}
      label={label}
      onClick={handleClick}
    />
  );
}
