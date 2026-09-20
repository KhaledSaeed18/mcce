import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { BrandIconFiles } from "../../src/lib/resources/icon";
import { isSvgDocument, sanitiseSvg } from "./svg";

const SVGL_API_URL = "https://api.svgl.app";
const FETCH_TIMEOUT_MS = 15_000;

interface SvglRoute {
  dark: string;
  light: string;
}

interface SvglEntry {
  route: string | SvglRoute;
  title: string;
}

export interface BrandIconRequest {
  id: string;
  title: string;
}

export interface BrandIconResult {
  files: Map<string, BrandIconFiles>;
  missing: string[];
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`${url}: HTTP ${response.status}`);
  }
  return response.text();
}

/** svgl titles are matched case-insensitively; the catalog copies them from the svgl page. */
export function indexSvglByTitle(entries: SvglEntry[]): Map<string, SvglEntry> {
  const byTitle = new Map<string, SvglEntry>();
  for (const entry of entries) {
    const key = entry.title.trim().toLowerCase();
    if (!byTitle.has(key)) {
      byTitle.set(key, entry);
    }
  }
  return byTitle;
}

async function writeIcon(url: string, path: string): Promise<void> {
  const source = await fetchText(url);
  if (!isSvgDocument(source)) {
    throw new Error(`${url}: not an SVG document`);
  }
  writeFileSync(path, `${sanitiseSvg(source)}\n`);
}

/**
 * Downloads one file per requested brand (two when svgl has a dark variant)
 * into the icon directory. Missing titles are reported, never fatal, so a
 * renamed svgl entry degrades to the category icon instead of failing CI.
 */
export async function fetchBrandIcons(
  requests: BrandIconRequest[],
  iconDir: string
): Promise<BrandIconResult> {
  mkdirSync(iconDir, { recursive: true });
  const catalog = JSON.parse(await fetchText(SVGL_API_URL)) as SvglEntry[];
  const byTitle = indexSvglByTitle(catalog);
  const files = new Map<string, BrandIconFiles>();
  const missing: string[] = [];

  const writes = requests.map(async (request) => {
    const entry = byTitle.get(request.title.trim().toLowerCase());
    if (!entry) {
      missing.push(`${request.id}: no svgl entry titled "${request.title}"`);
      return;
    }
    const light =
      typeof entry.route === "string" ? entry.route : entry.route.light;
    const dark = typeof entry.route === "string" ? undefined : entry.route.dark;
    await writeIcon(light, join(iconDir, `${request.id}.svg`));
    if (dark) {
      await writeIcon(dark, join(iconDir, `${request.id}-dark.svg`));
    }
    files.set(request.id, { hasDark: Boolean(dark) });
  });
  await Promise.all(writes);

  return { files, missing };
}
