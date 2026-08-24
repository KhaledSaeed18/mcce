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
        <span className="shrink-0" key={index}>
          <span
            className="block size-3 rotate-45 border-2 sm:size-4"
            style={{
              backgroundColor: `var(--${COURSE_CARD_COLORS[index % COURSE_CARD_COLORS.length]})`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
