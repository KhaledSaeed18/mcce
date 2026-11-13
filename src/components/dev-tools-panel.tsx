import { useHydrated } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const LazyDevtools = lazy(async () => {
  const [{ TanStackDevtools }, { TanStackRouterDevtoolsPanel }] =
    await Promise.all([
      import("@tanstack/react-devtools"),
      import("@tanstack/react-router-devtools"),
    ]);

  return {
    default: () => (
      <TanStackDevtools
        config={{ position: "bottom-right" }}
        plugins={[
          { name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
        ]}
      />
    ),
  };
});

/** Kept out of the production bundle: this is a dev-only chunk, never fetched when import.meta.env.DEV is false. */
export function DevToolsPanel() {
  // Client only: on a cold dev server the lazy import can hang inside the
  // worker, and a server render waiting on it never closes the page stream.
  const isHydrated = useHydrated();

  if (!(import.meta.env.DEV && isHydrated)) {
    return null;
  }

  return (
    <Suspense>
      <LazyDevtools />
    </Suspense>
  );
}
