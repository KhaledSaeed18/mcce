import { FileIcon, Grid3x3Icon, type LucideIcon } from "lucide-react";
import { useCallback } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PAGE_SHEET_LABELS } from "@/config/pdf-editor";
import type { PageSheet } from "@/lib/pdf-editor/types";

const SHEET_ICONS: Record<PageSheet, LucideIcon> = {
  blank: FileIcon,
  grid: Grid3x3Icon,
};

interface PageInsertMenuItemProps {
  onInsert: (sheet: PageSheet) => void;
  sheet: PageSheet;
}

export function PageInsertMenuItem({
  onInsert,
  sheet,
}: PageInsertMenuItemProps) {
  const Icon = SHEET_ICONS[sheet];
  const handleClick = useCallback(() => onInsert(sheet), [onInsert, sheet]);

  return (
    <DropdownMenuItem onClick={handleClick}>
      <Icon />
      {PAGE_SHEET_LABELS[sheet]}
    </DropdownMenuItem>
  );
}
