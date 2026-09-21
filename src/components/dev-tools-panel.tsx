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
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <Suspense>
      <LazyDevtools />
    </Suspense>
  );
}
