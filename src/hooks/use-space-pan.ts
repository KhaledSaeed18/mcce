import { useEffect, useState } from "react";
import { PAN_HOTKEY_KEY } from "@/config/pdf-editor";
import { isEditableTarget } from "@/lib/is-editable-target";

/** A control the keyboard is on keeps Space for pressing it. One the mouse
 * last clicked only holds focus by accident, so Space pans instead. */
function isKeyboardFocused(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && target.matches(":focus-visible");
}

/** True while Space is held, which borrows the hand tool without changing it. */
export function useSpacePan(): boolean {
  const [isPanning, setIsPanning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== PAN_HOTKEY_KEY) {
        return;
      }
      if (isEditableTarget(event.target) || isKeyboardFocused(event.target)) {
        return;
      }
      // Held Space repeats, and every repeat would scroll the page a screen.
      event.preventDefault();
      setIsPanning(true);
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === PAN_HOTKEY_KEY) {
        setIsPanning(false);
      }
    };
    // A key released while another window has focus never reports its keyup.
    const handleBlur = () => setIsPanning(false);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return isPanning;
}
