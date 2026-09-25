import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { ResourceSuggestBlock } from "@/components/resources/resource-suggest-block";
import { ResourcesHero } from "@/components/resources/resources-hero";
import { StudentPerkCard } from "@/components/resources/student/student-perk-card";
import { StudentPerksCompare } from "@/components/resources/student/student-perks-compare";
import { JsonLd } from "@/components/seo/json-ld";
import { STUDENT_HERO, STUDENT_PERKS } from "@/config/resources/student-perks";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { STUDENT_PERKS_URL } from "@/lib/seo/student-perks-head";
import { buildStudentPerksSchema } from "@/lib/seo/student-perks-schema";

export function StudentPerksPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ResourcesHero
        badge={STUDENT_HERO.badge}
        description="Verified offers MCCE students use most. Open one for what it gives, how verification works, and what it renews to."
        highlight={STUDENT_HERO.highlight}
        title={STUDENT_HERO.title}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {STUDENT_PERKS.map((perk, index) => (
          <StudentPerkCard featured={index === 0} key={perk.id} perk={perk} />
        ))}
      </div>
      <StudentPerksCompare perks={STUDENT_PERKS} />
      <SectionDividerDots />
      <ResourceSuggestBlock />
      <JsonLd
        data={buildStudentPerksSchema(STUDENT_PERKS, STUDENT_PERKS_URL)}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Tools", url: `${SITE_URL}/resources` },
          { name: "Student plans", url: STUDENT_PERKS_URL },
        ])}
      />
    </main>
  );
}
