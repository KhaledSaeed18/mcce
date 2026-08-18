import { useMemo } from "react";
import { GpaCopyLinkButton } from "@/components/gpa/gpa-copy-link-button";
import { GpaExportActions } from "@/components/gpa/gpa-export-actions";
import { GpaExportSectionToggle } from "@/components/gpa/gpa-export-section-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GPA_EXPORT_SECTION_OPTIONS } from "@/config/gpa-export";
import { useGpaExport } from "@/hooks/use-gpa-export";
import { useGpaExportSections } from "@/hooks/use-gpa-export-sections";
import type { GpaTrendPoint } from "@/lib/gpa/chart";
import type { CourseContribution } from "@/lib/gpa/contribution";
import type { GpaSemester } from "@/lib/gpa/entries";
import type { GpaTotals, Projection, TargetOutcome } from "@/lib/gpa/types";

interface GpaExportCardProps {
  contributions: CourseContribution[];
  cumulative: GpaTotals;
  projection: Projection | null;
  semesters: GpaSemester[];
  target: TargetOutcome | null;
  targetGpa: number;
  trend: GpaTrendPoint[];
}

export function GpaExportCard({
  contributions,
  cumulative,
  projection,
  semesters,
  target,
  targetGpa,
  trend,
}: GpaExportCardProps) {
  const input = useMemo(
    () => ({
      contributions,
      cumulative,
      projection,
      semesters,
      target,
      targetGpa,
      trend,
    }),
    [contributions, cumulative, projection, semesters, target, targetGpa, trend]
  );
  const { sections, toggleSection } = useGpaExportSections();
  const { canShare, error, exportCsv, exportJson, exportPdf, pending } =
    useGpaExport(input, sections);
  const hasSection = Object.values(sections).some(Boolean);

  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <CardTitle>Export</CardTitle>
        <p className="text-muted-foreground text-sm">
          Pick what goes in the PDF. CSV gives you the grade table for a
          spreadsheet, JSON gives you everything as raw data.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {GPA_EXPORT_SECTION_OPTIONS.map((option) => (
            <GpaExportSectionToggle
              isOn={sections[option.id]}
              key={option.id}
              onToggle={toggleSection}
              option={option}
            />
          ))}
        </div>

        <GpaExportActions
          canShare={canShare}
          isDisabled={!hasSection}
          onCsv={exportCsv}
          onJson={exportJson}
          onPdf={exportPdf}
          pending={pending}
        >
          <GpaCopyLinkButton semesters={semesters} />
        </GpaExportActions>

        {hasSection ? null : (
          <p className="text-muted-foreground text-xs">
            Turn on at least one section to build a PDF.
          </p>
        )}

        {error ? (
          <p className="text-destructive text-xs" role="alert">
            {error}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
