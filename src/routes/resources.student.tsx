import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/resources/student")({
  component: StudentLayout,
});

function StudentLayout() {
  return <Outlet />;
}
