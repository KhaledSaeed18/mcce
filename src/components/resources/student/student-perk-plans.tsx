import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkPlansProps {
  perk: StudentPerk;
}

export function StudentPerkPlans({ perk }: StudentPerkPlansProps) {
  if (!perk.plans?.length) {
    return null;
  }
  return (
    <section aria-labelledby="plans" className="flex flex-col gap-4">
      <h2 className="font-head text-2xl" id="plans">
        Plans
      </h2>
      <div className="grid gap-3 lg:grid-cols-3">
        {perk.plans.map((plan) => (
          <article
            className="flex flex-col gap-3 rounded-lg border-2 bg-card p-4 shadow-md"
            key={plan.name}
          >
            <div>
              <h3 className="font-head text-lg">{plan.name}</h3>
              <p className="font-medium text-primary text-sm">{plan.price}</p>
              <p className="text-muted-foreground text-xs">{plan.after}</p>
            </div>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground text-sm">
              {plan.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
