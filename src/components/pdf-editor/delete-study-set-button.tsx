import { Trash2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ROW_ACTION_CLASS,
  STUDY_SET_DELETE_DESCRIPTION,
  STUDY_SET_DELETE_LABEL,
  STUDY_SET_DELETE_TITLE,
} from "@/config/pdf-editor";

interface DeleteStudySetButtonProps {
  name: string;
  onDelete: () => void;
}

export function DeleteStudySetButton({
  name,
  onDelete,
}: DeleteStudySetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = useCallback(() => {
    onDelete();
    setIsOpen(false);
  }, [onDelete]);

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger
        aria-label={`${STUDY_SET_DELETE_LABEL}: ${name}`}
        className={ROW_ACTION_CLASS}
        title={STUDY_SET_DELETE_LABEL}
      >
        <Trash2Icon className="size-3.5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{STUDY_SET_DELETE_TITLE}</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-head text-foreground">{name}</span>.{" "}
            {STUDY_SET_DELETE_DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} variant="destructive">
            {STUDY_SET_DELETE_LABEL}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
