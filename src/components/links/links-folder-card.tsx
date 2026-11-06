import { ArrowUpRightIcon } from "lucide-react";
import { DriveGlyph } from "@/components/drive/drive-glyph";
import { LINKS_FOLDER_ACTION } from "@/config/links";
import { formatCount } from "@/lib/drive/format";
import type { SemesterFolder } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

const FOLDER_LINK_CLASSES = cn(
  "group lift-hit-area relative block rounded-lg pt-6 text-black transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1",
  "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-4"
);

interface LinksFolderCardProps {
  color: string;
  folder: SemesterFolder;
  tabLeftPercent: number;
}

export function LinksFolderCard({
  color,
  folder,
  tabLeftPercent,
}: LinksFolderCardProps) {
  const fill = `var(--${color})`;

  return (
    <a
      className={FOLDER_LINK_CLASSES}
      href={folder.href}
      rel="noopener"
      target="_blank"
    >
      {/* The ::after reaches 2px past the body's top border. Ending level with the
          border would leave an anti-aliased edge over black, which shows as a
          dark line whenever the hover lift lands on a fractional pixel. */}
      <span
        className="font-head absolute top-0 z-10 flex h-[1.625rem] w-1/4 min-w-fit items-center justify-center rounded-t border-2 border-b-0 px-2 text-xs tracking-wide whitespace-nowrap uppercase after:absolute after:inset-x-0 after:-bottom-0.5 after:h-1.5 after:bg-inherit"
        style={{ backgroundColor: fill, left: `${tabLeftPercent}%` }}
      >
        Year {folder.year}
      </span>

      <span
        className="flex items-center justify-between gap-3 rounded-lg border-2 p-3 shadow-md transition duration-200 group-hover:shadow-lg group-active:shadow-none sm:p-4"
        style={{ backgroundColor: fill }}
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="font-head text-xl leading-tight sm:text-2xl">
            {folder.term} semester
          </span>
          <span className="text-sm font-medium">
            {formatCount(folder.courses.length, "course")} ·{" "}
            {formatCount(folder.fileCount, "file")}
          </span>
          <span className="sr-only">{LINKS_FOLDER_ACTION}</span>
        </span>

        <span className="flex shrink-0 items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded border-2 border-black bg-white">
            <DriveGlyph className="size-5" />
          </span>
          <ArrowUpRightIcon className="size-5 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </span>
    </a>
  );
}
