import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
  REPO_CATALOG,
  RESOURCE_CATALOG,
} from "../../src/config/resources/catalog";
import type { BrandIconFiles } from "../../src/lib/resources/icon";
import type { LinkStatus } from "../../src/lib/resources/types";
import { buildResourcesIndex, repoUrl } from "./build-index";
import { buildValidationContext } from "./context";
import { fetchBrandIcons } from "./icons";
import { checkLinks } from "./links";
import { validateCatalog } from "./validate";

const OUTPUT_PATH = resolve(process.cwd(), "src/data/resources-index.json");
const ICON_DIR = resolve(process.cwd(), "public/resources/icons");

const skipLinks = process.argv.includes("--skip-links");
const skipIcons = process.argv.includes("--skip-icons");

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
    // Without a fetch the committed icon files are the source of truth, so
    // every requested brand is assumed present in its light form.
    return new Map(requests.map((request) => [request.id, { hasDark: false }]));
  }
  console.log(`Fetching ${requests.length} brand icons from svgl...`);
  const { files, missing } = await fetchBrandIcons(requests, ICON_DIR);
  for (const line of missing) {
    console.warn(`  missing icon: ${line}`);
  }
  return files;
}

async function resolveLinks(): Promise<Map<string, LinkStatus>> {
  if (skipLinks) {
    return new Map();
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

  const [icons, linkStatuses] = await Promise.all([
    resolveIcons(),
    resolveLinks(),
  ]);
  const index = buildResourcesIndex({
    generatedAt: new Date().toISOString(),
    icons,
    linkStatuses,
    repos: REPO_CATALOG,
    tools: RESOURCE_CATALOG,
  });

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(index, null, 2)}\n`);
  console.log(
    `Wrote ${index.meta.toolCount} tools and ${index.meta.repoCount} repos to ${OUTPUT_PATH}`
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
