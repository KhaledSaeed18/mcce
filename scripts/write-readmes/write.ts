import { overwriteDoc } from "./drive-docs";
import type { ReadmeDoc } from "./types";

export async function writeDocs(
  docs: ReadmeDoc[],
  accessToken: string
): Promise<void> {
  for (const doc of docs) {
    if (!doc.docId) {
      continue;
    }
    // Sequential keeps the run under Drive's per-user write rate limit.
    // biome-ignore lint/performance/noAwaitInLoops: intentional, see above
    await overwriteDoc(doc.docId, doc.name, doc.html, accessToken);
    console.log(`  wrote ${doc.name}`);
  }
}
