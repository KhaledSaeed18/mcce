import { ColorSwatch } from "@/components/pdf-editor/color-swatch";

interface ColorSwatchesProps {
  colors: readonly string[];
  onSelect: (color: string) => void;
  value: string;
}

export function ColorSwatches({ colors, onSelect, value }: ColorSwatchesProps) {
  return (
    <fieldset className="flex items-center gap-1">
      <legend className="sr-only">Colour</legend>
      {colors.map((color) => (
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
