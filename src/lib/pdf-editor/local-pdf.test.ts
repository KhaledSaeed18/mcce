import { describe, expect, it } from "vitest";
import { LOCAL_PDF_ID_PREFIX, LOCAL_PDF_MAX_BYTES } from "@/config/pdf-editor";
import { checkLocalPdf } from "./local-pdf-check";
import { buildLocalPdfId } from "./local-pdf-id";

function bytesOf(text: string): ArrayBuffer {
  return new TextEncoder().encode(text).buffer as ArrayBuffer;
}

describe("checkLocalPdf", () => {
  it("accepts a file that starts with a PDF header", () => {
    const bytes = bytesOf("%PDF-1.7\n...");
    expect(checkLocalPdf(bytes.byteLength, bytes)).toBeNull();
  });

  it("accepts a header that a few junk bytes push along", () => {
    const bytes = bytesOf("\n\n%PDF-1.4");
    expect(checkLocalPdf(bytes.byteLength, bytes)).toBeNull();
  });

  it("turns away a file that only claims to be a PDF", () => {
    const bytes = bytesOf("PK\u0003\u0004 a zip renamed to .pdf");
    expect(checkLocalPdf(bytes.byteLength, bytes)).toBe("not-pdf");
  });

  it("turns away an empty file", () => {
    expect(checkLocalPdf(0, new ArrayBuffer(0))).toBe("empty");
  });

  it("turns away a file over the size the browser should keep", () => {
    const bytes = bytesOf("%PDF-1.7");
    expect(checkLocalPdf(LOCAL_PDF_MAX_BYTES + 1, bytes)).toBe("too-large");
  });
});

describe("buildLocalPdfId", () => {
  it("gives the same file the same id", async () => {
    const first = await buildLocalPdfId(bytesOf("%PDF-1.7 same"));
    const second = await buildLocalPdfId(bytesOf("%PDF-1.7 same"));
    expect(first).toBe(second);
    expect(first.startsWith(LOCAL_PDF_ID_PREFIX)).toBe(true);
  });

  it("gives different files different ids", async () => {
    const first = await buildLocalPdfId(bytesOf("%PDF-1.7 one"));
    const second = await buildLocalPdfId(bytesOf("%PDF-1.7 two"));
    expect(first).not.toBe(second);
  });
});
