const MAC_PLATFORM = /mac|iphone|ipad/i;

/** Only called in the browser: the editor renders nothing of its own before hydration. */
function isMac(): boolean {
  return MAC_PLATFORM.test(navigator.userAgent);
}

const MAC_KEY_NAMES: Record<string, string> = { Alt: "Option", Mod: "Cmd" };
const OTHER_KEY_NAMES: Record<string, string> = { Mod: "Ctrl" };

/** The keys of a shortcut hint, with "Mod" and "Alt" named for this platform. */
export function formatKeys(hint: string): string[] {
  const names = isMac() ? MAC_KEY_NAMES : OTHER_KEY_NAMES;
  return hint.split("+").map((key) => names[key] ?? key);
}

/** A control's tooltip, naming the key that does the same thing. */
export function withShortcut(label: string, hint: string): string {
  return `${label} (${formatKeys(hint).join("+")})`;
}
