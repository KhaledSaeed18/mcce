import type { DriveNode } from "./types";

/** A hit in the name beats a hit in an ancestor folder, and a whole word beats part of one. */
const NAME_WORD_SCORE = 6;
const NAME_PARTIAL_SCORE = 4;
const COURSE_CODE_SCORE = 3;
const PATH_SCORE = 2;

const WORD_CHARACTER = /[a-z0-9]/;

function hasWordStart(haystack: string, token: string): boolean {
  let index = haystack.indexOf(token);

  while (index !== -1) {
    if (index === 0 || !WORD_CHARACTER.test(haystack[index - 1])) {
      return true;
    }
    index = haystack.indexOf(token, index + 1);
  }

  return false;
}

interface Haystacks {
  courseCode: string;
  name: string;
  path: string;
}

function scoreToken(token: string, haystacks: Haystacks): number {
  if (hasWordStart(haystacks.name, token)) {
    return NAME_WORD_SCORE;
  }
  if (haystacks.name.includes(token)) {
    return NAME_PARTIAL_SCORE;
  }
  if (haystacks.courseCode.includes(token)) {
    return COURSE_CODE_SCORE;
  }
  return haystacks.path.includes(token) ? PATH_SCORE : 0;
}

/** Zero unless every token matches somewhere, so extra words narrow rather than widen. */
export function scoreNode(node: DriveNode, tokens: string[]): number {
  const haystacks: Haystacks = {
    courseCode: node.courseCode?.toLowerCase() ?? "",
    name: node.name.toLowerCase(),
    path: node.pathNames.join(" ").toLowerCase(),
  };

  let total = 0;
  for (const token of tokens) {
    const score = scoreToken(token, haystacks);
    if (score === 0) {
      return 0;
    }
    total += score;
  }

  return total;
}
