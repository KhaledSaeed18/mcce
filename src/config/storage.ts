/** Versioned like the GPA key, so a shape change can be migrated rather than silently misread. */
export const SAVED_STORAGE_KEY = "mcce.saved.v1";
export const RECENT_STORAGE_KEY = "mcce.recent.v1";

/** Long enough to cover a study session, short enough that the palette stays a shortlist. */
export const RECENT_LIMIT = 10;
