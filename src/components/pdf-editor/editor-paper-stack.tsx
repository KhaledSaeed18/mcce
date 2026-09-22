import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EDITOR_PAPER_FAN } from "@/config/pdf-editor";

const SHEET_CLASSES =
  "absolute inset-0 rounded-sm border-2 border-black shadow-md";

interface EditorPaperStackProps {
  children: ReactNode;
}

/** The front page stays paper white in both themes, the way a PDF does. The
 * sheets behind it fan out once, as if the stack was just set down. */
export function EditorPaperStack({ children }: EditorPaperStackProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : { rotate: 0 };

  return (
    <div className="relative h-[26rem] w-80">
      <m.span
        animate={{ rotate: EDITOR_PAPER_FAN.back }}
        className={`${SHEET_CLASSES} bg-neutral-300`}
        initial={initial}
        transition={EDITOR_PAPER_FAN.transition}
      />
      <m.span
        animate={{ rotate: EDITOR_PAPER_FAN.middle }}
        className={`${SHEET_CLASSES} bg-neutral-200`}
        initial={initial}
        transition={EDITOR_PAPER_FAN.transition}
      />
      <div className="relative flex h-full flex-col rounded-sm border-2 border-black bg-white p-7 shadow-lg">
        {children}
      </div>
    </div>
  );
}
