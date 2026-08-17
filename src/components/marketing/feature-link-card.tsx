import { Link } from "@tanstack/react-router";
import { FeatureTile } from "@/components/marketing/feature-tile";
import type { FeatureCardItem } from "@/config/features";

interface FeatureLinkCardProps {
  item: FeatureCardItem;
}

export function FeatureLinkCard({ item }: FeatureLinkCardProps) {
  return (
    <Link className="block h-full" to={item.to}>
      <FeatureTile
        color={item.color}
        description={item.description}
        icon={item.icon}
        interactive
        linkLabel={item.label}
        title={item.title}
      />
    </Link>
  );
}
