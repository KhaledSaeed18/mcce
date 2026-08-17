import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FileMissingDialogProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

/** A shared link outlives the sync that drops the file, and that has to read as an answer. */
export function FileMissingDialog({
  onOpenChange,
  open,
}: FileMissingDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>File not in the index</DialogTitle>
          <DialogDescription>
            This link points at a file the current index doesn't have. It may
            have been moved or removed from the Drive since the link was shared.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
