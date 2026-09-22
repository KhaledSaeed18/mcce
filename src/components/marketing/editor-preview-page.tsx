import { HandDrawnStroke } from "@/components/hand-drawn-stroke";
import {
  EDITOR_PREVIEW_FORMULA,
  EDITOR_PREVIEW_LINES_ABOVE,
  EDITOR_PREVIEW_LINES_BELOW,
  EDITOR_PREVIEW_NOTE,
} from "@/config/features";
import { ANNOTATION_COLORS } from "@/config/pdf-editor";

const [RED, , ORANGE, , BLUE] = ANNOTATION_COLORS;

/* The viewBoxes roughly match the drawn size, so the stretch keeps the stroke even. */
const CIRCLE_PATH =
  "M 114 4 C 185 3, 216 12, 213 21 C 211 32, 154 38, 99 37 C 40 36, 4 29, 7 19 C 9 9, 57 2, 136 6";
const UNDERLINE_PATH = "M 4 6 C 80 3, 160 8, 240 5 S 360 4, 396 6";
const ARROW_PATH = "M 2 18 C 10 6, 22 4, 38 8 M 30 2 L 38 8 L 30 14";

/** The page stays paper white in both themes, the way a PDF does. */
export function EditorPreviewPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-2.5 rounded-sm border-2 border-black bg-white p-5 text-black shadow-md">
      <span className="h-2.5 w-1/2 rounded-full bg-black/70" />

      {EDITOR_PREVIEW_LINES_ABOVE.map((width) => (
        <span
          className="h-1.5 rounded-full bg-black/15"
          key={width}
          style={{ width }}
        />
      ))}

      <div className="flex items-center gap-6 py-2 pl-6">
        <span className="relative font-mono text-[11px] sm:text-xs">
          {EDITOR_PREVIEW_FORMULA}
          <HandDrawnStroke
            className="-top-2.5 -left-3 h-[calc(100%+1.25rem)] w-[calc(100%+1.5rem)]"
            color={RED}
            order={0}
            path={CIRCLE_PATH}
            viewBox="0 0 220 40"
          />
        </span>

        <span className="relative hidden items-center gap-2 pl-10 sm:flex">
          <HandDrawnStroke
            className="top-0 left-0 h-5 w-9 -scale-x-100"
            color={RED}
            order={1}
            path={ARROW_PATH}
            viewBox="0 0 40 20"
          />
          <span className="font-head text-xs" style={{ color: RED }}>
            {EDITOR_PREVIEW_NOTE}
          </span>
        </span>
      </div>

      {EDITOR_PREVIEW_LINES_BELOW.map((width, index) => (
        <span className="relative" key={width} style={{ width }}>
          <span className="block h-1.5 rounded-full bg-black/15" />
          {index === 0 ? (
            <HandDrawnStroke
              className="-bottom-2 left-0 h-2 w-full"
              color={BLUE}
              order={2}
              path={UNDERLINE_PATH}
              viewBox="0 0 400 10"
            />
          ) : null}
        </span>
      ))}

      <span
        className="mt-1 h-6 w-2/5 rounded-sm border-2"
        style={{ borderColor: ORANGE }}
      />
    </div>
  );
}
