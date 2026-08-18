import { Link } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { LogoMark } from "@/components/logo-mark";
import { MobileNavGroups } from "@/components/nav/mobile-nav-groups";
import { Button } from "@/components/ui/button";
import {
  NAV_SHEET_CLOSED_CLIP,
  NAV_SHEET_EXIT_MS,
  NAV_SHEET_EXIT_TRANSITION,
  NAV_SHEET_OPEN_CLIP,
  NAV_SHEET_TRANSITION,
} from "@/config/motion";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";
import { useDelayedUnmount } from "@/hooks/use-delayed-unmount";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface MobileNavSheetProps {
  isOpen: boolean;
  onClose: () => void;
  panelId: string;
}

export function MobileNavSheet({
  isOpen,
  onClose,
  panelId,
}: MobileNavSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const shouldRender = useDelayedUnmount(isOpen, NAV_SHEET_EXIT_MS);

  useFocusTrap(sheetRef, isOpen);

  if (!shouldRender) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ clipPath: NAV_SHEET_OPEN_CLIP }}
          aria-label="Site menu"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
          exit={{
            clipPath: NAV_SHEET_CLOSED_CLIP,
            transition: NAV_SHEET_EXIT_TRANSITION,
          }}
          id={panelId}
          initial={{ clipPath: NAV_SHEET_CLOSED_CLIP }}
          key="mobile-nav-sheet"
          ref={sheetRef}
          role="dialog"
          style={DOT_GRID_BACKGROUND}
          transition={
            shouldReduceMotion ? { duration: 0 } : NAV_SHEET_TRANSITION
          }
        >
          <div className="flex items-center justify-between gap-4 border-b-2 bg-background p-4 sm:px-6">
            <Link
              className="group flex items-center gap-2 font-head text-lg"
              onClick={onClose}
              to="/"
            >
              <LogoMark />
              MCCE
            </Link>
            <Button
              aria-label="Close menu"
              className="size-8 p-0"
              onClick={onClose}
              size="sm"
              variant="outline"
            >
              <XIcon />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 sm:px-6">
            <div className="mt-5">
              <MobileNavGroups onNavigate={onClose} />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
