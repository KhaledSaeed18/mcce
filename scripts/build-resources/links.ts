import type { LinkStatus } from "../../src/lib/resources/types";

const FETCH_TIMEOUT_MS = 15_000;
const CONCURRENCY = 8;
const USER_AGENT = "mcce-resources-link-check (+https://mcce.khaledsaeed.tech)";

const BOT_BLOCK_STATUSES = new Set([401, 403, 405, 429]);

/**
 * A redirect is a note, not a failure: the URL still works, it just moved.
 * A bot block or rate limit says nothing about the page, so it stays unchecked
 * rather than raising a false alarm.
 */
export function statusFromResponse(
  status: number,
  redirected: boolean
): LinkStatus {
  if (BOT_BLOCK_STATUSES.has(status)) {
    return "unchecked";
  }
  if (status >= 400) {
    return "broken";
  }
  return redirected ? "redirect" : "ok";
}

async function probe(url: string): Promise<LinkStatus> {
  const options = {
    headers: { "user-agent": USER_AGENT },
    redirect: "follow" as const,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  };
  try {
    const head = await fetch(url, { ...options, method: "HEAD" });
    // Some hosts refuse HEAD; a GET settles it before calling the link broken.
    if (head.status === 405 || head.status === 403) {
      const get = await fetch(url, { ...options, method: "GET" });
      return statusFromResponse(get.status, get.redirected);
    }
    return statusFromResponse(head.status, head.redirected);
  } catch {
    // Timeouts and TLS failures are transient more often than not.
    return "unchecked";
  }
}

/** Checks every URL with a small concurrency cap and never throws. */
export async function checkLinks(
  urls: string[]
): Promise<Map<string, LinkStatus>> {
  const results = new Map<string, LinkStatus>();
  const queue = [...new Set(urls)];

  async function drain(): Promise<void> {
    const next = queue.shift();
    if (!next) {
      return;
    }
    results.set(next, await probe(next));
    return drain();
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, drain));
  return results;
}
