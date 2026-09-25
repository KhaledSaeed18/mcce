import {
  CalendarClockIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkFactsProps {
  perk: StudentPerk;
}

const FACTS = [
  { icon: CalendarClockIcon, key: "duration", label: "Duration" },
  { icon: CreditCardIcon, key: "price", label: "Price" },
  { icon: ShieldCheckIcon, key: "verification", label: "Check" },
] as const;

export function StudentPerkFacts({ perk }: StudentPerkFactsProps) {
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {FACTS.map((fact) => (
        <div
          className="flex flex-col gap-1 rounded-lg border-2 bg-card p-4 shadow-md"
          key={fact.key}
        >
          <dt className="inline-flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
            <fact.icon aria-hidden="true" className="size-3.5" />
            {fact.label}
          </dt>
          <dd className="font-head text-sm">{perk[fact.key]}</dd>
        </div>
      ))}
    </dl>
  );
}
