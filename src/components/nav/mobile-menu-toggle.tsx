import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BAR_CLASSES =
  "absolute h-[2px] w-4 rounded-[1px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
  panelId: string;
}

export function MobileMenuToggle({
  isOpen,
  onClick,
  panelId,
}: MobileMenuToggleProps) {
  return (
    <Button
      aria-controls={panelId}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="size-8 p-0 lg:hidden"
      onClick={onClick}
      size="sm"
      variant="outline"
    >
      <span
        aria-hidden="true"
        className="relative flex size-4 items-center justify-center"
      >
        <span
          className={cn(BAR_CLASSES, isOpen ? "rotate-45" : "-translate-y-1")}
        />
        <span
          className={cn(BAR_CLASSES, isOpen ? "-rotate-45" : "translate-y-1")}
        />
      </span>
    </Button>
  );
}
