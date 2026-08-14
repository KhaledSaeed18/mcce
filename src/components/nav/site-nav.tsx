import { NavLinkItem } from "@/components/nav/nav-link-item";
import { NAV_PAGE_LINKS } from "@/config/navigation";

export function SiteNav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {NAV_PAGE_LINKS.map((link) => (
        <NavLinkItem key={link.label} link={link} />
      ))}
    </nav>
  );
}
