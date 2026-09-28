import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { EDITOR_HEADER_ICON_BUTTON_CLASS } from "@/config/pdf-editor";

interface EditorPanelToggleProps {
  /** The icon. */
  children: ReactNode;
  hideLabel: string;
  isOpen: boolean;
  onToggle: () => void;
  showLabel: string;
}

/** A file bar button that shows or hides one of the panels, named for what
 * pressing it will do. */
export function EditorPanelToggle({
  children,
  hideLabel,
  isOpen,
  onToggle,
  showLabel,
}: EditorPanelToggleProps) {
  const label = isOpen ? hideLabel : showLabel;

  return (
    <Button
      aria-label={label}
      aria-pressed={isOpen}
      className={EDITOR_HEADER_ICON_BUTTON_CLASS}
      onClick={onToggle}
      size="icon"
      title={label}
      variant="outline"
    >
      {children}
    </Button>
  );
}
