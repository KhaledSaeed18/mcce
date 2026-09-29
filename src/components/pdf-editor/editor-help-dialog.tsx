import { EditorHelpShortcuts } from "@/components/pdf-editor/editor-help-shortcuts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EDITOR_HELP_DESCRIPTION,
  EDITOR_HELP_FACTS,
  EDITOR_HELP_GUIDE_TAB,
  EDITOR_HELP_SHORTCUTS_TAB,
  EDITOR_HELP_TITLE,
} from "@/config/pdf-editor-help";

const GUIDE_TAB = "guide";
const SHORTCUTS_TAB = "shortcuts";

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
      <DialogContent className="flex max-h-[90vh] flex-col overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{EDITOR_HELP_TITLE}</DialogTitle>
          <DialogDescription>{EDITOR_HELP_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={GUIDE_TAB}>
          <TabsList className="w-auto">
            <TabsTrigger value={GUIDE_TAB}>{EDITOR_HELP_GUIDE_TAB}</TabsTrigger>
            <TabsTrigger value={SHORTCUTS_TAB}>
              {EDITOR_HELP_SHORTCUTS_TAB}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={GUIDE_TAB}>
            <ul className="flex list-disc flex-col gap-1.5 pl-5 text-muted-foreground">
              {EDITOR_HELP_FACTS.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value={SHORTCUTS_TAB}>
            <EditorHelpShortcuts />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
