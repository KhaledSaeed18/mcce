import { LoadingMark } from "@/components/loading-mark";

export function RoutePending() {
  return (
    <main
      aria-live="polite"
      className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-6 p-4 text-center sm:p-6"
      role="status"
    >
      <LoadingMark className="size-32 sm:size-40" />

      <div className="flex flex-col gap-2">
        <p className="font-head text-lg sm:text-xl">Loading materials</p>
        <p className="text-muted-foreground text-sm sm:text-base">
          Give it a moment, the index is on its way.
        </p>
      </div>
    </main>
  );
}
