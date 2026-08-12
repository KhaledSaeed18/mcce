import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NavLinkItem } from "@/components/nav/nav-link-item";
import { NAV_BROWSE_LINKS, NAV_PAGE_LINKS } from "@/config/navigation";

const MOBILE_LINKS = [...NAV_BROWSE_LINKS, ...NAV_PAGE_LINKS];

const LINK_CLASSES =
  "flex w-fit items-center rounded px-3 py-2.5 font-head text-base underline decoration-2 underline-offset-4 decoration-transparent transition-colors duration-150 hover:decoration-current data-[status=active]:decoration-current";

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
            {MOBILE_LINKS.map((link) => (
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
