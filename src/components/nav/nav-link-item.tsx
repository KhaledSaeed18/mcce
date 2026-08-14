import { Link } from "@tanstack/react-router";
import type { NavLink } from "@/config/navigation";

export const NAV_LINK_CLASSES =
  "relative rounded px-3 py-1.5 font-head text-sm after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-[1px] after:bg-primary after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:after:scale-x-100 data-[status=active]:after:scale-x-100";

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
  return (
    <Link className={className} onClick={onClick} to={link.to}>
      {link.label}
    </Link>
  );
}
