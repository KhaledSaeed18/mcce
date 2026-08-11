import { LogoMark } from "@/components/logo-mark";
import { FOOTER_TAGLINE } from "@/config/footer";

export function FooterBrand() {
  return (
    <div className="flex max-w-xs flex-col gap-4">
      <div className="flex items-center gap-2 font-head text-xl">
        <LogoMark />
        MCCE
      </div>

      <p className="text-muted-foreground text-sm">{FOOTER_TAGLINE}</p>
    </div>
  );
}
