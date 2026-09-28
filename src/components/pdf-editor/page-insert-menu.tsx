import { FilePlusIcon } from "lucide-react";
import { PageInsertMenuItem } from "@/components/pdf-editor/page-insert-menu-item";
import { PageThumbnailAction } from "@/components/pdf-editor/page-thumbnail-action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PageSheet } from "@/lib/pdf-editor/types";

const SHEETS: readonly PageSheet[] = ["blank", "grid"];

interface PageInsertMenuProps {
  isActive: boolean;
  onInsert: (sheet: PageSheet) => void;
  /** Where the page sits now, which the menu is labelled by. */
  position: number;
}

/** Puts a sheet to work on in after a page, from the corner of its thumbnail. */
export function PageInsertMenu({
  isActive,
  onInsert,
  position,
}: PageInsertMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <PageThumbnailAction
            corner="bottom-right"
            isActive={isActive}
            label={`Add a page after page ${position + 1}`}
          />
        }
      >
        <FilePlusIcon className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        {SHEETS.map((sheet) => (
          <PageInsertMenuItem key={sheet} onInsert={onInsert} sheet={sheet} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
