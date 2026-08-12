import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      {isOpen ? <XIcon /> : <MenuIcon />}
    </Button>
  );
}
