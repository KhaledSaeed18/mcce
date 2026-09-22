/** How long the dial rests on a station before seeking the next one. */
export const HERO_RADIO_DWELL_MS = 3200;

/** Seeking takes longer the further the needle travels, so a wrap back to the
 * first station reads as a sweep through the whole band. */
export const HERO_RADIO_SEEK_BASE_SECONDS = 0.9;
export const HERO_RADIO_SEEK_PER_STATION_SECONDS = 0.12;

export const HERO_RADIO_SNAP_SPRING = {
  damping: 18,
  stiffness: 180,
  type: "spring",
} as const;

/** How far from a station, in stations, the signal is still audible. */
export const HERO_RADIO_CAPTURE_RANGE = 0.34;

/** Above this strength the station counts as locked and the readout names it. */
export const HERO_RADIO_LOCK_STRENGTH = 0.82;

/** The dial keeps this much of its width, in percent, free at each end. */
export const HERO_RADIO_DIAL_INSET_PERCENT = 5;

export const HERO_RADIO_METER_BARS = 5;
export const HERO_RADIO_KNOB_DEG_PER_STATION = 28;

/** Material types past this many fold into a single "other" entry. */
export const HERO_RADIO_MATERIAL_LIMIT = 3;
export const HERO_RADIO_OTHER_MATERIAL = "other";

/** Lab sections share their lecture's number, so they sit half a step above it. */
export const HERO_RADIO_LAB_OFFSET = 0.5;

/** The scope's drawing surface, in SVG units. */
export const HERO_SCOPE_WIDTH = 360;
export const HERO_SCOPE_HEIGHT = 96;
export const HERO_SCOPE_SAMPLES = 90;
export const HERO_SCOPE_AMPLITUDE = 34;

/** Larger courses carry a denser wave: this many files add one cycle. */
export const HERO_SCOPE_FILES_PER_CYCLE = 22;
export const HERO_SCOPE_MIN_CYCLES = 2;
export const HERO_SCOPE_PHASE_MS = 260;

export const HERO_SCOPE_GRID_COLUMNS = 8;
export const HERO_SCOPE_GRID_ROWS = 4;

export const HERO_SCOPE_SCANLINES = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 3px)",
} as const;

/** The monitor and base unit are one beige plastic in both themes, the way
 * the screen stays dark: they read as an object on the page, not as UI. */
export const HERO_CASE_STYLE = {
  backgroundColor: "#e4d8bf",
  boxShadow:
    "inset 3px 3px 0 0 rgb(255 255 255 / 0.55), inset -3px -3px 0 0 rgb(0 0 0 / 0.12), 5px 5px 0 0 var(--border)",
} as const;

export const HERO_BEZEL_STYLE = {
  backgroundColor: "#b8aa8c",
  boxShadow: "inset 2px 2px 6px rgb(0 0 0 / 0.45)",
} as const;

/** Darkens the corners of the glass the way a curved CRT face falls off. */
export const HERO_GLASS_VIGNETTE = {
  backgroundImage:
    "radial-gradient(ellipse at center, transparent 55%, rgb(0 0 0 / 0.75) 100%), linear-gradient(135deg, rgb(255 255 255 / 0.09) 0%, transparent 32%)",
} as const;

export const HERO_GRILLE_HOLES = {
  backgroundImage: "radial-gradient(circle, #000 1.5px, transparent 2px)",
  backgroundSize: "7px 7px",
} as const;

export const HERO_MONITOR_MODEL = "MCCE-86";
export const HERO_TERMINAL_PROMPT = "C:\\MCCE>";
export const HERO_TERMINAL_SCAN_COMMAND = "scan --band";
export const HERO_TERMINAL_TYPE_MS = 45;
