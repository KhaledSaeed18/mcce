import { createServerFn } from "@tanstack/react-start";
import { buildCourseMaterials, findCourseFolderId } from "./course-materials";
import type { CourseMaterialGroup, DriveIndex } from "./types";

export interface CourseDetail {
  folderId: string | null;
  materials: CourseMaterialGroup[];
}

/**
 * A course page only needs that course's own files, not the full drive index
 * tree, so this runs server-side and hands back the one course's slice
 * instead of letting the client hydrate every indexed node on the site.
 */
export const getCourseDetail = createServerFn({ method: "GET" })
  .validator((data: { code: string }) => data)
  .handler(async ({ data }): Promise<CourseDetail> => {
    const { nodes } = (await import("@/data/drive-index.json"))
      .default as DriveIndex;

    return {
      folderId: findCourseFolderId(nodes, data.code),
      materials: buildCourseMaterials(nodes, data.code),
    };
  });
