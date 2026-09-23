const MAC_PLATFORM = /mac|iphone|ipad/i;

/** Only called in the browser: the editor renders nothing of its own before hydration. */
function isMac(): boolean {
  return MAC_PLATFORM.test(navigator.userAgent);
}

/** The keys of a shortcut hint, with "Mod" named for this platform. */
export function formatKeys(hint: string): string[] {
  const modifier = isMac() ? "Cmd" : "Ctrl";
  return hint.split("+").map((key) => (key === "Mod" ? modifier : key));
}

/** A control's tooltip, naming the key that does the same thing. */
export function withShortcut(label: string, hint: string): string {
  return `${label} (${formatKeys(hint).join("+")})`;
}
