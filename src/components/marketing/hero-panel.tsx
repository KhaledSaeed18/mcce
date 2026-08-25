import { HeroSearchDemo } from "@/components/marketing/hero-search-demo";
import { Badge } from "@/components/ui/badge";

export function HeroPanel() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded border-2 bg-card shadow-xl"
    >
      <div className="flex items-center justify-between gap-2 border-b-2 px-3 py-2">
        <span className="flex items-center gap-2 font-head text-xs">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Drive index
        </span>
        <Badge className="text-[10px] tracking-wide" variant="secondary">
          auto-synced
        </Badge>
      </div>

      <HeroSearchDemo />
    </div>
  );
}
