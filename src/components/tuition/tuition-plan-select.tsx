import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TuitionPlanSelectOption {
  label: string;
  value: string;
}

interface TuitionPlanSelectProps {
  label: string;
  onValueChange: (value: string) => void;
  options: TuitionPlanSelectOption[];
  value: string;
}

export function TuitionPlanSelect({
  label,
  onValueChange,
  options,
  value,
}: TuitionPlanSelectProps) {
  const handleValueChange = useCallback(
    (next: string | null) => onValueChange(next ?? value),
    [onValueChange, value]
  );

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-medium text-sm">{label}</span>
      <Select onValueChange={handleValueChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue>{() => selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
