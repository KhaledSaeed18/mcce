const POPUP_SELECTOR =
  '[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"]';

/** Keys pressed inside an open dialog, menu or list belong to it, not to the
 * page behind it: arrows there move between items, not between pages. */
export function isPopupTarget(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(POPUP_SELECTOR) !== null;
}
