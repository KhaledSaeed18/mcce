export const DOT_GRID_BACKGROUND = {
  backgroundImage:
    "radial-gradient(circle, var(--border) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
} as const;

/** The mobile menu sets text straight on the pattern, so its dots are dialled
 * back to stay a texture instead of competing with the labels. */
export const DOT_GRID_BACKGROUND_MUTED = {
  backgroundImage:
    "radial-gradient(circle, color-mix(in srgb, var(--border) 22%, transparent) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
} as const;
