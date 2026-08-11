import { FooterContact } from "@/components/footer/footer-contact";
import { FOOTER_COPYRIGHT, FOOTER_DISCLAIMER } from "@/config/footer";

export function FooterBottomBar() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pt-6 pb-8 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-pretty">
        {FOOTER_COPYRIGHT} · {FOOTER_DISCLAIMER}
      </p>

      <FooterContact />
    </div>
  );
}
