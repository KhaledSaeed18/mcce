import type { LucideIcon } from "lucide-react";
import { useCallback } from "react";
import { TextToolbarButton } from "@/components/pdf-editor/text-toolbar-button";
import type { TextStyle } from "@/lib/pdf-editor/types";

interface TextFormatToggleProps {
  field: "bold" | "italic" | "underline";
  icon: LucideIcon;
  label: string;
  onRestyle: (style: Partial<TextStyle>) => void;
  style: TextStyle;
}

export function TextFormatToggle({
  field,
  icon,
  label,
  onRestyle,
  style,
}: TextFormatToggleProps) {
  const isOn = style[field] === true;
  const handleClick = useCallback(
    () => onRestyle({ [field]: !isOn }),
    [field, isOn, onRestyle]
  );

  return (
    <TextToolbarButton
      icon={icon}
      isActive={isOn}
      label={label}
      onClick={handleClick}
    />
  );
}
