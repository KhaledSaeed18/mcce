import { EDITOR_EXPORT_SUFFIX } from "@/config/pdf-editor";

const PDF_EXTENSION_PATTERN = /\.pdf$/i;

export function buildAnnotatedFileName(name: string): string {
  return `${name.replace(PDF_EXTENSION_PATTERN, "")}${EDITOR_EXPORT_SUFFIX}`;
}
