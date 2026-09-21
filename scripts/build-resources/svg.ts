const SCRIPT_TAG = /<script[\s\S]*?<\/script>/gi;
const EVENT_ATTRIBUTE = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const EXTERNAL_HREF =
  /\s+(?:xlink:)?href\s*=\s*(?:"(?!#)[^"]*"|'(?!#)[^']*')/gi;
const FOREIGN_OBJECT = /<foreignObject[\s\S]*?<\/foreignObject>/gi;
const SVG_ROOT = /<svg[\s>]/i;

/**
 * The files are served through an img tag, which cannot run script, but a
 * stripped file is also safe to inline later if the card ever needs it.
 */
export function sanitiseSvg(source: string): string {
  return source
    .replace(SCRIPT_TAG, "")
    .replace(FOREIGN_OBJECT, "")
    .replace(EVENT_ATTRIBUTE, "")
    .replace(EXTERNAL_HREF, "")
    .trim();
}

export function isSvgDocument(source: string): boolean {
  return SVG_ROOT.test(source);
}
