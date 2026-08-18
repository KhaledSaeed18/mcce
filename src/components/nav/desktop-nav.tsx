import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import { MegaMenuPanel } from "@/components/nav/mega-menu-panel";
import { NAV_GROUPS } from "@/config/navigation";
import { useMegaMenu } from "@/hooks/use-mega-menu";

const TRIGGER_CLASSES =
  "group relative flex items-center gap-1 rounded px-3 py-1.5 font-head text-sm transition-colors duration-200 hover:bg-accent data-popup-open:bg-accent after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-[1px] after:bg-primary after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:after:scale-x-100 data-popup-open:after:scale-x-100 data-[active=true]:after:scale-x-100";

const POSITIONER_CLASSES =
  "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:inset-x-0 before:top-[-10px] before:h-2.5 before:content-[''] data-instant:transition-none";

const POPUP_CLASSES =
  "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded border-2 bg-popover text-popover-foreground shadow-xl outline-hidden transition-[opacity,transform,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-95 data-starting-style:opacity-0";

const CONTENT_CLASSES =
  "h-full w-max transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 data-starting-style:data-[activation-direction=left]:-translate-x-1/4 data-starting-style:data-[activation-direction=right]:translate-x-1/4 data-ending-style:data-[activation-direction=left]:translate-x-1/4 data-ending-style:data-[activation-direction=right]:-translate-x-1/4";

export function DesktopNav() {
  const { activeGroupValue, handleValueChange, openValue } = useMegaMenu();

  return (
    <NavigationMenu.Root
      aria-label="Primary"
      className="hidden lg:block"
      onValueChange={handleValueChange}
      value={openValue}
    >
      <NavigationMenu.List className="relative flex items-center gap-1">
        {NAV_GROUPS.map((group) => (
          <NavigationMenu.Item key={group.value} value={group.value}>
            <NavigationMenu.Trigger
              className={TRIGGER_CLASSES}
              data-active={activeGroupValue === group.value}
            >
              <span
                className="size-2 rounded-[1px] border-2 border-black transition-transform duration-200 group-hover:rotate-45 group-data-popup-open:rotate-45"
                style={{ backgroundColor: `var(--${group.color})` }}
              />
              {group.label}
              <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180">
                <ChevronDownIcon className="size-4" />
              </NavigationMenu.Icon>
            </NavigationMenu.Trigger>

            <NavigationMenu.Content className={CONTENT_CLASSES}>
              <MegaMenuPanel group={group} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          align="center"
          className={POSITIONER_CLASSES}
          collisionAvoidance={{ side: "none" }}
          collisionPadding={{ bottom: 12, left: 16, right: 16, top: 8 }}
          sideOffset={10}
        >
          <NavigationMenu.Popup className={POPUP_CLASSES}>
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
