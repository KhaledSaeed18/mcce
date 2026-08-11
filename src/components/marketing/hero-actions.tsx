import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";

const MATERIALS_SECTION_HREF = "#materials";

export function HeroActions() {
  const [playClick] = useSound(clickSoftSound, { volume: 0.4 });
  const handleClick = useCallback(() => playClick(), [playClick]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        nativeButton={false}
        onClick={handleClick}
        render={<a href={MATERIALS_SECTION_HREF} />}
        size="lg"
      >
        Browse materials
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button
        nativeButton={false}
        onClick={handleClick}
        render={<Link search={{ q: "" }} to="/search" />}
        size="lg"
        variant="outline"
      >
        <SearchIcon data-icon="inline-start" />
        Search files
      </Button>
    </div>
  );
}
