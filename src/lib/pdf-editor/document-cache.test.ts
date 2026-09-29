import { beforeEach, describe, expect, it, vi } from "vitest";
import { LOADED_DOCUMENT_LIMIT } from "@/config/pdf-editor";
import { borrowDocument } from "./borrow-document";
import { acquireDocument, forgetDocument } from "./document-cache";
import { openDocument } from "./open-document";
import type { EditorFile } from "./types";

vi.mock("./open-document", () => ({ openDocument: vi.fn() }));

const open = vi.mocked(openDocument);
const destroyed: string[] = [];
let fileCount = 0;

/** A fresh id per call, since the cache outlives each test. */
function nextFile(): EditorFile {
  fileCount += 1;
  return { id: `file-${fileCount}`, name: "Lecture.pdf", source: "local" };
}

function settle(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

beforeEach(() => {
  destroyed.length = 0;
  open.mockReset();
  open.mockImplementation((file) =>
    Promise.resolve({
      bytes: new ArrayBuffer(0),
      doc: {},
      task: {
        destroy: () => {
          destroyed.push(file.id);
          return Promise.resolve();
        },
      },
    } as unknown as Awaited<ReturnType<typeof openDocument>>)
  );
});

describe("acquireDocument", () => {
  it("opens a file once, however many times it is asked for", () => {
    const file = nextFile();

    const first = acquireDocument(file);
    const second = acquireDocument(file);

    expect(second.opening).toBe(first.opening);
    expect(open).toHaveBeenCalledTimes(1);
    first.release();
    second.release();
    forgetDocument(file.id);
  });

  it("keeps released files loaded up to the limit, closing the oldest past it", async () => {
    const files = Array.from({ length: LOADED_DOCUMENT_LIMIT + 1 }, nextFile);

    for (const file of files) {
      acquireDocument(file).release();
    }
    await settle();

    expect(destroyed).toEqual([files[0].id]);
    for (const file of files) {
      forgetDocument(file.id);
    }
  });

  it("never closes a file that is still in use", async () => {
    const held = nextFile();
    const lease = acquireDocument(held);
    const others = Array.from({ length: LOADED_DOCUMENT_LIMIT + 1 }, nextFile);

    for (const file of others) {
      acquireDocument(file).release();
    }
    await settle();

    expect(destroyed).not.toContain(held.id);
    lease.release();
    forgetDocument(held.id);
    for (const file of others) {
      forgetDocument(file.id);
    }
  });

  it("opens a file again after it failed to open", async () => {
    const file = nextFile();
    open.mockImplementationOnce(() => Promise.reject(new Error("offline")));

    const failed = acquireDocument(file);
    await expect(failed.opening).rejects.toThrow("offline");
    failed.release();

    const retried = acquireDocument(file);
    await expect(retried.opening).resolves.toBeDefined();
    expect(open).toHaveBeenCalledTimes(2);
    retried.release();
    forgetDocument(file.id);
  });
});

describe("forgetDocument", () => {
  it("closes a forgotten file once its last user lets go", async () => {
    const file = nextFile();
    const lease = acquireDocument(file);

    forgetDocument(file.id);
    await settle();
    expect(destroyed).toEqual([]);

    lease.release();
    await settle();
    expect(destroyed).toEqual([file.id]);
  });
});

describe("borrowDocument", () => {
  it("shares a file already loaded, keeping it loaded after", async () => {
    const file = nextFile();
    const held = acquireDocument(file);

    const borrowed = borrowDocument(file);
    borrowed.release();
    await settle();

    expect(borrowed.opening).toBe(held.opening);
    expect(destroyed).not.toContain(file.id);
    held.release();
    forgetDocument(file.id);
  });

  it("opens any other file outside the cache and closes it on release", async () => {
    const loaded = Array.from({ length: LOADED_DOCUMENT_LIMIT }, nextFile);
    for (const file of loaded) {
      acquireDocument(file).release();
    }
    const passing = nextFile();

    const borrowed = borrowDocument(passing);
    await borrowed.opening;
    borrowed.release();
    await settle();

    expect(destroyed).toEqual([passing.id]);
    const again = acquireDocument(loaded[0]);
    expect(open).toHaveBeenCalledTimes(LOADED_DOCUMENT_LIMIT + 1);
    again.release();
    for (const file of loaded) {
      forgetDocument(file.id);
    }
  });
});
