import { useCallback } from "react";
import { EDITOR_CONTROL_HEIGHT_CLASS } from "@/config/pdf-editor";
import { preventFocus } from "@/lib/prevent-focus";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  color: string;
  isActive: boolean;
  onSelect: (color: string) => void;
}

export function ColorSwatch({ color, isActive, onSelect }: ColorSwatchProps) {
  const handleClick = useCallback(() => onSelect(color), [color, onSelect]);

  return (
    <button
      aria-label={color}
      aria-pressed={isActive}
      className={cn(
        "w-9 cursor-pointer rounded border-2 transition duration-200 hover:-translate-y-0.5",
        EDITOR_CONTROL_HEIGHT_CLASS,
        isActive ? "shadow-md" : "shadow-xs"
      )}
      onClick={handleClick}
      onMouseDown={preventFocus}
      style={{ backgroundColor: color }}
      type="button"
    />
  );
}
