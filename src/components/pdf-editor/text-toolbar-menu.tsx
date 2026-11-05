import { ChevronDownIcon } from "lucide-react";
import { type MouseEvent, type ReactNode, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type {
  TextToolbarMenuId,
  TextToolbarMenus,
} from "@/hooks/use-text-toolbar-menus";
import { preventFocus } from "@/lib/prevent-focus";
import { cn } from "@/lib/utils";

interface TextToolbarMenuProps {
  children: ReactNode;
  id: TextToolbarMenuId;
  label: string;
  menus: TextToolbarMenus;
  trigger: ReactNode;
}

/** A small menu held inside the toolbar's own box rather than in a portal, so a
 * press in it still counts as a press on the toolbar and text stays open. */
export function TextToolbarMenu({
  children,
  id,
  label,
  menus,
  trigger,
}: TextToolbarMenuProps) {
  const { openMenu, opensUp, toggle } = menus;
  const isOpen = openMenu === id;
  const handleToggle = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => toggle(id, event),
    [id, toggle]
  );

  return (
    <div className="relative">
      <Button
        aria-expanded={isOpen}
        aria-label={label}
        className="gap-1 px-1.5"
        onClick={handleToggle}
        onMouseDown={preventFocus}
        size="sm"
        title={label}
        type="button"
        variant="ghost"
      >
        {trigger}
        <ChevronDownIcon className="size-3" />
      </Button>
      {isOpen ? (
        <div
          className={cn(
            "bg-card absolute left-0 z-10 w-max rounded border-2 p-2 shadow-md",
            opensUp ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
