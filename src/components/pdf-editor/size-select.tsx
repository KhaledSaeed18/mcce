import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EDITOR_SELECT_HEIGHT_CLASS } from "@/config/pdf-editor";

interface SizeSelectProps {
  label: string;
  onValueChange: (value: number) => void;
  options: readonly number[];
  suffix: string;
  value: number;
}

export function SizeSelect({
  label,
  onValueChange,
  options,
  suffix,
  value,
}: SizeSelectProps) {
  const handleValueChange = useCallback(
    (next: string | null) => {
      if (next) {
        onValueChange(Number(next));
      }
    },
    [onValueChange]
  );

  return (
    <Select onValueChange={handleValueChange} value={String(value)}>
      <SelectTrigger aria-label={label} className={EDITOR_SELECT_HEIGHT_CLASS}>
        <SelectValue>{() => `${value}${suffix}`}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {`${option}${suffix}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
