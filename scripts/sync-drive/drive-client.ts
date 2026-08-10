const DRIVE_FILES_ENDPOINT = "https://www.googleapis.com/drive/v3/files";
const FIELDS =
  "nextPageToken, files(id,name,mimeType,size,modifiedTime,webViewLink,iconLink,shortcutDetails)";
const PAGE_SIZE = 1000;
const MAX_RETRIES = 5;
const RETRY_BASE_DELAY_MS = 250;

export interface DriveApiFile {
  iconLink?: string;
  id: string;
  mimeType: string;
  modifiedTime: string;
  name: string;
  shortcutDetails?: { targetId: string; targetMimeType: string };
  size?: string;
  webViewLink?: string;
}

interface DriveFilesListResponse {
  files: DriveApiFile[];
  nextPageToken?: string;
}

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function fetchWithRetry(
  url: URL,
  accessToken: string
): Promise<Response> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    // Each retry depends on the previous attempt's response status.
    // biome-ignore lint/performance/noAwaitInLoops: intentional, see above
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const shouldRetry =
      (res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES;
    if (!shouldRetry) {
      return res;
    }

    await wait(RETRY_BASE_DELAY_MS * 2 ** attempt);
  }

  throw new Error("Unreachable: retry loop exhausted without returning");
}

export async function listChildren(
  parentId: string,
  accessToken: string
): Promise<DriveApiFile[]> {
  const files: DriveApiFile[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(DRIVE_FILES_ENDPOINT);
    url.searchParams.set("q", `'${parentId}' in parents and trashed = false`);
    url.searchParams.set("fields", FIELDS);
    url.searchParams.set("pageSize", String(PAGE_SIZE));
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    // Each page's request depends on the previous page's nextPageToken.
    // biome-ignore lint/performance/noAwaitInLoops: intentional, see above
    const res = await fetchWithRetry(url, accessToken);
    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Drive API error listing children of ${parentId}: ${res.status} ${body}`
      );
    }

    const body = (await res.json()) as DriveFilesListResponse;
    files.push(...body.files);
    pageToken = body.nextPageToken;
  } while (pageToken);

  return files;
}
