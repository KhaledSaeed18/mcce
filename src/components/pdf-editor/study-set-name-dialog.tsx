import { useCallback } from "react";
import { StudySetNameForm } from "@/components/pdf-editor/study-set-name-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface StudySetNameDialogProps {
  description?: string;
  initialName: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (name: string) => void;
  submitLabel: string;
  title: string;
}

/** Asks for a set's name, when saving one or renaming it. */
export function StudySetNameDialog({
  description,
  initialName,
  isOpen,
  onOpenChange,
  onSubmit,
  submitLabel,
  title,
}: StudySetNameDialogProps) {
  const handleSubmit = useCallback(
    (name: string) => {
      onSubmit(name);
      onOpenChange(false);
    },
    [onOpenChange, onSubmit]
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent>
        <StudySetNameForm
          description={description}
          initialName={initialName}
          onSubmit={handleSubmit}
          submitLabel={submitLabel}
          title={title}
        />
      </DialogContent>
    </Dialog>
  );
}
