import { useCallback } from "react";
import { CurriculumRoadmap } from "@/components/curriculum/curriculum-roadmap";
import { CurriculumYearPanel } from "@/components/curriculum/curriculum-year-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CurriculumYear } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

export const FULL_PROGRAM_TAB_ID = "full-program";
const FULL_PROGRAM_TAB_LABEL = "Full Program";
const ROADMAP_TAB_ID = "roadmap";
const ROADMAP_TAB_LABEL = "Roadmap";

interface CurriculumYearTabsProps {
  materialsMap: Map<string, CourseSummary>;
  onSelectCourse: (code: string) => void;
  onTabChange: (tab: string) => void;
  tab: string;
  years: CurriculumYear[];
}

export function CurriculumYearTabs({
  materialsMap,
  onSelectCourse,
  onTabChange,
  tab,
  years,
}: CurriculumYearTabsProps) {
  const handleValueChange = useCallback(
    (value: unknown) => onTabChange(value as string),
    [onTabChange]
  );

  if (years.length === 0) {
    return null;
  }

  return (
    <Tabs className="gap-6" onValueChange={handleValueChange} value={tab}>
      <TabsList className="max-w-full overflow-x-auto">
        <TabsTrigger value={FULL_PROGRAM_TAB_ID}>
          {FULL_PROGRAM_TAB_LABEL}
        </TabsTrigger>
        {years.map((year) => (
          <TabsTrigger key={year.id} value={year.id}>
            {year.label}
          </TabsTrigger>
        ))}
        <TabsTrigger value={ROADMAP_TAB_ID}>{ROADMAP_TAB_LABEL}</TabsTrigger>
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

      <TabsContent value={ROADMAP_TAB_ID}>
        <CurriculumRoadmap onSelectCourse={onSelectCourse} years={years} />
      </TabsContent>
    </Tabs>
  );
}
