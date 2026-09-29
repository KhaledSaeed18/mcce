import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";

interface SearchButtonProps {
  icon: LucideIcon;
  label: string;
  onOpen: () => void;
  shortcut: string;
}

/** A toolbar button that opens a search, named with its key. */
export function SearchButton({
  icon: Icon,
  label,
  onOpen,
  shortcut,
}: SearchButtonProps) {
  return (
    <Button
      aria-label={label}
      onClick={onOpen}
      size="icon"
      title={withShortcut(label, shortcut)}
      variant="outline"
    >
      <Icon />
    </Button>
  );
}
