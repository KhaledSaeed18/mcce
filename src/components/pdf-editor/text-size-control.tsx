import { MinusIcon, PlusIcon } from "lucide-react";
import { useCallback } from "react";
import { TextToolbarButton } from "@/components/pdf-editor/text-toolbar-button";
import { useTextSizeField } from "@/hooks/use-text-size-field";
import { stepFontSize } from "@/lib/pdf-editor/text-style";

interface TextSizeControlProps {
  onChange: (fontSize: number) => void;
  value: number;
}

/** Minus and plus step through common sizes, and the box takes any size typed. */
export function TextSizeControl({ onChange, value }: TextSizeControlProps) {
  const { handleBlur, handleChange, handleKeyDown, typed } = useTextSizeField(
    value,
    onChange
  );
  const handleSmaller = useCallback(
    () => onChange(stepFontSize(value, -1)),
    [onChange, value]
  );
  const handleBigger = useCallback(
    () => onChange(stepFontSize(value, 1)),
    [onChange, value]
  );

  return (
    <div className="flex items-center">
      <TextToolbarButton
        icon={MinusIcon}
        label="Smaller text"
        onClick={handleSmaller}
      />
      <input
        aria-label="Text size"
        className="focus:border-primary h-7 w-10 rounded border-2 border-transparent bg-transparent text-center text-sm font-medium outline-none"
        inputMode="decimal"
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={typed}
      />
      <TextToolbarButton
        icon={PlusIcon}
        label="Bigger text"
        onClick={handleBigger}
      />
    </div>
  );
}
