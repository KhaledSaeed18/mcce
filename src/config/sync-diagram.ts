export const SYNC_DIAGRAM_WIDTH = 640;
export const SYNC_DIAGRAM_HEIGHT = 220;
export const SYNC_DIAGRAM_STROKE = 2.5;

export interface SyncDiagramFolder {
  x: number;
  y: number;
}

export interface SyncDiagramSheet {
  /** Where the sheet rests once it has fanned out of its folder. */
  fanX: number;
  fanY: number;
  /** Fraction of the scroll range where the scan bar reaches this sheet. */
  indexAt: number;
  /** The folder mouth the sheet travels out of. */
  originX: number;
  originY: number;
  rotation: number;
}

export interface SyncDiagramRow {
  /** Width of the title bar, varied so the stack reads as distinct records. */
  barWidth: number;
}

export const SYNC_FOLDER_WIDTH = 76;
export const SYNC_FOLDER_HEIGHT = 58;
export const SYNC_FOLDER_TAB_WIDTH = 30;
export const SYNC_FOLDER_TAB_HEIGHT = 10;

export const SYNC_FOLDERS: SyncDiagramFolder[] = [
  { x: 20, y: 148 },
  { x: 108, y: 148 },
];

export const SYNC_SHEET_WIDTH = 42;
export const SYNC_SHEET_HEIGHT = 54;

/** Ordered left to right so the scan bar meets them in array order. */
export const SYNC_SHEETS: SyncDiagramSheet[] = [
  {
    fanX: 26,
    fanY: 76,
    indexAt: 0.3,
    originX: 37,
    originY: 150,
    rotation: -13,
  },
  {
    fanX: 80,
    fanY: 48,
    indexAt: 0.355,
    originX: 37,
    originY: 150,
    rotation: -5,
  },
  {
    fanX: 136,
    fanY: 70,
    indexAt: 0.41,
    originX: 37,
    originY: 150,
    rotation: 8,
  },
  {
    fanX: 196,
    fanY: 44,
    indexAt: 0.465,
    originX: 125,
    originY: 150,
    rotation: -9,
  },
  {
    fanX: 248,
    fanY: 74,
    indexAt: 0.52,
    originX: 125,
    originY: 150,
    rotation: 6,
  },
  {
    fanX: 300,
    fanY: 50,
    indexAt: 0.575,
    originX: 125,
    originY: 150,
    rotation: 14,
  },
];

export const SYNC_ROW_X = 392;
export const SYNC_ROW_WIDTH = 228;
export const SYNC_ROW_HEIGHT = 22;
export const SYNC_ROW_GAP = 31;
export const SYNC_ROW_TOP = 22;
export const SYNC_ROW_MARKER = 12;
export const SYNC_ROW_ENTRY_OFFSET = 24;

export const SYNC_ROWS: SyncDiagramRow[] = [
  { barWidth: 148 },
  { barWidth: 116 },
  { barWidth: 160 },
  { barWidth: 104 },
  { barWidth: 136 },
  { barWidth: 92 },
];

/** The sheet and row the final stage links back together. */
export const SYNC_LINKED_INDEX = 2;

export const SYNC_FAN_RANGE = [0, 0.28] as const;
export const SYNC_FAN_STAGGER = 0.024;
export const SYNC_FAN_DURATION = 0.14;
export const SYNC_SCAN_RANGE = [0.28, 0.7] as const;
export const SYNC_LINK_RANGE = [0.72, 0.94] as const;

/** How long a single sheet takes to turn into its index row. */
export const SYNC_INDEX_DURATION = 0.1;

export const SYNC_SCAN_FROM = -20;
export const SYNC_SCAN_TO = 660;
export const SYNC_SCAN_WIDTH = 3;
export const SYNC_SCAN_CAP = 10;
export const SYNC_SCAN_FADE = 0.04;

/** Runs from the linked index row back to the right edge of its sheet, so the
 * last stage reads as "the record points at the file", not "the file moved". */
export const SYNC_LINK_PATH = "M 392 95 C 330 128, 250 128, 182 98";
export const SYNC_LINK_ARROW = "0,0 -11,-6 -11,6";
export const SYNC_LINK_ARROW_TRANSFORM = "translate(182, 98) rotate(-156.2)";
export const SYNC_LINK_WIDTH = 3;
export const SYNC_LINK_ARROW_RANGE = [0.88, 0.94] as const;

export const SYNC_LIFT_SCALE = 1.18;
export const SYNC_DIMMED_OPACITY = 0.4;
export const SYNC_SHEET_ENTRY_SCALE = 0.6;

export const SYNC_LOOP_SECONDS = 9;

/** Builds to the finished state, holds it, then resets to rest inside the
 * blanked-out window so the restart is never seen. */
export const SYNC_LOOP_PROGRESS = [0, 1, 1, 0, 0] as const;
export const SYNC_LOOP_PROGRESS_TIMES = [0, 0.55, 0.89, 0.9, 1] as const;
export const SYNC_LOOP_OPACITY = [1, 1, 0, 0, 1] as const;
export const SYNC_LOOP_OPACITY_TIMES = [0, 0.82, 0.88, 0.94, 1] as const;
