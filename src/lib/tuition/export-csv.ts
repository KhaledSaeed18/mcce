import type { TuitionBreakdown, TuitionScenario } from "@/lib/tuition/types";

function toCsvField(value: string | number | boolean): string {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function toCsvRow(values: Array<string | number | boolean>): string {
  return values.map(toCsvField).join(",");
}

function toBreakdownRow(label: string, breakdown: TuitionBreakdown): string {
  return toCsvRow([
    label,
    breakdown.credits,
    breakdown.tuitionUsd,
    breakdown.registrationUsd,
    breakdown.totalUsd,
    breakdown.tuitionLbp,
    breakdown.nssfLbp,
    breakdown.totalLbp,
  ]);
}

export function buildTuitionCsv(scenario: TuitionScenario): string {
  const { calculation, plan } = scenario;
  const chargeSemester = calculation.semesters[plan.chargeSemesterIndex];

  const rows = [
    toCsvRow(["Setting", "Value"]),
    toCsvRow(["Semesters per year", calculation.semesters.length]),
    toCsvRow(["Yearly charges billed in", chargeSemester?.label ?? ""]),
    toCsvRow(["Include registration", plan.includeRegistration]),
    toCsvRow(["Include NSSF", plan.includeNssf]),
    toCsvRow(["", ""]),
    toCsvRow([
      "Period",
      "Credits",
      "Tuition USD",
      "Registration USD",
      "Total USD",
      "Tuition LBP",
      "NSSF LBP",
      "Total LBP",
    ]),
    ...calculation.semesters.map((semester) =>
      toBreakdownRow(semester.label, semester)
    ),
    toBreakdownRow("Annual projection", calculation.annualProjection),
  ];

  return `﻿${rows.join("\r\n")}`;
}
