import { createFileRoute } from "@tanstack/react-router";
import { StudentPerkDetailPage } from "@/components/resources/student/student-perk-detail-page";
import { StudentPerkNotFound } from "@/components/resources/student/student-perk-not-found";
import { STUDENT_PERK_BY_ID } from "@/config/resources/student-perks";
import { buildStudentPerkHead } from "@/lib/seo/student-perks-head";
import type { StudentPerkId } from "@/lib/student-perks/types";

export const Route = createFileRoute("/resources/student/$perkId")({
  component: StudentPerkRoute,
  head: ({ params }) =>
    buildStudentPerkHead(
      STUDENT_PERK_BY_ID.get(params.perkId as StudentPerkId),
      params.perkId
    ),
});

function StudentPerkRoute() {
  const { perkId } = Route.useParams();
  const perk = STUDENT_PERK_BY_ID.get(perkId as StudentPerkId);

  if (!perk) {
    return <StudentPerkNotFound perkId={perkId} />;
  }

  return <StudentPerkDetailPage perk={perk} />;
}
