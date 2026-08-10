import { createFileRoute } from "@tanstack/react-router";
import { SourceCard } from "@/components/drive/source-card";
import { DRIVE_SOURCES } from "@/config/sources";
import { formatDateTime } from "@/lib/drive/format";
import { driveIndexQueryOptions } from "@/lib/drive/queries";

export const Route = createFileRoute("/")({
  component: Dashboard,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
});

function Dashboard() {
  const driveIndex = Route.useLoaderData();

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 p-4 sm:p-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-head text-2xl sm:text-3xl">Program materials</h1>
        <p className="text-muted-foreground text-sm">
          Master's in Computer and Communications Engineering — LIU
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DRIVE_SOURCES.map((source) => {
          const summary = driveIndex.meta.sources.find(
            (s) => s.id === source.id
          );
          return (
            <SourceCard
              fileCount={summary?.fileCount ?? 0}
              folderCount={summary?.folderCount ?? 0}
              key={source.id}
              source={source}
              totalBytes={summary?.totalBytes ?? 0}
            />
          );
        })}
      </div>

      <p className="text-muted-foreground text-xs">
        Last synced {formatDateTime(driveIndex.meta.generatedAt)}
      </p>
    </main>
  );
}
