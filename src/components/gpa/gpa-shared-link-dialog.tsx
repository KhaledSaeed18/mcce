import { LinkIcon } from "lucide-react";
import { useCallback } from "react";
import { GpaSharedGradeRow } from "@/components/gpa/gpa-shared-grade-row";
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
import type { SharedGrade } from "@/lib/gpa/share/decode";

interface GpaSharedLinkDialogProps {
  grades: SharedGrade[];
  onApply: () => void;
  onDismiss: () => void;
}

/**
 * A shared link replaces what this browser has saved, so it never applies
 * without being read first.
 */
export function GpaSharedLinkDialog({
  grades,
  onApply,
  onDismiss,
}: GpaSharedLinkDialogProps) {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  return (
    <AlertDialog onOpenChange={handleOpenChange} open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <LinkIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Averages from a link</AlertDialogTitle>
          <AlertDialogDescription>
            {grades.length === 0
              ? "This link carries no averages we can read. Nothing will change."
              : `This link carries ${grades.length} course averages. Applying them replaces every average saved in this browser.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {grades.length === 0 ? null : (
          <ul className="max-h-56 overflow-y-auto border-2 text-sm">
            {grades.map((grade) => (
              <GpaSharedGradeRow grade={grade} key={grade.code} />
            ))}
          </ul>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {grades.length === 0 ? null : (
            <AlertDialogAction onClick={onApply}>
              Apply averages
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
