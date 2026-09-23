const MAC_PLATFORM = /mac|iphone|ipad/i;

/** Only called in the browser: the editor renders nothing of its own before hydration. */
function isMac(): boolean {
  return MAC_PLATFORM.test(navigator.userAgent);
}

/** A control's tooltip, naming the key that does the same thing. */
export function withShortcut(label: string, hint: string): string {
  return `${label} (${hint.replace("Mod", isMac() ? "Cmd" : "Ctrl")})`;
}
