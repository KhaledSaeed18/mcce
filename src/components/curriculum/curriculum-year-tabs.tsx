import { CurriculumYearPanel } from "@/components/curriculum/curriculum-year-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CurriculumYear } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

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
      <div className="flex flex-col gap-6">
        <h2 className="font-head text-2xl sm:text-3xl">{firstYear.label}</h2>
        <CurriculumYearPanel
          materialsMap={materialsMap}
          onSelectCourse={onSelectCourse}
          year={firstYear}
        />
      </div>
    ) : null;
  }

  return (
    <Tabs defaultValue={firstYear?.id}>
      <TabsList>
        {years.map((year) => (
          <TabsTrigger key={year.id} value={year.id}>
            {year.label}
          </TabsTrigger>
        ))}
      </TabsList>
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
