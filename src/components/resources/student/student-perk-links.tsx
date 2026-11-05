import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkLinksProps {
  perk: StudentPerk;
}

export function StudentPerkLinks({ perk }: StudentPerkLinksProps) {
  return (
    <section aria-labelledby="links" className="flex flex-col gap-3">
      <h2 className="font-head text-2xl" id="links">
        Official links
      </h2>
      <ul className="flex flex-col gap-2 text-sm">
        <li>
          <a
            className="hover:text-primary underline underline-offset-4"
            href={perk.applyUrl}
            rel="noopener"
            target="_blank"
          >
            {perk.applyLabel}
          </a>
        </li>
        <li>
          <a
            className="hover:text-primary underline underline-offset-4"
            href={perk.docsUrl}
            rel="noopener"
            target="_blank"
          >
            Terms and eligibility
          </a>
        </li>
        {perk.allOffers ? (
          <li>
            <a
              className="hover:text-primary underline underline-offset-4"
              href={perk.allOffers.href}
              rel="noopener"
              target="_blank"
            >
              {perk.allOffers.label}
            </a>
            <span className="text-muted-foreground">
              {" "}
              ({perk.allOffers.note})
            </span>
          </li>
        ) : null}
        {perk.supportUrl ? (
          <li>
            <a
              className="hover:text-primary underline underline-offset-4"
              href={perk.supportUrl}
              rel="noopener"
              target="_blank"
            >
              Support page
            </a>
          </li>
        ) : null}
        {perk.supportEmail ? (
          <li>
            <a
              className="hover:text-primary underline underline-offset-4"
              href={`mailto:${perk.supportEmail}`}
            >
              {perk.supportEmail}
            </a>
          </li>
        ) : null}
      </ul>
    </section>
  );
}
