import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PageTeaser } from "@/config/page-teasers";
import { cn } from "@/lib/utils";

const CARD_CLASSES = cn(
  "flex h-full cursor-pointer flex-col justify-between border-2 shadow-md transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none"
);

interface PageTeaserCardProps {
  teaser: PageTeaser;
}

export function PageTeaserCard({ teaser }: PageTeaserCardProps) {
  const Icon = teaser.icon;

  return (
    <Link to={teaser.to}>
      <Card className={CARD_CLASSES}>
        <CardHeader>
          <div
            className="flex size-10 items-center justify-center rounded border-2 border-black"
            style={{ backgroundColor: `var(--${teaser.color})` }}
          >
            <Icon className="size-5" />
          </div>
          <CardTitle>{teaser.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-muted-foreground text-sm">{teaser.description}</p>
          <span className="inline-flex items-center gap-1.5 font-head text-sm group-hover/card:text-primary">
            {teaser.label}
            <ArrowRightIcon className="size-3.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
