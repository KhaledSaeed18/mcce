import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { useCallback, useState } from "react";
import { CcePlanYearPanel } from "@/components/cce/cce-plan-year";
import { TextLink } from "@/components/text-link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CCE_PROGRAMS } from "@/config/cce/programs";
import { getCcePlanCredits } from "@/lib/cce/credits";

export function CcePlanSection() {
  const [track, setTrack] = useState<string>(CCE_PROGRAMS[0].id);

  const handleValueChange = useCallback(
    (value: unknown) => setTrack(value as string),
    []
  );

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="font-head text-xl sm:text-2xl">Plan of study</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Every course on each track, by year and semester, with the credits,
          prerequisites, and corequisites the department publishes. Course codes
          in the prerequisite columns that do not appear on the plan, such as
          ENGL101 or MATH160, are placement and foundation courses taken before
          the major sequence starts.
        </p>
      </div>

      <Tabs className="gap-6" onValueChange={handleValueChange} value={track}>
        <TabsList className="max-w-full overflow-x-auto">
          {CCE_PROGRAMS.map((program) => (
            <TabsTrigger key={program.id} value={program.id}>
              {program.abbreviation}, {program.shortLabel}
            </TabsTrigger>
          ))}
        </TabsList>

        {CCE_PROGRAMS.map((program) => (
          // Kept mounted so both plans ship in the server-rendered HTML rather
          // than only the track that happens to be selected.
          <TabsPrimitive.Panel
            className="flex flex-1 flex-col gap-10 outline-none"
            keepMounted
            key={program.id}
            value={program.id}
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-head text-lg sm:text-xl">
                {program.degree} plan of study
              </h3>
              <p className="text-muted-foreground text-sm">
                {getCcePlanCredits(program.plan)} credits.{" "}
                <TextLink href={program.links.planOfStudy}>
                  Official plan of study (PDF)
                </TextLink>
              </p>
            </div>

            {program.plan.map((year) => (
              <CcePlanYearPanel key={year.id} year={year} />
            ))}
          </TabsPrimitive.Panel>
        ))}
      </Tabs>
    </section>
  );
}
