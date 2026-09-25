import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkFaqProps {
  perk: StudentPerk;
}

export function StudentPerkFaq({ perk }: StudentPerkFaqProps) {
  return (
    <section aria-labelledby="faq" className="flex flex-col gap-4">
      <h2 className="font-head text-2xl" id="faq">
        Common questions
      </h2>
      <div className="flex flex-col gap-3">
        {perk.faq.map((entry) => (
          <details
            className="group rounded-lg border-2 bg-card p-4 shadow-md"
            key={entry.question}
          >
            <summary className="cursor-pointer font-head text-base">
              {entry.question}
            </summary>
            <p className="pt-2 text-muted-foreground text-sm">{entry.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
