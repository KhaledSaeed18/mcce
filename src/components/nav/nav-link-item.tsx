import { Link } from "@tanstack/react-router";
import type { NavLink } from "@/config/navigation";

export const NAV_LINK_CLASSES =
  "rounded px-3 py-1.5 font-head text-sm underline decoration-2 underline-offset-4 decoration-transparent transition-colors duration-150 hover:decoration-current data-[status=active]:decoration-current";

interface NavLinkItemProps {
  className?: string;
  link: NavLink;
  onClick?: () => void;
}

export function NavLinkItem({
  className = NAV_LINK_CLASSES,
  link,
  onClick,
}: NavLinkItemProps) {
  if (link.to === "/browse/$folderId") {
    return (
      <Link
        className={className}
        onClick={onClick}
        params={{ folderId: link.folderId }}
        to={link.to}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <Link className={className} onClick={onClick} to={link.to}>
      {link.label}
    </Link>
  );
}
