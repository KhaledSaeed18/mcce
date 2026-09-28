import { Columns2Icon } from "lucide-react";
import { useCallback } from "react";
import { CommandItem } from "@/components/ui/command";
import { describeStudySet } from "@/lib/pdf-editor/study-set-summary";
import type { StudySet } from "@/lib/pdf-editor/types";

interface StudySetMenuItemProps {
  onOpen: (id: string) => void;
  set: StudySet;
}

export function StudySetMenuItem({ onOpen, set }: StudySetMenuItemProps) {
  const handleSelect = useCallback(() => onOpen(set.id), [onOpen, set.id]);

  return (
    <CommandItem keywords={[set.name]} onSelect={handleSelect} value={set.id}>
      {set.besideId ? <Columns2Icon /> : null}
      <span className="truncate">{set.name}</span>
      <span className="ml-auto shrink-0 text-muted-foreground text-xs">
        {describeStudySet(set)}
      </span>
    </CommandItem>
  );
}
