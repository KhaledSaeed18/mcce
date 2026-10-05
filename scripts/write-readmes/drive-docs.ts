import { README_NAME_PATTERN } from "./config";

const DRIVE_FILES_ENDPOINT = "https://www.googleapis.com/drive/v3/files";
const DRIVE_UPLOAD_ENDPOINT =
  "https://www.googleapis.com/upload/drive/v3/files";
const GOOGLE_DOC_MIME_TYPE = "application/vnd.google-apps.document";
const MULTIPART_BOUNDARY = "mcce-readme-boundary";

export type ReadmeLookup =
  | { kind: "found"; docId: string }
  | { kind: "missing" }
  | { kind: "ambiguous"; names: string[] };

export async function findReadmeDoc(
  folderId: string,
  accessToken: string
): Promise<ReadmeLookup> {
  const url = new URL(DRIVE_FILES_ENDPOINT);
  url.searchParams.set(
    "q",
    `'${folderId}' in parents and trashed = false and mimeType = '${GOOGLE_DOC_MIME_TYPE}'`
  );
  url.searchParams.set("fields", "files(id,name)");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(
      `Drive API list ${folderId}: ${res.status} ${await res.text()}`
    );
  }
  const { files } = (await res.json()) as {
    files: Array<{ id: string; name: string }>;
  };
  const matches = files.filter((file) => README_NAME_PATTERN.test(file.name));

  if (matches.length === 1) {
    return { docId: matches[0].id, kind: "found" };
  }
  return matches.length
    ? { kind: "ambiguous", names: matches.map((file) => file.name) }
    : { kind: "missing" };
}

/**
 * Replaces a Doc's whole body with converted HTML and renames it in one call.
 * The service account cannot create files (it has no storage quota), but it
 * can overwrite any doc it can edit, which is why blanks are made by hand.
 */
export async function overwriteDoc(
  docId: string,
  name: string,
  html: string,
  accessToken: string
): Promise<void> {
  const body = [
    `--${MULTIPART_BOUNDARY}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    JSON.stringify({ name }),
    `--${MULTIPART_BOUNDARY}`,
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
    `--${MULTIPART_BOUNDARY}--`,
  ].join("\r\n");

  const url = new URL(`${DRIVE_UPLOAD_ENDPOINT}/${docId}`);
  url.searchParams.set("uploadType", "multipart");
  url.searchParams.set("fields", "id");

  const res = await fetch(url, {
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${MULTIPART_BOUNDARY}`,
    },
    method: "PATCH",
  });
  if (!res.ok) {
    throw new Error(
      `Drive API upload ${docId}: ${res.status} ${await res.text()}`
    );
  }
}
