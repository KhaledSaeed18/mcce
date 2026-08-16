import { PREVIEW_URL_TTL_MS } from "@/config/gpa-export";

/** Revoked on a timer rather than immediately, so the tab can still load it. */
function withObjectUrl(blob: Blob, use: (url: string) => void) {
  const url = URL.createObjectURL(blob);

  use(url);
  setTimeout(() => URL.revokeObjectURL(url), PREVIEW_URL_TTL_MS);
}

export function downloadBlob(blob: Blob, fileName: string) {
  withObjectUrl(blob, (url) => {
    const link = document.createElement("a");

    link.download = fileName;
    link.href = url;
    document.body.append(link);
    link.click();
    link.remove();
  });
}

export function openBlob(blob: Blob) {
  withObjectUrl(blob, (url) => window.open(url, "_blank", "noopener"));
}

export function canShareFile(fileName: string, type: string): boolean {
  if (typeof navigator === "undefined" || !navigator.canShare) {
    return false;
  }

  return navigator.canShare({ files: [new File([""], fileName, { type })] });
}
