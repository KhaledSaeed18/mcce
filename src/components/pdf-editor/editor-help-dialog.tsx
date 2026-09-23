import { EditorHelpShortcuts } from "@/components/pdf-editor/editor-help-shortcuts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  EDITOR_HELP_DESCRIPTION,
  EDITOR_HELP_FACTS,
  EDITOR_HELP_TITLE,
} from "@/config/pdf-editor-help";

interface EditorHelpDialogProps {
  onOpenChange: (isOpen: boolean) => void;
  open: boolean;
}

export function EditorHelpDialog({
  onOpenChange,
  open,
}: EditorHelpDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{EDITOR_HELP_TITLE}</DialogTitle>
          <DialogDescription>{EDITOR_HELP_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-muted-foreground">
          {EDITOR_HELP_FACTS.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <Separator />
        <EditorHelpShortcuts />
      </DialogContent>
    </Dialog>
  );
}
