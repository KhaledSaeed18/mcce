# 03. Data schema and build

## Recommendation: typed source, generated index

The catalog is hand-authored TypeScript in `src/config/resources/`, and a
build script compiles it into `src/data/resources-index.json`, which the
routes load lazily. This is the option asked for as "most advanced and
scalable", and it is the one that fits the repo as it stands.

Why this and not the two simpler options:

| Option | Fails on |
|---|---|
| Hand-edited JSON in `src/data/` | Breaks the layer map rule that `src/data/` is machine-written (`CLAUDE.md`, layer map). No type checking while authoring, so a bad badge value ships |
| TypeScript in `src/config/` imported straight into the route | Type-safe, but 300 plus entries and 130 repos land in the route chunk, nothing checks URLs or icons, and derived fields (search haystacks, counts, icon resolution) are recomputed in the browser on every load |
| Typed source plus generated index (recommended) | Nothing. It mirrors `scripts/sync-drive` writing `src/data/drive-index.json`, keeps authoring type-checked, and gives one place to validate, verify links, resolve icons, and stamp a `generatedAt` for the sitemap |

What the generated step adds that the source alone cannot:

1. Invariants types cannot express: unique ids, unique canonical URLs, every
   `courses` code exists in `CURRICULUM`, every `thesisStages` id exists,
   every `repos[].resourceId` points at a tool, every category has at least
   one entry, no `deprecated` rows.
2. Link check results. A HEAD request per URL, run in CI on a schedule, so
   the site never fetches external hosts at render time.
3. Icon resolution. Brand SVGs are fetched once from svgl into
   `public/resources/icons/` and the index records which tools have one, so
   the card never guesses.
4. Search haystacks prebuilt (lowercased name, aliases, tags, description),
   so `searchResources` is as cheap as `searchNodes`
   (`src/lib/drive/search.ts:30`).
5. A `meta.generatedAt` and per-category counts for the hero copy and the
   sitemap `lastmod`.

Runtime loading copies `driveIndexQueryOptions`
(`src/lib/drive/queries.ts:4-11`): a `queryOptions` whose `queryFn` dynamically
imports the JSON, `staleTime: Infinity`, ensured in each route's `loader`.
The service worker's `cacheFirst` for `/assets/` (`public/sw.js`) then keeps
the hub usable offline like the Drive index.

## Types

Lives in `src/lib/resources/types.ts`. Shown as a contract, not code to paste.

```
ResourceCategoryId    union of the 25 category ids in 02-taxonomy.md
ResourceGroupId       "everyday" | "coursework" | "research" | "access"
AccessBadge           "free" | "freemium" | "trial" | "paid" | "student" | "university"
BadgeFilter           AccessBadge | "open-source"
VerificationState     "verified" | "liu" | "pending"
ResourceStatus        "recommended" | "experimental"
ThesisStageId         union of the 12 stage ids
ThesisTerm            "A" | "B"
Platform              "web" | "desktop" | "cli" | "library" | "dataset" | "service" | "reference"

Resource (authored)
  id                  kebab slug, unique, stable forever (URL and icon file name)
  name                display name
  description         one line, max 140 characters, plain sentence, no trailing period rule enforced by validator
  url                 official page, https, no query string, no trailing slash
  category            ResourceCategoryId
  access              AccessBadge
  isOpenSource        boolean
  platform            Platform[]  (at least one)
  featured?           boolean
  status?             ResourceStatus (default "recommended")
  verification?       VerificationState (default "verified")
  verifiedOn          ISO date
  requiresAccount?    boolean
  note?               one line: licensing, hardware, or a setup caveat
  privacyNote?        one line for cloud and AI tools
  aliases?            string[] for search (e.g. "draw.io" for diagrams.net)
  tags?               string[] for search
  thesisStages?       ThesisStageId[]
  courses?            string[] validated against CURRICULUM, unused by UI in v1
  brandIcon?          svgl slug; absent means category icon or monogram
  repoId?             id of the matching Repository, for the cross-link

Repository (authored)
  id                  kebab slug of "owner-name"
  owner               GitHub owner
  name                repository name
  description         one line
  domain              RepoDomainId
  license             SPDX id or "custom" or "none"
  reuseClass          "permissive" | "weak-copyleft" | "copyleft" | "check"
  maintenance         "active" | "steady" | "dormant" | "archived" | "unverified"
  languages?          string[]
  note?               one line, license or maintenance caveat
  resourceId?         id of the matching Resource
  courses?            string[]
  verifiedOn          ISO date

ResourcesIndex (generated)
  meta                { generatedAt, toolCount, repoCount, countsByCategory, countsByBadge, countsByStage, countsByDomain }
  tools               ResourceEntry[]   (Resource plus: url as-is, haystack, icon: IconDescriptor, linkStatus)
  repos               RepoEntry[]       (Repository plus: url built from owner/name, haystack, linkStatus)

IconDescriptor
  { kind: "brand", light: "/resources/icons/<id>.svg", dark?: "/resources/icons/<id>-dark.svg" }
  | { kind: "category" }
  | { kind: "monogram", text: "Zo" }

LinkStatus              "ok" | "redirect" | "broken" | "unchecked"
```

`SearchFilterValues` for the hub is its own type
(`ResourceFilterValues { q: string; category?: ResourceCategoryId; badge?: BadgeFilter[] }`)
so it never collides with the Drive one in `src/lib/drive/types.ts:68-74`.

## Authoring layout

```
src/config/resources/
  categories.ts          RESOURCE_CATEGORIES: ordered array with id, group, label, tagline, icon
  badges.ts              ACCESS_BADGE_LABELS, BADGE_FILTER_OPTIONS, badge colour tokens, one-line explanations for tooltips
  thesis-stages.ts       THESIS_STAGES with order, term, note, defaultPick
  repo-domains.ts        REPO_DOMAINS, REUSE_CLASS_LABELS, MAINTENANCE_LABELS
  search-synonyms.ts     RESOURCE_SEARCH_SYNONYMS (pdf -> ilovepdf, latex -> overleaf typst, cite -> zotero ...), same shape as SEARCH_SYNONYMS in src/config/search.ts:6
  copy.ts                page titles, descriptions, empty state, suggest block, RESOURCES_PAGE_PATH and siblings
  resources-mark.ts      hero mark geometry, pattern of src/config/exams-mark.ts
  catalog/
    ai-assistants.ts     export const AI_ASSISTANTS: Resource[]
    literature.ts
    ... one file per category, 25 files
  repos/
    writing.ts           export const WRITING_REPOS: Repository[]
    ... one file per domain, 23 files
  catalog.ts             RESOURCE_CATALOG = [...AI_ASSISTANTS, ...] and REPO_CATALOG. An aggregation point, not a barrel re-export
```

Constants files have no line limit (`CLAUDE.md`, file size table), so a
category file with 30 entries is fine. Each entry is one object literal;
Biome formats it.

## Build script

```
scripts/build-resources/
  index.ts        reads RESOURCE_CATALOG and REPO_CATALOG, runs validate, icons, links, writes the index
  validate.ts     invariants listed above; exits non-zero with every violation printed
  icons.ts        for each brandIcon: fetch from svgl, write public/resources/icons/<id>.svg (and -dark when svgl has a dark route), record in a manifest
  links.ts        HEAD (fallback GET) with a timeout and concurrency cap; never fails the build, stamps linkStatus
  haystack.ts     builds the lowercase search string per entry
  *.test.ts       validator and haystack tests, same style as scripts/sync-drive/*.test.ts
```

`package.json` gains `"build:resources": "tsx scripts/build-resources/index.ts"`
and a `--skip-links` flag for local runs. The script imports from
`../../src/config/resources/catalog` exactly as `scripts/sync-drive/sitemap.ts:1-3`
imports from `src/config`.

Two GitHub Actions entries, both mirroring the weekly Drive sync:

- On pull request touching `src/config/resources/**`: run `build:resources
  --skip-links` and fail if the committed `src/data/resources-index.json` or
  `public/resources/icons/` differ from the output.
- Weekly: run with links on, open a PR when any `linkStatus` changed to
  `broken` or `redirect`. Never auto-delete.

## svgl specifics

- svgl publishes its SVGs in the `pheralb/svgl` repository under
  `static/library/` and exposes `https://api.svgl.app` for lookup by name.
  The build fetches by the `brandIcon` slug, which the author copies from the
  svgl page URL, and pins the fetched file into the repo. No runtime fetch,
  because the viewer CSP and the offline cache would both break it.
- Some svgl entries have separate light and dark files. The build stores both
  and the card shows one per theme with the `dark:hidden` / `hidden dark:block`
  pair already used in `src/components/marketing/page-hero-decoration.tsx:25-31`.
- svgl states the logos belong to their owners. Using a logo to identify the
  product it belongs to is nominative use, but the plan records this as an
  open item so the decision is explicit.
- Every fetched SVG is passed through a strip step (remove `<script>`,
  `on*` attributes, external `href`) before it is written. Served as
  `<img src>` so it cannot run script anyway.

## Sitemap dates

`scripts/sync-drive/sitemap.ts:19-31` defines `StaticPage.lastmod` as either a
hand-stamped date or `TRACKS_INDEX`. Add a third sentinel `TRACKS_RESOURCES`
that reads `meta.generatedAt` from `src/data/resources-index.json`, so the
four hub pages update their `lastmod` whenever the catalog is rebuilt, and a
content-free refactor does not touch it.

## Contribution path

- Students: contact page topic "A tool to add" (see `01`), maintainer adds
  the entry.
- Pull requests: `CONTRIBUTING.md` gains a section "Adding a resource" with
  the required fields, the badge rules from `02`, and the command to run.
- Removal: delete the row, say why in the commit body ("free tier removed",
  "project archived"). No `deprecated` rows lingering in the file.
