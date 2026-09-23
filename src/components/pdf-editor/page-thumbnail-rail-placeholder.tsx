import { Skeleton } from "@/components/ui/skeleton";
import {
  PLACEHOLDER_PAGE_SIZE,
  RAIL_PLACEHOLDER_COUNT,
  RAIL_WIDTH_CLASS,
  THUMBNAIL_WIDTH,
} from "@/config/pdf-editor";
import { cn } from "@/lib/utils";

const THUMBNAIL_STYLE = {
  aspectRatio: `${PLACEHOLDER_PAGE_SIZE.width} / ${PLACEHOLDER_PAGE_SIZE.height}`,
  width: THUMBNAIL_WIDTH,
};

const SLOTS = Array.from(
  { length: RAIL_PLACEHOLDER_COUNT },
  (_, index) => `slot-${index}`
);

/** Holds the rail open while the next file loads, so the pages beside it stay put. */
export function PageThumbnailRailPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 flex-col items-center gap-4 overflow-hidden border-r-2 bg-card p-4",
        RAIL_WIDTH_CLASS
      )}
    >
      {SLOTS.map((slot) => (
        <Skeleton className="shrink-0" key={slot} style={THUMBNAIL_STYLE} />
      ))}
    </div>
  );
}
