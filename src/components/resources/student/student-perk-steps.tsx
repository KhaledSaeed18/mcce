import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkStepsProps {
  perk: StudentPerk;
}

export function StudentPerkSteps({ perk }: StudentPerkStepsProps) {
  return (
    <section aria-labelledby="steps" className="flex flex-col gap-4">
      <h2 className="font-head text-2xl" id="steps">
        Claim it in {perk.steps.length} steps
      </h2>
      <ol className="flex flex-col gap-3">
        {perk.steps.map((step, index) => (
          <li
            className="flex gap-4 rounded-lg border-2 bg-card p-4 shadow-md"
            key={step.title}
          >
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black bg-primary font-head text-sm"
            >
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-head text-base">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
