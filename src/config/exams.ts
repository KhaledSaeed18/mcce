/** Roughly half the indexed papers record no year anywhere, and a guess would be worse than saying so. */
export const UNRECORDED_TERM_LABEL = "Term not recorded";

/** Chronological within an academic year, so the newest term of a year sorts first. */
export const TERM_RANK: Record<string, number> = {
  Fall: 1,
  Spring: 2,
  Summer: 3,
};
