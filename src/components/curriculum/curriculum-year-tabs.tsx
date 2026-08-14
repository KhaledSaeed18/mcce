import { CurriculumYearPanel } from "@/components/curriculum/curriculum-year-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CurriculumYear } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

const FULL_PROGRAM_TAB_ID = "full-program";
const FULL_PROGRAM_TAB_LABEL = "Full Program";

interface CurriculumYearTabsProps {
  materialsMap: Map<string, CourseSummary>;
  onSelectCourse: (code: string) => void;
  years: CurriculumYear[];
}

export function CurriculumYearTabs({
  materialsMap,
  onSelectCourse,
  years,
}: CurriculumYearTabsProps) {
  const [firstYear] = years;

  if (years.length <= 1) {
    return firstYear ? (
      <CurriculumYearPanel
        materialsMap={materialsMap}
        onSelectCourse={onSelectCourse}
        year={firstYear}
      />
    ) : null;
  }

  return (
    <Tabs defaultValue={FULL_PROGRAM_TAB_ID}>
      <TabsList>
        <TabsTrigger value={FULL_PROGRAM_TAB_ID}>
          {FULL_PROGRAM_TAB_LABEL}
        </TabsTrigger>
        {years.map((year) => (
          <TabsTrigger key={year.id} value={year.id}>
            {year.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={FULL_PROGRAM_TAB_ID}>
        <div className="flex flex-col gap-10">
          {years.map((year) => (
            <CurriculumYearPanel
              key={year.id}
              materialsMap={materialsMap}
              onSelectCourse={onSelectCourse}
              year={year}
            />
          ))}
        </div>
      </TabsContent>

      {years.map((year) => (
        <TabsContent key={year.id} value={year.id}>
          <CurriculumYearPanel
            materialsMap={materialsMap}
            onSelectCourse={onSelectCourse}
            year={year}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
