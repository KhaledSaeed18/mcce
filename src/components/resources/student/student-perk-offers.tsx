import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkOffersProps {
  perk: StudentPerk;
}

export function StudentPerkOffers({ perk }: StudentPerkOffersProps) {
  if (!perk.offerGroups?.length) {
    return null;
  }
  return (
    <section aria-labelledby="offers" className="flex flex-col gap-4">
      <h2 className="font-head text-2xl" id="offers">
        {perk.offersTitle ?? "Included"}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {perk.offerGroups.map((group) => (
          <article
            className="flex flex-col gap-2 rounded-lg border-2 bg-card p-4 shadow-md"
            key={group.title}
          >
            <h3 className="font-head text-base">{group.title}</h3>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground text-sm">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {perk.allOffers ? (
        <p className="text-muted-foreground text-sm">
          <a
            className="underline underline-offset-4 hover:text-primary"
            href={perk.allOffers.href}
            rel="noopener"
            target="_blank"
          >
            {perk.allOffers.label}
          </a>{" "}
          to check every included tool and benefit.
        </p>
      ) : null}
    </section>
  );
}
