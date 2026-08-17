import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOption } from "@/lib/drive/types";

/** Stands in for "no filter", since a select cannot carry an undefined value. */
const ALL_VALUE = "all";

interface SearchFilterSelectProps {
  allLabel: string;
  onValueChange: (value: string | undefined) => void;
  options: FilterOption[];
  value: string | undefined;
}

export function SearchFilterSelect({
  allLabel,
  onValueChange,
  options,
  value,
}: SearchFilterSelectProps) {
  const handleValueChange = useCallback(
    (next: string | null) =>
      onValueChange(next === null || next === ALL_VALUE ? undefined : next),
    [onValueChange]
  );

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? allLabel;

  return (
    <Select onValueChange={handleValueChange} value={value ?? ALL_VALUE}>
      <SelectTrigger>
        <SelectValue>{() => selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
