import { Link } from "@tanstack/react-router";
import { CommandPalette } from "@/components/command-palette";
import { LogoMark } from "@/components/logo-mark";
import { MobileMenuToggle } from "@/components/nav/mobile-menu-toggle";
import { MobileNavPanel } from "@/components/nav/mobile-nav-panel";
import { SiteNav } from "@/components/nav/site-nav";
import { RailLine } from "@/components/page-rails";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useMobileMenu } from "@/hooks/use-mobile-menu";

const MOBILE_NAV_PANEL_ID = "mobile-nav-panel";

export function AppHeader() {
  const { close, isOpen, toggle } = useMobileMenu();

  return (
    <header className="sticky top-0 z-40 border-b-2 bg-background">
      <RailLine side="left" />
      <RailLine side="right" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4 sm:px-6">
        <Link
          className="group flex items-center gap-2 font-head text-lg"
          to="/"
        >
          <LogoMark />
          MCCE
        </Link>
        <SiteNav />
        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeSwitcher />
          <MobileMenuToggle
            isOpen={isOpen}
            onClick={toggle}
            panelId={MOBILE_NAV_PANEL_ID}
          />
        </div>
      </div>
      <MobileNavPanel
        isOpen={isOpen}
        onNavigate={close}
        panelId={MOBILE_NAV_PANEL_ID}
      />
    </header>
  );
}
