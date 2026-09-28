import { FILE_CHIP_CLASSES, FILE_CHIP_LABELS } from "@/config/pdf-editor";
import type { FileChip } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface FileTypeChipProps {
  chip: FileChip;
}

export function FileTypeChip({ chip }: FileTypeChipProps) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-sm border border-current px-1 font-head text-[0.55rem] uppercase leading-4 tracking-wider",
        FILE_CHIP_CLASSES[chip]
      )}
    >
      {FILE_CHIP_LABELS[chip]}
    </span>
  );
}
