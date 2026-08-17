import { FaqLeaf } from "@/components/faq/faq-leaf";
import { FaqLeafDark } from "@/components/faq/faq-leaf-dark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroDecoration } from "@/components/marketing/page-hero-decoration";

export function FaqHero() {
  return (
    <PageHero
      badge="FAQ"
      decoration={
        <PageHeroDecoration
          dark={<FaqLeafDark />}
          light={<FaqLeaf />}
          width="w-24"
        />
      }
      description="What the program covers, and how this materials index works."
      highlight="answered."
      title="Questions,"
    />
  );
}
