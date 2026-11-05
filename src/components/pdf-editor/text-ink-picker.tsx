import { BanIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { ColorSwatches } from "@/components/pdf-editor/color-swatches";
import { Button } from "@/components/ui/button";
import { useColorInputPick } from "@/hooks/use-color-input-pick";
import { focusTextField } from "@/lib/pdf-editor/focus-text-field";
import { preventFocus } from "@/lib/prevent-focus";

const CUSTOM_FALLBACK = "#000000";

interface TextInkPickerProps {
  colors: readonly string[];
  /** Offers taking the color off altogether, which only a fill can do. */
  onClear?: () => void;
  onPick: (color: string) => void;
  value: string | undefined;
}

/** The palette, and the system's color picker for anything outside it. */
export function TextInkPicker({
  colors,
  onClear,
  onPick,
  value,
}: TextInkPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCustom = useCallback(
    (color: string) => {
      onPick(color);
      focusTextField();
    },
    [onPick]
  );
  useColorInputPick(inputRef, handleCustom);

  return (
    <div className="flex flex-col gap-2">
      <ColorSwatches colors={colors} onSelect={onPick} value={value ?? ""} />
      <div className="flex items-center gap-2 text-xs font-medium">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            aria-label="Custom color"
            className="size-6 cursor-pointer rounded border-2 bg-transparent"
            defaultValue={value ?? CUSTOM_FALLBACK}
            ref={inputRef}
            type="color"
          />
          Custom
        </label>
        {onClear ? (
          <Button
            className="ml-auto gap-1"
            onClick={onClear}
            onMouseDown={preventFocus}
            size="xs"
            type="button"
            variant="ghost"
          >
            <BanIcon className="size-3" />
            No fill
          </Button>
        ) : null}
      </div>
    </div>
  );
}
