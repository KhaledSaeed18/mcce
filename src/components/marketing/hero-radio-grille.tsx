import { HERO_GRILLE_HOLES } from "@/config/hero-radio";

export function HeroRadioGrille() {
  return (
    <span
      aria-hidden="true"
      className="h-10 min-w-0 flex-1 rounded border-2 border-black opacity-50"
      style={HERO_GRILLE_HOLES}
    />
  );
}
