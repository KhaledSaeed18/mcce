import { Link } from "@tanstack/react-router";
import { ChevronDownIcon } from "lucide-react";
import { NAV_LINK_CLASSES } from "@/components/nav/nav-link-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_BROWSE_LINKS } from "@/config/navigation";
import { cn } from "@/lib/utils";

const TRIGGER_CLASSES = cn(
  NAV_LINK_CLASSES,
  "flex items-center gap-1 data-popup-open:decoration-current"
);

export function BrowseNavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={TRIGGER_CLASSES}>
        Browse
        <ChevronDownIcon className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {NAV_BROWSE_LINKS.map((link) =>
          link.to === "/browse/$folderId" ? (
            <DropdownMenuLinkItem
              key={link.label}
              render={
                <Link params={{ folderId: link.folderId }} to={link.to} />
              }
            >
              {link.label}
            </DropdownMenuLinkItem>
          ) : null
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
