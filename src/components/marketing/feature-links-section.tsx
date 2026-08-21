import { motion } from "motion/react";
import { FeatureLinkCard } from "@/components/marketing/feature-link-card";
import { FEATURE_CARDS } from "@/config/features";
import { useReveal } from "@/hooks/use-reveal";

export function FeatureLinksSection() {
  const reveal = useReveal();

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      {...reveal.group}
    >
      {FEATURE_CARDS.map((item) => (
        <motion.div key={item.to} {...reveal.item}>
          <FeatureLinkCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
