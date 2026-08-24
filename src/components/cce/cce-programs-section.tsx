import { CceProgramCard } from "@/components/cce/cce-program-card";
import { CCE_PROGRAMS } from "@/config/cce/programs";

export function CceProgramsSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-head text-xl sm:text-2xl">
        The two CCE bachelor programs
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {CCE_PROGRAMS.map((program) => (
          <CceProgramCard key={program.id} program={program} />
        ))}
      </div>
    </section>
  );
}
