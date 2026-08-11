import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-6 p-4 text-center sm:p-6">
      {/* React 19 hoists this into <head>, keeping the 404 out of search results */}
      <meta content="noindex, follow" name="robots" />

      <LogoMark className="size-40 sm:size-48" />

      <div className="flex flex-col gap-2">
        <h1 className="font-head text-6xl sm:text-7xl">404</h1>
        <p className="font-head text-lg sm:text-xl">Page not found</p>
        <p className="text-muted-foreground text-sm sm:text-base">
          This page isn't in the index. It may have moved, or the link is
          broken.
        </p>
      </div>

      <Button nativeButton={false} render={<Link to="/" />}>
        Back to dashboard
      </Button>
    </main>
  );
}
