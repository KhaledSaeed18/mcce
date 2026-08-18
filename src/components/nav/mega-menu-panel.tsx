import { motion } from "motion/react";
import { MegaMenuCard } from "@/components/nav/mega-menu-card";
import { NAV_CARD_GROUP_VARIANTS, NAV_CARD_VARIANTS } from "@/config/motion";
import {
  MEGA_MENU_TWO_COLUMN_THRESHOLD,
  type NavGroup,
} from "@/config/navigation";
import { cn } from "@/lib/utils";

interface MegaMenuPanelProps {
  group: NavGroup;
}

export function MegaMenuPanel({ group }: MegaMenuPanelProps) {
  const Icon = group.icon;
  const isWide = group.entries.length > MEGA_MENU_TWO_COLUMN_THRESHOLD;

  return (
    <div className="flex gap-5 p-4">
      <div className="flex w-44 shrink-0 flex-col gap-2 border-r-2 pr-5">
        <span
          className="flex size-9 items-center justify-center rounded border-2 border-black"
          style={{ backgroundColor: `var(--${group.color})` }}
        >
          <Icon className="size-5 text-black" />
        </span>
        <h2 className="font-head text-xl">{group.label}</h2>
        <p className="text-muted-foreground text-xs leading-snug">
          {group.tagline}
        </p>
        <span className="mt-auto font-head text-muted-foreground text-xs">
          {group.entries.length} pages
        </span>
      </div>

      <motion.ul
        animate="visible"
        className={cn(
          "grid flex-1 gap-1",
          isWide ? "w-[34rem] grid-cols-2" : "w-72 grid-cols-1"
        )}
        initial="hidden"
        variants={NAV_CARD_GROUP_VARIANTS}
      >
        {group.entries.map((entry) => (
          <motion.li key={entry.label} variants={NAV_CARD_VARIANTS}>
            <MegaMenuCard color={group.color} entry={entry} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
