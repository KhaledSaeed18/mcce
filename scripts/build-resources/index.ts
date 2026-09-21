import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import {
  REPO_CATALOG,
  RESOURCE_CATALOG,
} from "../../src/config/resources/catalog";
import type { BrandIconFiles } from "../../src/lib/resources/icon";
import type { LinkStatus, ResourcesIndex } from "../../src/lib/resources/types";
import { buildResourcesIndex, repoUrl } from "./build-index";
import { buildValidationContext } from "./context";
import { fetchBrandIcons } from "./icons";
import { checkLinks } from "./links";
import { validateCatalog } from "./validate";

const OUTPUT_PATH = resolve(process.cwd(), "src/data/resources-index.json");
const ICON_DIR = resolve(process.cwd(), "public/resources/icons");

const skipLinks = process.argv.includes("--skip-links");
const skipIcons = process.argv.includes("--skip-icons");
/** Compare against the committed index instead of writing; CI uses it to catch a stale build. */
const checkOnly = process.argv.includes("--check");

function readPreviousIndex(): ResourcesIndex | null {
  if (!existsSync(OUTPUT_PATH)) {
    return null;
  }
  return JSON.parse(readFileSync(OUTPUT_PATH, "utf8")) as ResourcesIndex;
}

function fail(lines: string[]): never {
  for (const line of lines) {
    console.error(`  ${line}`);
  }
  console.error(`${lines.length} problem(s). Nothing written.`);
  process.exit(1);
}

async function resolveIcons(): Promise<Map<string, BrandIconFiles>> {
  const requests = RESOURCE_CATALOG.filter((tool) => tool.brandIcon).map(
    (tool) => ({
      id: tool.id,
      // brandIcon is set by the filter above; the map keeps the type narrow.
      title: tool.brandIcon ?? "",
    })
  );
  if (skipIcons) {
    // Without a fetch the committed icon files are the source of truth.
    return new Map(
      requests
        .filter((request) => existsSync(join(ICON_DIR, `${request.id}.svg`)))
        .map((request) => [
          request.id,
          { hasDark: existsSync(join(ICON_DIR, `${request.id}-dark.svg`)) },
        ])
    );
  }
  console.log(`Fetching ${requests.length} brand icons from svgl...`);
  const { files, missing } = await fetchBrandIcons(requests, ICON_DIR);
  for (const line of missing) {
    console.warn(`  missing icon: ${line}`);
  }
  return files;
}

async function resolveLinks(
  previous: ResourcesIndex | null
): Promise<Map<string, LinkStatus>> {
  if (skipLinks) {
    // Keep the statuses from the last full run rather than resetting them.
    const entries = previous
      ? [...previous.tools, ...previous.repos].map(
          (entry) => [entry.url, entry.linkStatus] as const
        )
      : [];
    return new Map(entries);
  }
  const urls = [
    ...RESOURCE_CATALOG.map((tool) => tool.url),
    ...REPO_CATALOG.map((repo) => repoUrl(repo)),
  ];
  console.log(`Checking ${urls.length} links...`);
  const statuses = await checkLinks(urls);
  const broken = [...statuses].filter(([, status]) => status !== "ok");
  for (const [url, status] of broken) {
    console.warn(`  ${status}: ${url}`);
  }
  return statuses;
}

async function main() {
  const problems = validateCatalog(
    RESOURCE_CATALOG,
    REPO_CATALOG,
    buildValidationContext()
  );
  if (problems.length > 0) {
    fail(problems);
  }

  const previous = readPreviousIndex();
  const [icons, linkStatuses] = await Promise.all([
    resolveIcons(),
    resolveLinks(previous),
  ]);
  const index = buildResourcesIndex({
    generatedAt:
      checkOnly && previous
        ? previous.meta.generatedAt
        : new Date().toISOString(),
    icons,
    linkStatuses,
    repos: REPO_CATALOG,
    tools: RESOURCE_CATALOG,
  });

  const output = `${JSON.stringify(index, null, 2)}\n`;
  if (checkOnly) {
    if (previous && output === readFileSync(OUTPUT_PATH, "utf8")) {
      console.log("resources-index.json is up to date.");
      return;
    }
    fail([
      "src/data/resources-index.json is stale. Run pnpm build:resources and commit the result.",
    ]);
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, output);
  console.log(
    `Wrote ${index.meta.toolCount} tools and ${index.meta.repoCount} repos to ${OUTPUT_PATH}`
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
