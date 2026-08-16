import { formatGpa } from "@/lib/gpa/standing";
import type { GpaExportPayload } from "./types";

const HEADERS = [
  "Semester",
  "Code",
  "Course",
  "Credits",
  "Average",
  "Quality points",
  "Semester GPA",
  "Cumulative GPA",
];

/**
 * Quotes every field rather than only the risky ones. Course names carry commas
 * and ampersands, and a spreadsheet reads an unquoted comma as a new column.
 */
function toCsvField(value: string | number | null): string {
  if (value === null) {
    return '""';
  }

  return `"${String(value).replace(/"/g, '""')}"`;
}

function toCsvRow(values: (string | number | null)[]): string {
  return values.map(toCsvField).join(",");
}

export function buildGradesCsv(payload: GpaExportPayload): string {
  const rows = [toCsvRow(HEADERS)];

  for (const semester of payload.semesters) {
    for (const course of semester.courses) {
      rows.push(
        toCsvRow([
          semester.label,
          course.code,
          course.name,
          course.credits,
          course.average,
          course.qualityPoints === null
            ? null
            : course.qualityPoints.toFixed(2),
          semester.gpa === null ? null : formatGpa(semester.gpa),
          semester.cumulativeGpa === null
            ? null
            : formatGpa(semester.cumulativeGpa),
        ])
      );
    }
  }

  // Excel needs the BOM to read UTF-8, and CRLF to keep every row on its own line.
  return `﻿${rows.join("\r\n")}`;
}
