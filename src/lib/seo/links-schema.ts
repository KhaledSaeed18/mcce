import {
  LINKS_META_DESCRIPTION,
  LINKS_META_TITLE,
  LINKS_NAV_LABEL,
  LINKS_URL,
} from "@/config/links";
import {
  PROGRAM_NAME,
  PROGRAM_OFFICIAL_URL,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";
import { formatSemesterFolderLabel } from "@/lib/drive/semester-folders";
import type { SemesterFolder } from "@/lib/drive/types";
import { courseUrl } from "@/lib/seo/course-url";
import { UNIVERSITY_PROVIDER } from "@/lib/seo/provider";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

function buildFolderItem(folder: SemesterFolder, index: number) {
  return {
    "@type": "ListItem",
    item: {
      "@type": "Collection",
      about: folder.courses.map((course) => ({
        "@type": "Course",
        courseCode: course.code,
        name: course.name,
        provider: UNIVERSITY_PROVIDER,
        url: courseUrl(course.code),
      })),
      collectionSize: folder.fileCount,
      name: formatSemesterFolderLabel(folder),
      url: folder.href,
    },
    position: index + 1,
  };
}

export function buildLinksPageSchema(
  folders: SemesterFolder[],
  syncedAt: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    about: {
      "@type": "EducationalOccupationalProgram",
      alternateName: SITE_NAME,
      name: PROGRAM_NAME,
      provider: UNIVERSITY_PROVIDER,
      sameAs: PROGRAM_OFFICIAL_URL,
    },
    dateModified: syncedAt,
    description: LINKS_META_DESCRIPTION,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: folders.map(buildFolderItem),
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: folders.length,
    },
    name: LINKS_META_TITLE,
    url: LINKS_URL,
  };
}

export function buildLinksBreadcrumbSchema() {
  return buildBreadcrumbSchema([
    { name: SITE_NAME, url: SITE_URL },
    { name: LINKS_NAV_LABEL, url: LINKS_URL },
  ]);
}
