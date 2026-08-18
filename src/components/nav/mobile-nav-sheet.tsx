import { MobileNavGroups } from "@/components/nav/mobile-nav-groups";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";

/* Sits under the header bar rather than over it, so the search and theme
 * buttons stay where they are while the menu is open. It opens with a wipe but
 * closes instantly: animating a full-height panel out drags it across whatever
 * the page or the incoming route is already painting. */
const SHEET_CLASSES =
  "absolute inset-x-0 top-full h-[calc(100dvh-100%)] animate-in overflow-y-auto overscroll-contain bg-background px-4 pb-8 duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] fade-in-0 slide-in-from-top-4 sm:px-6 lg:hidden";

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
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-label="Site menu"
      aria-modal="true"
      className={SHEET_CLASSES}
      id={panelId}
      role="dialog"
      style={DOT_GRID_BACKGROUND}
    >
      <MobileNavGroups onNavigate={onClose} />
    </div>
  );
}
