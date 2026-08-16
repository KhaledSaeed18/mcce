import { useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import type {
  GpaExportSection,
  GpaExportSectionOption,
} from "@/lib/gpa/export/types";

interface GpaExportSectionToggleProps {
  isOn: boolean;
  onToggle: (id: GpaExportSection, isOn: boolean) => void;
  option: GpaExportSectionOption;
}

export function GpaExportSectionToggle({
  isOn,
  onToggle,
  option,
}: GpaExportSectionToggleProps) {
  const handleChange = useCallback(
    (checked: boolean) => onToggle(option.id, checked),
    [onToggle, option.id]
  );

  return (
    <div className="flex items-start justify-between gap-3">
      <label className="flex flex-col" htmlFor={`export-${option.id}`}>
        <span className="font-medium text-sm">{option.label}</span>
        <span className="text-muted-foreground text-xs">
          {option.description}
        </span>
      </label>
      <Switch
        checked={isOn}
        id={`export-${option.id}`}
        onCheckedChange={handleChange}
        size="sm"
      />
    </div>
  );
}
