import { DRIVE_DOWNLOAD_ENDPOINT } from "@/config/pdf-editor";

export function buildPdfDownloadUrl(fileId: string): string {
  return `${DRIVE_DOWNLOAD_ENDPOINT}?id=${fileId}&export=download`;
}
