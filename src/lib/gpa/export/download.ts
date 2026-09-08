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

/** Opens the native save dialog when available, otherwise falls back to auto-download. */
export async function saveBlob(blob: Blob, fileName: string): Promise<void> {
  if (typeof window !== "undefined" && window.showSaveFilePicker) {
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          accept: { "application/pdf": [".pdf"] },
          description: "PDF document",
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return;
  }
  downloadBlob(blob, fileName);
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
