export type CsvValue = string | number;

/**
 * Quotes every field rather than only the risky ones. Labels carry commas, and a
 * spreadsheet reads an unquoted comma as a new column.
 */
function toCsvField(value: CsvValue): string {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export function toCsvRow(values: CsvValue[]): string {
  return values.map(toCsvField).join(",");
}

export function toYesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

export const CSV_BLANK_ROW = "";

/** Excel needs the BOM to read UTF-8, and CRLF to keep every row on its own line. */
export function toCsvFile(rows: string[]): string {
  return `﻿${rows.join("\r\n")}`;
}
