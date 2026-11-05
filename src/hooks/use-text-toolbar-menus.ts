import {
  type MouseEvent,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TEXT_MENU_ROOM } from "@/config/pdf-editor";

export type TextToolbarMenuId = "color" | "fill" | "font";

/** Which of the toolbar's menus is open, and whether it has room to open upward. */
export function useTextToolbarMenus(barRef: RefObject<HTMLElement | null>) {
  const [openMenu, setOpenMenu] = useState<TextToolbarMenuId | null>(null);
  const [opensUp, setOpensUp] = useState(true);
  const close = useCallback(() => setOpenMenu(null), []);

  const toggle = useCallback(
    (menu: TextToolbarMenuId, event: MouseEvent<HTMLElement>) => {
      setOpensUp(
        event.currentTarget.getBoundingClientRect().top > TEXT_MENU_ROOM
      );
      setOpenMenu((current) => (current === menu ? null : menu));
    },
    []
  );

  useEffect(() => {
    if (!openMenu) {
      return;
    }
    const handlePress = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    // Ahead of the text field, where Escape would finish the text as well.
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener("pointerdown", handlePress, true);
    document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("pointerdown", handlePress, true);
      document.removeEventListener("keydown", handleKey, true);
    };
  }, [barRef, close, openMenu]);

  return { close, openMenu, opensUp, toggle };
}

export type TextToolbarMenus = ReturnType<typeof useTextToolbarMenus>;
