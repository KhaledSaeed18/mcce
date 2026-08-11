import { ArrowUpIcon } from "lucide-react";
import { useCallback } from "react";
import { FooterBottomBar } from "@/components/footer/footer-bottom-bar";
import { FooterBrand } from "@/components/footer/footer-brand";
import { FooterNav } from "@/components/footer/footer-nav";
import { FooterSeal } from "@/components/footer/footer-seal";
import { FooterWordmark } from "@/components/footer/footer-wordmark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";

export function SiteFooter() {
  const [playClick] = useSound(clickSoftSound, { volume: 0.4 });

  const handleBackToTop = useCallback(() => {
    playClick();
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [playClick]);

  return (
    <footer className="mt-10 flex flex-col sm:mt-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative flex flex-col gap-6 rounded-t border-x-2 border-t-2 bg-card p-4 shadow-md sm:p-6">
          <div
            aria-hidden="true"
            className="absolute -top-9 left-1/2 size-[72px] -translate-x-1/2 rotate-[-8deg] rounded-full shadow-md sm:-top-10 sm:size-20"
          >
            <FooterSeal className="size-full" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 sm:mt-0">
            <Badge className="h-7" variant="outline">
              <span className="size-1.5 rounded-full bg-primary" />
              AUTO-SYNCED FROM DRIVE
            </Badge>
            <Button
              aria-label="Back to top"
              className="h-7"
              onClick={handleBackToTop}
              size="sm"
              variant="outline"
            >
              <ArrowUpIcon data-icon="inline-start" />
              <span className="hidden sm:inline">Back to top</span>
            </Button>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
            <FooterBrand />
            <FooterNav />
          </div>
        </div>
      </div>

      <FooterWordmark />

      <FooterBottomBar />
    </footer>
  );
}
