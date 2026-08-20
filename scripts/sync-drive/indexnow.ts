import { SITE_URL } from "../../src/config/site";
import type { DriveNode } from "../../src/lib/drive/types";

const INDEXNOW_KEY = "7f293b7f1ee83ad47e9d311265772bf7";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITE_HOST = new URL(SITE_URL).host;

/** Course folder (depth 1) and course page URLs touched by nodes first seen this sync. */
export function buildChangedUrls(
  nodes: DriveNode[],
  generatedAt: string
): string[] {
  const added = nodes.filter((node) => node.firstSeenAt === generatedAt);
  const folderIds = new Set(
    added.map((node) => node.pathIds[1]).filter((id): id is string => !!id)
  );
  const courseCodes = new Set(
    added
      .map((node) => node.courseCode)
      .filter((code): code is string => !!code)
  );

  if (folderIds.size === 0 && courseCodes.size === 0) {
    return [];
  }

  return [
    `${SITE_URL}/`,
    `${SITE_URL}/recent`,
    ...[...folderIds].map((id) => `${SITE_URL}/browse/${id}`),
    ...[...courseCodes].map((code) => `${SITE_URL}/course/${code}`),
  ];
}

/** Pushes changed URLs to IndexNow so Bing, Yandex, and other participants pick them up
 * without waiting for their next scheduled crawl. */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) {
    console.log("IndexNow: nothing new to submit");
    return;
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    body: JSON.stringify({
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "POST",
  });

  if (!response.ok) {
    console.error(
      `IndexNow: submission failed with ${response.status} ${response.statusText}`
    );
    return;
  }

  console.log(`IndexNow: submitted ${urls.length} url(s)`);
}
