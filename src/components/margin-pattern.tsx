import { MarginChip } from "@/components/margin-chip";
import {
  MARGIN_PATTERN_LEFT,
  MARGIN_PATTERN_RIGHT,
  type MarginPatternItem,
} from "@/config/margin-pattern";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";
import { cn } from "@/lib/utils";

const MARGIN_POSITION = {
  left: "left-0",
  right: "right-0",
} as const;

const MARGIN_WIDTH = "w-[calc(50%_-_36rem_-_1.5rem)]";

type MarginSide = keyof typeof MARGIN_POSITION;

const MARGIN_ITEMS: Record<MarginSide, MarginPatternItem[]> = {
  left: MARGIN_PATTERN_LEFT,
  right: MARGIN_PATTERN_RIGHT,
};

function MarginColumn({ side }: { side: MarginSide }) {
  return (
    <div
      className={cn(
        "absolute inset-y-0 hidden overflow-hidden xl:block",
        MARGIN_WIDTH,
        MARGIN_POSITION[side]
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={DOT_GRID_BACKGROUND}
      />
      {MARGIN_ITEMS[side].map((item) => (
        <MarginChip item={item} key={item.code} />
      ))}
    </div>
  );
}

export function MarginPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <MarginColumn side="left" />
      <MarginColumn side="right" />
    </div>
  );
}
