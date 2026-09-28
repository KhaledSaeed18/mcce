import type { LinkStatus } from "../../src/lib/resources/types";

/**
 * An unchecked probe means the site blocked the runner or timed out, which
 * says nothing about the page. Keep the last definite result instead of
 * discarding it.
 */
export function keepKnownStatuses(
  fresh: ReadonlyMap<string, LinkStatus>,
  previous: ReadonlyMap<string, LinkStatus>
): Map<string, LinkStatus> {
  const merged = new Map<string, LinkStatus>();
  for (const [url, status] of fresh) {
    const known = previous.get(url);
    const keepPrevious = status === "unchecked" && known !== undefined;
    merged.set(url, keepPrevious ? known : status);
  }
  return merged;
}
