import { DRIVE_DOWNLOAD_ENDPOINT } from "@/config/pdf-editor";

export function buildPdfDownloadUrl(fileId: string): string {
  const id = encodeURIComponent(fileId);
  return `${DRIVE_DOWNLOAD_ENDPOINT}?id=${id}&export=download`;
}
