import { ACCENT_COLORS } from "@/config/colors";
import { cn } from "@/lib/utils";

const RAIL_NODES = [
  { color: ACCENT_COLORS[0], top: 10 },
  { color: ACCENT_COLORS[1], top: 36 },
  { color: ACCENT_COLORS[2], top: 62 },
  { color: ACCENT_COLORS[3], top: 88 },
] as const;

const RAIL_POSITION = {
  left: "left-[calc(50%_-_32rem_-_1.5rem)]",
  right: "right-[calc(50%_-_32rem_-_1.5rem)]",
} as const;

type RailSide = keyof typeof RAIL_POSITION;

function Rail({ side }: { side: RailSide }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-y-0 hidden w-[2px] xl:block",
        RAIL_POSITION[side]
      )}
    >
      <div className="h-full w-full bg-border" />
      {RAIL_NODES.map((node) => (
        <span
          className="absolute left-1/2 size-2 -translate-x-1/2 rotate-45 border-2"
          key={node.color}
          style={{ backgroundColor: node.color, top: `${node.top}%` }}
        />
      ))}
    </div>
  );
}

export function RailLine({ side }: { side: RailSide }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-y-0 hidden w-[2px] bg-border xl:block",
        RAIL_POSITION[side]
      )}
    />
  );
}

export function PageRails() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <Rail side="left" />
      <Rail side="right" />
    </div>
  );
}
