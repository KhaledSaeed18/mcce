import { createFileRoute } from "@tanstack/react-router";
import { StudentPerksPage } from "@/components/resources/student/student-perks-page";
import { buildStudentPerksHead } from "@/lib/seo/student-perks-head";

export const Route = createFileRoute("/resources/student/")({
  component: StudentPerksRoute,
  head: buildStudentPerksHead,
});

function StudentPerksRoute() {
  return <StudentPerksPage />;
}
