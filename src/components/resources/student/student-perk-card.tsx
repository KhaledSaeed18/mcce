import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StudentPerk } from "@/lib/student-perks/types";
import { cn } from "@/lib/utils";

interface StudentPerkCardProps {
  featured?: boolean;
  perk: StudentPerk;
}

export function StudentPerkCard({ featured, perk }: StudentPerkCardProps) {
  return (
    <Link
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-lg border-2 bg-card p-5 pt-6 shadow-md transition duration-200",
        "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
        "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      )}
      params={{ perkId: perk.id }}
      to="/resources/student/$perkId"
    >
      {featured ? (
        <span className="absolute -top-3 right-4 inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded border-2 border-black bg-primary px-2 py-0.5 font-head text-xs shadow-sm">
          <BadgeCheckIcon aria-hidden="true" className="size-3.5" />
          Start here
        </span>
      ) : null}
      <div className="flex items-center gap-3">
        <Badge variant="outline">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ background: `var(--${perk.color})` }}
          />
          {perk.duration}
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-head text-xl leading-tight">{perk.name}</h2>
        <p className="font-medium text-primary text-sm">{perk.tagline}</p>
        <p className="text-muted-foreground text-sm">{perk.description}</p>
      </div>
      <div className="mt-auto flex flex-col gap-3">
        <p className="text-sm">
          <span className="font-medium">{perk.shortValue}</span>
          <span className="text-muted-foreground">, {perk.price}</span>
        </p>
        <span className="inline-flex items-center gap-1 font-head text-sm">
          How to claim
          <ArrowRightIcon
            aria-hidden="true"
            className="size-4 transition group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
