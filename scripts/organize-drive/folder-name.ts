const MATLAB_ALIASES = /^matlab[\s\-_]*(codes?|files?)$/i;
const BRACKET_PREFIX = /^\[[^\]]+\]\s*/;
const NUMBERED_GROUP =
  /^(Lecture|Chapter|Set|Assignment|Homework|Experiment|Assessment)s?\s*0*(\d+)$/i;
/** One folder covers two lectures, e.g. "Lecture4&5". */
const NUMBERED_RANGE =
  /^(Lecture|Chapter|Set|Assignment|Homework|Experiment|Assessment)s?\s*0*(\d+)\s*[&+-]\s*0*(\d+)$/i;

const GROUP_LABELS: Record<string, string> = {
  assessment: "Assessment",
  assignment: "Assignment",
  chapter: "Chapter",
  experiment: "Experiment",
  homework: "Homework",
  lecture: "Lecture",
  set: "Set",
};

function pad(value: string): string {
  return value.padStart(2, "0");
}

function label(word: string): string {
  return GROUP_LABELS[word.toLowerCase()] ?? word;
}

/**
 * Drive sorts names lexicographically, which puts Lecture10 between Lecture1
 * and Lecture2. Padding to two digits is the only way to fix the order in
 * Drive itself; the site already sorts these naturally either way.
 */
export function normaliseFolderName(name: string): string {
  if (MATLAB_ALIASES.test(name.trim())) {
    return "MATLAB";
  }

  const stripped = name.replace(BRACKET_PREFIX, "").trim();

  const range = NUMBERED_RANGE.exec(stripped);
  if (range) {
    return `${label(range[1])} ${pad(range[2])}-${pad(range[3])}`;
  }

  const single = NUMBERED_GROUP.exec(stripped);
  if (single) {
    return `${label(single[1])} ${pad(single[2])}`;
  }

  return stripped;
}
