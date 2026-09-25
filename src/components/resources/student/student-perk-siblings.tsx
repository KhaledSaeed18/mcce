import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { RESOURCES_STUDENT_PATH } from "@/config/resources/copy";
import { STUDENT_PERKS } from "@/config/resources/student-perks";
import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkSiblingsProps {
  perk: StudentPerk;
}

export function StudentPerkSiblings({ perk }: StudentPerkSiblingsProps) {
  const others = STUDENT_PERKS.filter((item) => item.id !== perk.id);

  return (
    <nav aria-label="Other student plans" className="flex flex-col gap-3">
      <h2 className="font-head text-2xl">The other two</h2>
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
      <Link
        className="inline-flex w-fit items-center gap-1.5 text-sm underline underline-offset-4 hover:text-primary"
        to={RESOURCES_STUDENT_PATH}
      >
        <ArrowLeftIcon aria-hidden="true" className="size-4" />
        All student plans
      </Link>
    </nav>
  );
}
