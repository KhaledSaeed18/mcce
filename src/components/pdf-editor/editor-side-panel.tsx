import { AnimatePresence, m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EDITOR_PANEL_TRANSITION } from "@/config/motion";

interface EditorSidePanelProps {
  children: ReactNode;
  isOpen: boolean;
}

/** Collapses its panel's width while it fades, so the pages beside it slide
 * over instead of jumping. The panel keeps its own fixed width inside. */
export function EditorSidePanel({ children, isOpen }: EditorSidePanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <m.div
          animate={{ opacity: 1, width: "auto" }}
          className="flex shrink-0 overflow-hidden"
          exit={{ opacity: 0, width: 0 }}
          initial={{ opacity: 0, width: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : EDITOR_PANEL_TRANSITION
          }
        >
          {children}
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
