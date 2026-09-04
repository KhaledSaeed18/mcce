import { ColorSwatch } from "@/components/pdf-editor/color-swatch";
import { ANNOTATION_COLORS } from "@/config/pdf-editor";

interface ColorSwatchesProps {
  onSelect: (color: string) => void;
  value: string;
}

export function ColorSwatches({ onSelect, value }: ColorSwatchesProps) {
  return (
    <fieldset className="flex items-center gap-1">
      <legend className="sr-only">Colour</legend>
      {ANNOTATION_COLORS.map((color) => (
        <ColorSwatch
          color={color}
          isActive={color === value}
          key={color}
          onSelect={onSelect}
        />
      ))}
    </fieldset>
  );
}
