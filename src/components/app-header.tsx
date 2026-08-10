import { Link } from "@tanstack/react-router";
import { CommandPalette } from "@/components/command-palette";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-black border-b-2 bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 p-4 sm:px-6">
        <Link className="font-head text-lg" to="/">
          MCCE
        </Link>
        <CommandPalette />
      </div>
    </header>
  );
}
