import { useCallback } from "react";
import { TEXT_FONTS } from "@/config/pdf-editor";
import type { TextFontFamily } from "@/lib/pdf-editor/types";
import { preventFocus } from "@/lib/prevent-focus";
import { cn } from "@/lib/utils";

interface TextFontOptionProps {
  family: TextFontFamily;
  isActive: boolean;
  onPick: (family: TextFontFamily) => void;
}

/** One font, listed in its own face. */
export function TextFontOption({
  family,
  isActive,
  onPick,
}: TextFontOptionProps) {
  const handleClick = useCallback(() => onPick(family), [family, onPick]);

  return (
    <button
      aria-pressed={isActive}
      className={cn(
        "hover:bg-accent hover:text-accent-foreground cursor-pointer rounded px-2 py-1 text-left text-sm",
        isActive && "bg-accent text-accent-foreground"
      )}
      onClick={handleClick}
      onMouseDown={preventFocus}
      style={{ fontFamily: TEXT_FONTS[family].stack }}
      type="button"
    >
      {TEXT_FONTS[family].label}
    </button>
  );
}
