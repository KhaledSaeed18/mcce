import type { LucideIcon } from "lucide-react";
import type { IconDescriptor } from "@/lib/resources/types";

const ICON_SIZE = 24;

interface ResourceIconProps {
  /** Shown when the descriptor is not a brand file. */
  fallbackIcon: LucideIcon;
  icon: IconDescriptor;
}

/** The name sits next to the tile as text, so the image itself is decorative. */
export function ResourceIcon({
  fallbackIcon: FallbackIcon,
  icon,
}: ResourceIconProps) {
  if (icon.kind === "monogram") {
    return <span className="font-head text-xs">{icon.text}</span>;
  }
  if (icon.kind === "category") {
    return <FallbackIcon aria-hidden="true" className="size-5" />;
  }
  // The tile stays white in both themes, so the light brand file is always the right one.
  return (
    <img
      alt=""
      className="size-6"
      height={ICON_SIZE}
      loading="lazy"
      src={icon.light}
      width={ICON_SIZE}
    />
  );
}
