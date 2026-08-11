import { COURSE_ICON_BY_CODE, DEFAULT_COURSE_ICON } from "@/config/courses";
import type { MarginPatternItem } from "@/config/margin-pattern";

export function MarginChip({ item }: { item: MarginPatternItem }) {
  const Icon = COURSE_ICON_BY_CODE[item.code] ?? DEFAULT_COURSE_ICON;

  return (
    <div
      className="absolute flex flex-col items-center gap-1 opacity-40"
      style={{
        left: "50%",
        top: `${item.top}%`,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
      }}
    >
      <span
        className="flex size-8 items-center justify-center rounded border-2 shadow-xs"
        style={{ backgroundColor: `var(--${item.color})` }}
      >
        <Icon className="size-4 text-black" />
      </span>
      <span className="font-head text-[9px] tracking-wide">{item.code}</span>
    </div>
  );
}
