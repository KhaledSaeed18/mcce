import { ArrowRightIcon, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TILE_CLASSES = "flex h-full flex-col border-2 shadow-md";
const INTERACTIVE_CLASSES = cn(
  "cursor-pointer transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none"
);

interface FeatureTileProps {
  children?: ReactNode;
  className?: string;
  color: string;
  description: string;
  icon: LucideIcon;
  interactive?: boolean;
  linkLabel?: string;
  title: string;
}

export function FeatureTile({
  children,
  className,
  color,
  description,
  icon: Icon,
  interactive = false,
  linkLabel,
  title,
}: FeatureTileProps) {
  return (
    <Card
      className={cn(
        TILE_CLASSES,
        interactive && INTERACTIVE_CLASSES,
        className
      )}
    >
      <CardHeader>
        <div
          className="flex size-10 items-center justify-center rounded border-2 border-black text-black"
          style={{ backgroundColor: `var(--${color})` }}
        >
          <Icon className="size-5" />
        </div>
        <CardTitle className="font-head text-base sm:text-lg">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-muted-foreground text-sm">{description}</p>

        {children}

        {linkLabel ? (
          <span className="mt-auto inline-flex items-center gap-1.5 font-head text-sm group-hover/card:text-primary">
            {linkLabel}
            <ArrowRightIcon className="size-3.5" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
