import { createServerFn } from "@tanstack/react-start";
import { PDF_PROXY_CACHE_CONTROL } from "@/config/pdf-editor";
import type { DriveIndex } from "@/lib/drive/types";
import { buildPdfDownloadUrl } from "./download-url";

/**
 * Drive answers browser-issued cross-site requests with a 403, so the bytes are
 * pulled server-side and handed back from our own origin. The file is public,
 * so no credential is involved; the id is checked against the index first so
 * this cannot be used as an open proxy for arbitrary Drive files.
 */
export const fetchPdfBytes = createServerFn({ method: "GET" })
  .inputValidator((data: { fileId: string }) => data)
  .handler(async ({ data }) => {
    const { nodes } = (await import("@/data/drive-index.json"))
      .default as DriveIndex;
    const isIndexedPdf = nodes.some(
      (node) => node.id === data.fileId && node.kind === "pdf"
    );
    if (!isIndexedPdf) {
      return new Response("Unknown file", { status: 404 });
    }

    const upstream = await fetch(buildPdfDownloadUrl(data.fileId));
    if (!upstream.ok) {
      return new Response("Drive did not return the file", { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        "cache-control": PDF_PROXY_CACHE_CONTROL,
        "content-type": "application/pdf",
      },
    });
  });
