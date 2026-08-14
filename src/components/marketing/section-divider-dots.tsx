import { COURSE_CARD_COLORS } from "@/config/courses";

const DIAMOND_COUNT = 9;
const DIAMONDS = Array.from({ length: DIAMOND_COUNT }, (_, index) => index);

export function SectionDividerDots() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-4 border-y-2 py-6 sm:gap-6 sm:py-8"
    >
      {DIAMONDS.map((index) => (
        <span
          className="size-3 shrink-0 rotate-45 border-2 border-black sm:size-4"
          key={index}
          style={{
            backgroundColor: `var(--${COURSE_CARD_COLORS[index % COURSE_CARD_COLORS.length]})`,
          }}
        />
      ))}
    </div>
  );
}
