const EDITABLE_TAGS = new Set(["INPUT", "SELECT", "TEXTAREA"]);

/** A bare letter shortcut must never fire while the user is typing. */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return EDITABLE_TAGS.has(target.tagName) || target.isContentEditable;
}
