const DRIVE_FILES_ENDPOINT = "https://www.googleapis.com/drive/v3/files";
const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";

async function request(
  url: URL,
  accessToken: string,
  init: RequestInit
): Promise<Record<string, unknown>> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Drive API ${init.method} ${url.pathname}: ${res.status} ${await res.text()}`
    );
  }
  return (await res.json()) as Record<string, unknown>;
}

export async function renameFile(
  fileId: string,
  name: string,
  accessToken: string
): Promise<void> {
  const url = new URL(`${DRIVE_FILES_ENDPOINT}/${fileId}`);
  url.searchParams.set("fields", "id");
  await request(url, accessToken, {
    body: JSON.stringify({ name }),
    method: "PATCH",
  });
}

export async function moveFile(
  fileId: string,
  fromParentId: string,
  toParentId: string,
  accessToken: string
): Promise<void> {
  const url = new URL(`${DRIVE_FILES_ENDPOINT}/${fileId}`);
  url.searchParams.set("addParents", toParentId);
  url.searchParams.set("removeParents", fromParentId);
  url.searchParams.set("fields", "id");
  await request(url, accessToken, { body: "{}", method: "PATCH" });
}

export async function createFolder(
  name: string,
  parentId: string,
  accessToken: string
): Promise<string> {
  const url = new URL(DRIVE_FILES_ENDPOINT);
  url.searchParams.set("fields", "id");
  const body = await request(url, accessToken, {
    body: JSON.stringify({
      mimeType: FOLDER_MIME_TYPE,
      name,
      parents: [parentId],
    }),
    method: "POST",
  });
  return body.id as string;
}
