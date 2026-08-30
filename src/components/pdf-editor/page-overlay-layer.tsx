import type { ReactNode } from "react";
import { getRotationTransform } from "@/lib/pdf-editor/rotation";
import type { PageSize } from "@/lib/pdf-editor/types";

interface PageOverlayLayerProps {
  children: ReactNode;
  rotation: number;
  /** The page upright, which is the space the overlays place themselves in. */
  size: PageSize;
  zoom: number;
}

/**
 * Turns the overlays with the page. They position themselves in the page's
 * upright space, the same one the markup is held in, so a turned page only
 * needs that whole space turned rather than every overlay taught about it.
 */
export function PageOverlayLayer({
  children,
  rotation,
  size,
  zoom,
}: PageOverlayLayerProps) {
  const { tx, ty } = getRotationTransform(size, rotation);

  return (
    <div
      /* The layer covers the whole page, so only what it holds takes a pointer. */
      className="pointer-events-none absolute top-0 left-0"
      style={{
        height: size.height * zoom,
        transform: `translate(${tx * zoom}px, ${ty * zoom}px) rotate(${rotation}deg)`,
        transformOrigin: "0 0",
        width: size.width * zoom,
      }}
    >
      {children}
    </div>
  );
}
