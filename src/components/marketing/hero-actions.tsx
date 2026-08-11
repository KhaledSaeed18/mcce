import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const MATERIALS_SECTION_HREF = "#materials";

export function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        nativeButton={false}
        render={<a href={MATERIALS_SECTION_HREF} />}
        size="lg"
      >
        Browse materials
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button
        nativeButton={false}
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
