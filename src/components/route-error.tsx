import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";

export function RouteError({ error }: ErrorComponentProps) {
  const router = useRouter();

  // Clears the failed match so the route re-runs its loader instead of
  // re-rendering the same thrown error.
  const handleRetry = useCallback(() => {
    router.invalidate();
  }, [router]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-6 p-4 text-center sm:p-6">
      <meta content="noindex, follow" name="robots" />

      <LogoMark className="size-40 sm:size-48" />

      <div className="flex flex-col gap-2">
        <h1 className="font-head text-4xl sm:text-5xl">Something broke</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          This page failed to load. Retrying often works, and the homepage is
          always there.
        </p>
        {import.meta.env.DEV && error?.message ? (
          <pre className="mt-2 overflow-x-auto rounded border-2 bg-muted p-3 text-left text-xs">
            {error.message}
          </pre>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={handleRetry}>Try again</Button>
        <Button nativeButton={false} render={<Link to="/" />} variant="outline">
          Back to homepage
        </Button>
      </div>
    </main>
  );
}
