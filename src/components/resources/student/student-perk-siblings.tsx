import { Link } from "@tanstack/react-router";
import { STUDENT_PERKS } from "@/config/resources/student-perks";
import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkSiblingsProps {
  perk: StudentPerk;
}

export function StudentPerkSiblings({ perk }: StudentPerkSiblingsProps) {
  const others = STUDENT_PERKS.filter((item) => item.id !== perk.id);

  return (
    <nav aria-label="Other student plans" className="flex flex-col gap-3">
      <h2 className="font-head text-2xl">Other plans</h2>
      <div className="flex flex-wrap gap-3">
        {others.map((item) => (
          <Link
            className="inline-flex items-center gap-1.5 rounded border-2 bg-card px-3 py-2 font-head text-sm shadow-sm transition hover:-translate-y-0.5"
            key={item.id}
            params={{ perkId: item.id }}
            to="/resources/student/$perkId"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
