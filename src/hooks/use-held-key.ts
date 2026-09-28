import { useEffect, useState } from "react";
import { isDialogTarget } from "@/lib/is-dialog-target";
import { isEditableTarget } from "@/lib/is-editable-target";

/** True while a single letter is held on its own, outside fields and
 * dialogs. A key let go while another window has focus never reports its
 * keyup, so leaving the window lets go too. */
export function useHeldKey(key: string, isEnabled: boolean): boolean {
  const [isHeld, setIsHeld] = useState(false);

  useEffect(() => {
    if (!isEnabled) {
      setIsHeld(false);
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      const hasModifier = event.metaKey || event.ctrlKey || event.altKey;
      if (
        hasModifier ||
        event.key.toLowerCase() !== key ||
        isEditableTarget(event.target) ||
        isDialogTarget(event.target)
      ) {
        return;
      }
      event.preventDefault();
      setIsHeld(true);
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === key) {
        setIsHeld(false);
      }
    };
    const handleBlur = () => setIsHeld(false);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isEnabled, key]);

  return isHeld;
}
