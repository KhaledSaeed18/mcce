/** Keys pressed inside an open dialog belong to it, not to the page behind it. */
export function isDialogTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    target.closest('[role="dialog"], [role="alertdialog"]') !== null
  );
}
