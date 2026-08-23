import { ArrowRightIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";

const MATERIALS_SECTION_HREF = "#materials";

export function HeroActions() {
  const [playClick] = useSound(clickSoftSound, { volume: 0.4 });
  const handleClick = useCallback(() => playClick(), [playClick]);

  return (
    <Button
      className="w-full sm:w-fit"
      nativeButton={false}
      onClick={handleClick}
      render={<a href={MATERIALS_SECTION_HREF} />}
      size="lg"
    >
      Browse materials
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  );
}
