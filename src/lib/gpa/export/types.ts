import type { GpaTrendPoint } from "@/lib/gpa/chart";
import type { CourseContribution } from "@/lib/gpa/contribution";
import type { GpaTotals, Projection, TargetOutcome } from "@/lib/gpa/types";

export type GpaExportSection =
  | "summary"
  | "courses"
  | "chart"
  | "contribution"
  | "projection"
  | "target";

export type GpaExportSections = Record<GpaExportSection, boolean>;

export interface GpaExportSectionOption {
  description: string;
  id: GpaExportSection;
  label: string;
}

export type GpaExportAction = "download" | "preview" | "share";

export interface GpaExportCourse {
  average: number | null;
  code: string;
  credits: number;
  name: string;
  qualityPoints: number | null;
}

export interface GpaExportSemester {
  courses: GpaExportCourse[];
  credits: number;
  cumulativeGpa: number | null;
  gpa: number | null;
  label: string;
  qualityPoints: number;
}

export interface GpaExportPayload {
  contributions: CourseContribution[];
  cumulative: GpaTotals;
  degreeCredits: number;
  generatedAt: string;
  projection: Projection | null;
  semesters: GpaExportSemester[];
  standing: string | null;
  target: TargetOutcome | null;
  targetGpa: number;
  trend: GpaTrendPoint[];
}
