import { SITE_URL } from "@/config/site";
import {
  buildFolderDescription,
  resolveFolderMeta,
} from "@/lib/drive/resolve-folder";
import type { DriveIndex } from "@/lib/drive/types";
import { buildPageMeta } from "@/lib/seo/meta";

const MISSING_FOLDER_DESCRIPTION =
  "This folder isn't in the current index. It may have moved, or the index may be stale.";

/** Head tags for a browse route, which has to cover ids the index no longer knows. */
export function buildFolderHead(
  driveIndex: DriveIndex | undefined,
  folderId: string
) {
  const url = `${SITE_URL}/browse/${folderId}`;
  const meta = driveIndex ? resolveFolderMeta(driveIndex, folderId) : null;

  return {
    links: [{ href: url, rel: "canonical" }],
    meta: meta
      ? buildPageMeta({
          description: buildFolderDescription(meta),
          title: `${meta.title} · MCCE`,
          url,
        })
      : buildPageMeta({
          description: MISSING_FOLDER_DESCRIPTION,
          robots: "noindex, follow",
          title: "MCCE",
          url,
        }),
  };
}
