import {
  EDITOR_EXPORT_SUFFIX,
  SUMMARY_EXPORT_SUFFIX,
} from "@/config/pdf-editor";

const PDF_EXTENSION_PATTERN = /\.pdf$/i;

export function stripPdfExtension(name: string): string {
  return name.replace(PDF_EXTENSION_PATTERN, "");
}

export function buildAnnotatedFileName(name: string): string {
  return `${stripPdfExtension(name)}${EDITOR_EXPORT_SUFFIX}`;
}

export function buildSummaryFileName(name: string): string {
  return `${stripPdfExtension(name)}${SUMMARY_EXPORT_SUFFIX}`;
}
