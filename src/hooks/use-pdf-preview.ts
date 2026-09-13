import { useCallback, useState } from "react";

export function usePdfPreview() {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPreview = useCallback((nextBlob: Blob) => {
    setBlob(nextBlob);
    setIsOpen(true);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setBlob(null);
    }
  }, []);

  return {
    blob,
    handleOpenChange,
    isOpen,
    openPreview,
  };
}
