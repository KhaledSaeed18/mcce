import {
  THESIS_STAGES,
  THESIS_TERM_LABELS,
} from "@/config/resources/thesis-stages";
import type { ResourceEntry } from "@/lib/resources/types";

interface ThesisDefaultStackProps {
  toolsById: ReadonlyMap<string, ResourceEntry>;
}

/** One recommendation per stage, for the student who wants a default rather than a menu. */
export function ThesisDefaultStack({ toolsById }: ThesisDefaultStackProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-head text-lg sm:text-xl">The default stack</h2>
      <div className="overflow-x-auto rounded-lg border-2 bg-card shadow-md">
        <table className="w-full text-sm">
          <thead className="border-b-2 text-left">
            <tr>
              <th className="px-3 py-2 font-head" scope="col">
                Stage
              </th>
              <th className="px-3 py-2 font-head" scope="col">
                Term
              </th>
              <th className="px-3 py-2 font-head" scope="col">
                Default pick
              </th>
            </tr>
          </thead>
          <tbody>
            {THESIS_STAGES.map((stage) => {
              const pick = toolsById.get(stage.defaultPick);
              return (
                <tr className="border-b last:border-b-0" key={stage.id}>
                  <td className="px-3 py-2">{stage.label}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {THESIS_TERM_LABELS[stage.term]}
                  </td>
                  <td className="px-3 py-2">
                    {pick ? (
                      <a
                        className="underline underline-offset-4 hover:text-primary"
                        href={pick.url}
                        rel="noopener"
                        target="_blank"
                      >
                        {pick.name}
                      </a>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
