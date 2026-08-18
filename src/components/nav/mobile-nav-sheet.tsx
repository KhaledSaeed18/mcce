import { MobileNavGroups } from "@/components/nav/mobile-nav-groups";
import { NAV_SHEET_EXIT_MS } from "@/config/motion";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";
import { useDelayedUnmount } from "@/hooks/use-delayed-unmount";

/* Sits under the header bar rather than over it, so the search and theme
 * buttons stay where they are while the menu is open. */
const SHEET_CLASSES =
  "absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain bg-background px-4 pb-8 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-6 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-6 sm:px-6 lg:hidden";

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
  const shouldRender = useDelayedUnmount(isOpen, NAV_SHEET_EXIT_MS);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      aria-label="Site menu"
      aria-modal="true"
      className={SHEET_CLASSES}
      data-state={isOpen ? "open" : "closed"}
      id={panelId}
      role="dialog"
      style={DOT_GRID_BACKGROUND}
    >
      <MobileNavGroups onNavigate={onClose} />
    </div>
  );
}
