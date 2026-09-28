import { CropIcon, EllipsisVerticalIcon } from "lucide-react";
import { PageInsertMenuItem } from "@/components/pdf-editor/page-insert-menu-item";
import { PageThumbnailAction } from "@/components/pdf-editor/page-thumbnail-action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CLIP_PAGE_LABEL } from "@/config/pdf-editor";
import type { PageSheet } from "@/lib/pdf-editor/types";

const SHEETS: readonly PageSheet[] = ["blank", "grid"];

interface PageInsertMenuProps {
  isActive: boolean;
  onClip: () => void;
  onInsert: (sheet: PageSheet) => void;
  /** Where the page sits now, which the menu is labelled by. */
  position: number;
}

/** From the corner of a page's thumbnail: put a sheet to work on in after
 * it, or keep the whole page in view as a clip. */
export function PageInsertMenu({
  isActive,
  onClip,
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
            label={`More for page ${position + 1}`}
          />
        }
      >
        <EllipsisVerticalIcon className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        {SHEETS.map((sheet) => (
          <PageInsertMenuItem key={sheet} onInsert={onInsert} sheet={sheet} />
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClip}>
          <CropIcon />
          {CLIP_PAGE_LABEL}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
