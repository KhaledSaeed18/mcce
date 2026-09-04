import type { PointerEvent, ReactNode } from "react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThumbnailCorner = "bottom-left" | "top-left" | "top-right";

const CORNER_CLASS: Record<ThumbnailCorner, string> = {
  "bottom-left": "-bottom-1 -left-2",
  "top-left": "-top-2 -left-2",
  "top-right": "-top-2 -right-2",
};

interface PageThumbnailActionProps {
  children: ReactNode;
  corner: ThumbnailCorner;
  /** Kept in view on the page being read, and on hover for the rest. */
  isActive: boolean;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
}

/** One of the things that can be done to a page, tucked into a corner of it. */
export function PageThumbnailAction({
  children,
  corner,
  isActive,
  label,
  onClick,
  variant = "default",
}: PageThumbnailActionProps) {
  /** Reaching for a button on the page is not the start of carrying it somewhere. */
  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => event.stopPropagation(),
    []
  );

  return (
    <Button
      aria-label={label}
      className={cn(
        "absolute z-10 size-7 bg-card p-0 text-card-foreground opacity-0 shadow-xs transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
        variant === "destructive"
          ? "hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm"
          : "hover:bg-primary hover:text-primary-foreground hover:shadow-sm",
        CORNER_CLASS[corner],
        isActive && "opacity-100"
      )}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      size="icon"
      title={label}
      variant="outline"
    >
      {children}
    </Button>
  );
}
