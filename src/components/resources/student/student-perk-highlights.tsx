import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkHighlightsProps {
  perk: StudentPerk;
}

export function StudentPerkHighlights({ perk }: StudentPerkHighlightsProps) {
  return (
    <section aria-labelledby="includes" className="flex flex-col gap-4">
      <h2 className="font-head text-2xl" id="includes">
        What is inside
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {perk.highlights.map((item) => (
          <article
            className="flex flex-col gap-1 rounded-lg border-2 bg-card p-4 shadow-md"
            key={item.title}
          >
            <h3 className="font-head text-base">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
