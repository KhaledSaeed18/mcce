import type { ComponentProps } from "react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof Button>;
type ButtonPointerEvent = Parameters<
  NonNullable<ButtonProps["onPointerDown"]>
>[0];

type ThumbnailCorner =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

const CORNER_CLASS: Record<ThumbnailCorner, string> = {
  "bottom-left": "-bottom-1 -left-2",
  "bottom-right": "-bottom-1 -right-2",
  "top-left": "-top-2 -left-2",
  "top-right": "-top-2 -right-2",
};

interface PageThumbnailActionProps
  extends Omit<ButtonProps, "size" | "variant"> {
  corner: ThumbnailCorner;
  /** Kept in view on the page being read, and on hover for the rest. */
  isActive: boolean;
  label: string;
  variant?: "default" | "destructive";
}

/** One of the things that can be done to a page, tucked into a corner of it.
 * Other props pass through, so a menu can open from it. */
export function PageThumbnailAction({
  className,
  corner,
  isActive,
  label,
  onPointerDown,
  variant = "default",
  ...props
}: PageThumbnailActionProps) {
  /** Reaching for a button on the page is not the start of carrying it somewhere. */
  const handlePointerDown = useCallback(
    (event: ButtonPointerEvent) => {
      event.stopPropagation();
      onPointerDown?.(event);
    },
    [onPointerDown]
  );

  return (
    <Button
      {...props}
      aria-label={label}
      className={cn(
        "absolute z-10 size-7 bg-card p-0 text-card-foreground opacity-0 shadow-xs transition-opacity focus-visible:opacity-100 group-hover:opacity-100 data-popup-open:opacity-100",
        variant === "destructive"
          ? "hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm"
          : "hover:bg-primary hover:text-primary-foreground hover:shadow-sm",
        CORNER_CLASS[corner],
        isActive && "opacity-100",
        className
      )}
      onPointerDown={handlePointerDown}
      size="icon"
      title={label}
      variant="outline"
    />
  );
}
