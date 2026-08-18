import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback } from "react";
import { MobileNavRow } from "@/components/nav/mobile-nav-row";
import {
  NAV_GROUP_EXIT_MS,
  NAV_GROUP_TRANSITION,
  NAV_SHEET_GROUP_VARIANTS,
  NAV_SHEET_ROW_VARIANTS,
} from "@/config/motion";
import type { NavGroup } from "@/config/navigation";
import { useDelayedUnmount } from "@/hooks/use-delayed-unmount";
import { cn } from "@/lib/utils";

const INDEX_PAD_LENGTH = 2;

interface MobileNavGroupProps {
  group: NavGroup;
  index: number;
  isActive: boolean;
  isExpanded: boolean;
  onNavigate: () => void;
  onToggle: (value: string) => void;
}

export function MobileNavGroup({
  group,
  index,
  isActive,
  isExpanded,
  onNavigate,
  onToggle,
}: MobileNavGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldRenderPanel = useDelayedUnmount(isExpanded, NAV_GROUP_EXIT_MS);
  const Icon = group.icon;
  const panelId = `mobile-nav-group-${group.value}`;

  const handleToggle = useCallback(
    () => onToggle(group.value),
    [group.value, onToggle]
  );

  return (
    <li className="border-b-2">
      <button
        aria-controls={panelId}
        aria-expanded={isExpanded}
        className="flex w-full items-center gap-3 py-4 text-left"
        onClick={handleToggle}
        type="button"
      >
        <span className="font-head text-muted-foreground text-xs">
          {String(index + 1).padStart(INDEX_PAD_LENGTH, "0")}
        </span>
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded border-2 border-black transition-transform duration-300",
            isExpanded && "-rotate-6 scale-110"
          )}
          style={{ backgroundColor: `var(--${group.color})` }}
        >
          <Icon className="size-4 text-black" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-center gap-2 font-head text-xl">
            {group.label}
            {isActive ? (
              <span className="rounded border-2 bg-primary px-1.5 py-0.5 font-head text-[0.625rem] text-primary-foreground uppercase">
                Here
              </span>
            ) : null}
          </span>
          <span className="truncate text-muted-foreground text-xs">
            {group.entries.length} pages
          </span>
        </span>
        <ChevronDownIcon
          className={cn(
            "size-5 shrink-0 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* initial={false}: the group holding the current page starts open, and
       * animating that open as the menu itself wipes in reads as two competing
       * moves. Later toggles still animate. */}
      {shouldRenderPanel ? (
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              animate={{ height: "auto", opacity: 1 }}
              className="overflow-hidden"
              exit={{ height: 0, opacity: 0 }}
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              key={panelId}
              transition={
                shouldReduceMotion ? { duration: 0 } : NAV_GROUP_TRANSITION
              }
            >
              <motion.ul
                animate="visible"
                className="flex flex-col gap-0.5 pb-4"
                initial={shouldReduceMotion ? "visible" : "hidden"}
                variants={NAV_SHEET_GROUP_VARIANTS}
              >
                {group.entries.map((entry) => (
                  <motion.li
                    key={entry.label}
                    variants={NAV_SHEET_ROW_VARIANTS}
                  >
                    <MobileNavRow
                      color={group.color}
                      entry={entry}
                      onNavigate={onNavigate}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </li>
  );
}
