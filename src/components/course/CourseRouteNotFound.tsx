import { useParams } from "@tanstack/react-router";
import { CourseNotFound } from "@/components/course/CourseNotFound";

export function CourseRouteNotFound() {
  const { code } = useParams({ from: "/course/$code" });
  return <CourseNotFound code={code} />;
}
