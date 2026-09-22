import { HandDrawnStroke } from "@/components/hand-drawn-stroke";
import { EditorPaperStack } from "@/components/pdf-editor/editor-paper-stack";
import { EditorPlaceholderLine } from "@/components/pdf-editor/editor-placeholder-line";
import {
  ANNOTATION_COLORS,
  EDITOR_IDLE_NOTE,
  EDITOR_IDLE_NOTE_HIDDEN,
  EDITOR_IDLE_TITLE,
} from "@/config/pdf-editor";

const [RED, , , , BLUE] = ANNOTATION_COLORS;

/* Each viewBox roughly matches its drawn size, so the stretch keeps the stroke even. */
const CIRCLE_PATH =
  "M 126 5 C 204 3, 238 14, 235 27 C 232 42, 170 50, 108 49 C 44 48, 5 38, 8 25 C 11 12, 64 3, 150 8";
const UNDERLINE_PATH = "M 3 6 C 60 3, 120 8, 180 5 S 240 4, 256 6";

const LINE_WIDTHS_ABOVE = ["64%", "92%", "84%"] as const;
const LINE_WIDTHS_BELOW = ["88%", "76%", "90%", "58%", "84%", "70%"] as const;
const UNDERLINED_LINE = 1;

interface EditorIdleSheetProps {
  isBrowserOpen: boolean;
}

/** A blank page marked up with the editor's own pen, noting where files come from. */
export function EditorIdleSheet({ isBrowserOpen }: EditorIdleSheetProps) {
  const note = isBrowserOpen ? EDITOR_IDLE_NOTE : EDITOR_IDLE_NOTE_HIDDEN;

  return (
    <EditorPaperStack>
      <div className="flex flex-col gap-3">
        {LINE_WIDTHS_ABOVE.map((width) => (
          <EditorPlaceholderLine key={width} width={width} />
        ))}
      </div>

      <div className="flex justify-center py-8">
        <h2 className="relative font-head text-2xl text-black">
          {EDITOR_IDLE_TITLE}
          <HandDrawnStroke
            className="-top-4 -left-5 h-[calc(100%+2rem)] w-[calc(100%+2.5rem)]"
            color={RED}
            order={0}
            path={CIRCLE_PATH}
            viewBox="0 0 240 52"
          />
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {LINE_WIDTHS_BELOW.map((width, index) => (
          <span className="relative flex" key={width}>
            <EditorPlaceholderLine width={width} />
            {index === UNDERLINED_LINE ? (
              <HandDrawnStroke
                className="-bottom-2 left-0 h-2"
                color={BLUE}
                order={1}
                path={UNDERLINE_PATH}
                style={{ width }}
                viewBox="0 0 260 10"
              />
            ) : null}
          </span>
        ))}
      </div>

      <p
        className="mt-auto text-center font-head text-sm"
        style={{ color: RED }}
      >
        {note}
      </p>
    </EditorPaperStack>
  );
}
