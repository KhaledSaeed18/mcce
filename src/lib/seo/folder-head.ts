import { SITE_NAME, SITE_URL } from "@/config/site";
import {
  buildFolderDescription,
  resolveFolderMeta,
} from "@/lib/drive/resolve-folder";
import type { DriveIndex } from "@/lib/drive/types";
import { courseUrl } from "@/lib/seo/course-url";
import { findFolderCourseCode } from "@/lib/seo/folder-canonical";
import { buildPageMeta } from "@/lib/seo/meta";
import { formatPageTitle } from "@/lib/seo/page-title";

const MISSING_FOLDER_DESCRIPTION =
  "This folder isn't in the current index. It may have moved, or the index may be stale.";

type FolderMeta = ReturnType<typeof resolveFolderMeta>;

/** Only course folders (depth 1) and source roots (no node) carry unique enough
 * content to index. Deeper folders are thin, near-duplicate listings. */
function isIndexableFolder(meta: FolderMeta) {
  return !meta?.node || meta.node.depth === 1;
}

function resolveCanonicalUrl(meta: FolderMeta, url: string): string {
  const courseCode = findFolderCourseCode(meta?.node ?? null);
  return courseCode ? courseUrl(courseCode) : url;
}

/** Head tags for a browse route, which has to cover ids the index no longer knows. */
export function buildFolderHead(
  driveIndex: DriveIndex | undefined,
  folderId: string
) {
  const url = `${SITE_URL}/browse/${folderId}`;
  const meta = driveIndex ? resolveFolderMeta(driveIndex, folderId) : null;
  const canonicalUrl = resolveCanonicalUrl(meta, url);

  return {
    links: [{ href: canonicalUrl, rel: "canonical" }],
    meta: meta
      ? buildPageMeta({
          description: buildFolderDescription(meta),
          robots: isIndexableFolder(meta) ? undefined : "noindex, follow",
          title: formatPageTitle(meta.title, SITE_NAME),
          url: canonicalUrl,
        })
      : buildPageMeta({
          description: MISSING_FOLDER_DESCRIPTION,
          robots: "noindex, follow",
          title: "MCCE",
          url,
        }),
  };
}
