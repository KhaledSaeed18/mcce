import { FooterDriveLinks } from "@/components/footer/footer-drive-links";
import { LogoMark } from "@/components/logo-mark";
import { FOOTER_TAGLINE } from "@/config/footer";

export function FooterBrand() {
  return (
    <div className="flex max-w-xs flex-col gap-4">
      <div className="font-head flex items-center gap-2 text-xl">
        <LogoMark />
        MCCE
      </div>

      <p className="text-muted-foreground text-sm">{FOOTER_TAGLINE}</p>

      <FooterDriveLinks />
    </div>
  );
}
