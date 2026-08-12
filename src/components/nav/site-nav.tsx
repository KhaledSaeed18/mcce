import { BrowseNavMenu } from "@/components/nav/browse-nav-menu";
import { NavLinkItem } from "@/components/nav/nav-link-item";
import { NAV_PAGE_LINKS } from "@/config/navigation";

export function SiteNav() {
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      <BrowseNavMenu />
      {NAV_PAGE_LINKS.map((link) => (
        <NavLinkItem key={link.label} link={link} />
      ))}
    </nav>
  );
}
