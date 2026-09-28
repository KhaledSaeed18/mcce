import { TimerOffIcon } from "lucide-react";
import { useCallback } from "react";
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
} from "@/components/ui/alert-dialog";
import {
  EXAM_REVIEW_LABEL,
  EXAM_TIME_UP_DESCRIPTION,
  EXAM_TIME_UP_TITLE,
  EXPORT_LABEL,
} from "@/config/pdf-editor";

interface ExamTimeUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

/** Tells the reader the exam is over, and offers a copy of what they wrote. */
export function ExamTimeUpDialog({
  isOpen,
  onClose,
  onDownload,
}: ExamTimeUpDialogProps) {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose]
  );

  const handleDownload = useCallback(() => {
    onDownload();
    onClose();
  }, [onClose, onDownload]);

  return (
    <AlertDialog onOpenChange={handleOpenChange} open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <TimerOffIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>{EXAM_TIME_UP_TITLE}</AlertDialogTitle>
          <AlertDialogDescription>
            {EXAM_TIME_UP_DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{EXAM_REVIEW_LABEL}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDownload}>
            {EXPORT_LABEL}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
