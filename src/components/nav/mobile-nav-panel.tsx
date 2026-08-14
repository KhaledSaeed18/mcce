import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NavLinkItem } from "@/components/nav/nav-link-item";
import { NAV_PAGE_LINKS } from "@/config/navigation";

const LINK_CLASSES =
  "relative flex w-fit items-center rounded px-3 py-2 font-head text-base after:absolute after:bottom-2 after:left-3 after:right-3 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-[1px] after:bg-primary after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:after:scale-x-100 data-[status=active]:after:scale-x-100";

interface MobileNavPanelProps {
  isOpen: boolean;
  onNavigate: () => void;
  panelId: string;
}

export function MobileNavPanel({
  isOpen,
  onNavigate,
  panelId,
}: MobileNavPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.nav
          animate={{ height: "auto", opacity: 1 }}
          aria-label="Mobile"
          className="overflow-hidden border-b-2 bg-background lg:hidden"
          exit={{ height: 0, opacity: 0 }}
          id={panelId}
          initial={{ height: 0, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 p-4 sm:px-6">
            {NAV_PAGE_LINKS.map((link) => (
              <li key={link.label}>
                <NavLinkItem
                  className={LINK_CLASSES}
                  link={link}
                  onClick={onNavigate}
                />
              </li>
            ))}
          </ul>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
