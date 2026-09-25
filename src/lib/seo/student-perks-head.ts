import { RESOURCES_STUDENT_PATH } from "@/config/resources/copy";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";
import { formatPageTitle } from "@/lib/seo/page-title";
import type { StudentPerk } from "@/lib/student-perks/types";

export const STUDENT_PERKS_URL = `${SITE_URL}${RESOURCES_STUDENT_PATH}`;

export function studentPerkUrl(id: string): string {
  return `${STUDENT_PERKS_URL}/${id}`;
}

const HUB_DESCRIPTION =
  "Three verified student offers for MCCE students: GitHub Pack, Google AI student plans, and Zed Student. What each one gives, how verification works, and what renews to paid.";

export function buildStudentPerksHead() {
  return {
    links: [{ href: STUDENT_PERKS_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: HUB_DESCRIPTION,
      title: formatPageTitle("Student plans", "Tools", SITE_NAME),
      url: STUDENT_PERKS_URL,
    }),
  };
}

export function buildStudentPerkHead(
  perk: StudentPerk | undefined,
  id: string
) {
  const url = studentPerkUrl(id);
  if (!perk) {
    return {
      links: [{ href: url, rel: "canonical" }],
      meta: buildPageMeta({
        description: "This student offer does not exist in the MCCE index.",
        robots: "noindex, follow",
        title: formatPageTitle("Offer not found", SITE_NAME),
        url,
      }),
    };
  }
  return {
    links: [{ href: url, rel: "canonical" }],
    meta: buildPageMeta({
      description: `${perk.name}: ${perk.tagline} ${perk.shortValue}. Duration, verification steps, and renewal terms.`,
      title: formatPageTitle(perk.name, "Student plans", SITE_NAME),
      url,
    }),
  };
}
