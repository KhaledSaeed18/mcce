import { useCallback } from "react";
import { FileTypeChip } from "@/components/pdf-editor/file-type-chip";
import { CommandItem } from "@/components/ui/command";
import type { OpenFile, TabLabel } from "@/lib/pdf-editor/types";

interface EditorTabMenuItemProps {
  file: OpenFile;
  isActive: boolean;
  label: TabLabel;
  onSelect: (file: OpenFile) => void;
}

export function EditorTabMenuItem({
  file,
  isActive,
  label,
  onSelect,
}: EditorTabMenuItemProps) {
  const handleSelect = useCallback(() => onSelect(file), [file, onSelect]);

  return (
    <CommandItem
      data-checked={isActive}
      keywords={[label.text, file.name]}
      onSelect={handleSelect}
      title={file.name}
      value={file.id}
    >
      {label.chip ? <FileTypeChip chip={label.chip} /> : null}
      <span className="truncate">{label.text}</span>
    </CommandItem>
  );
}
