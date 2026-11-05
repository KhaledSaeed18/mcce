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
      <div className="bg-card overflow-x-auto rounded-lg border-2 shadow-md">
        <table className="w-full text-sm">
          <thead className="border-b-2 text-left">
            <tr>
              <th className="font-head px-3 py-2" scope="col">
                Stage
              </th>
              <th className="font-head px-3 py-2" scope="col">
                Term
              </th>
              <th className="font-head px-3 py-2" scope="col">
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
                  <td className="text-muted-foreground px-3 py-2">
                    {THESIS_TERM_LABELS[stage.term]}
                  </td>
                  <td className="px-3 py-2">
                    {pick ? (
                      <a
                        className="hover:text-primary underline underline-offset-4"
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
