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
            className="group bg-card rounded-lg border-2 p-4 shadow-md"
            key={entry.question}
          >
            <summary className="font-head cursor-pointer text-base">
              {entry.question}
            </summary>
            <p className="text-muted-foreground pt-2 text-sm">{entry.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
