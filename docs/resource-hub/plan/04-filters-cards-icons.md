# 04. Filters, cards, and icons

## Filter state in the URL

The hub copies the `/search` contract in `src/routes/search.tsx:34-43`:
`validateSearch` turns raw params into a typed object, the page reads it
with `Route.useSearch()`, and every change goes through
`navigate({ search: (prev) => ({ ...prev, ...patch }) })`
(`search.tsx:54-59`). Filtered views are therefore shareable, survive reload,
and work with the back button.

### Params per route

| Route | `q` | `category` | `badge` | `stage` | `domain` | `license` | `maintenance` |
|---|---|---|---|---|---|---|---|
| `/resources` | text | one category id | comma list of badge filters | | | | |
| `/resources/$category` | text | (param) | comma list | | | | |
| `/resources/thesis` | text | | comma list | hash jump only | | | |
| `/resources/open-source` | text | | | | one domain id | one reuse class | one maintenance value |

- `readOptionalString` (`src/lib/search-params.ts:1`) handles the single
  values. A sibling `readOptionalList(value, allowed)` splits on commas and
  drops unknown ids, so a hand-edited URL cannot inject an invalid filter.
- Unknown `category` in the search param is dropped, not errored. Unknown
  `$category` in the path renders the not-found block.
- `q` is kept as-is (`typeof search.q === "string" ? search.q : ""`), same as
  `search.tsx:41`.

### Replace versus push

`/search` pushes a history entry on every keystroke. For the hub, `q` changes
use `replace: true` and select or toggle changes push, so the back button
steps between filter states rather than between characters. This is a small
divergence from `/search` and is listed as an open item because the
behaviour should probably be aligned in both places.

### Filter bar

`ResourceFilters` mirrors `SearchFilters`
(`src/components/drive/search-filters.tsx:57-101`):

1. Text input with an `sr-only` label, placeholder "Search tools...",
   id from a module constant.
2. Category select using `SearchFilterSelect`
   (`src/components/drive/search-filter-select.tsx:23`) with `allLabel`
   "All categories". Options come from `RESOURCE_CATEGORIES`, not from the
   data, so an empty category still lists.
3. Badge toggles: seven `ResourceBadgeToggle` buttons in a wrapping row, each
   a `<button aria-pressed>` that adds or removes its id from `badge`. The
   badge filter is multi-select because "Free or Student" is a common
   question. Toggles render the same `ResourceBadge` visual so the legend and
   the filter are the same component.
4. Result line: "{n} tools" in an `aria-live="polite"` element, updated by
   `useResourceResults`.
5. "Clear filters" link, visible only when any filter is set, navigates to
   the bare route.

On the category route the select is omitted. On the open source route the
badge toggles are replaced by three selects (domain, license, maintenance).

### Hooks

| Hook | Concern |
|---|---|
| `useResourceFilters(route)` | Returns `values` from `useSearch` and a memoised `onChange(patch)` that calls `navigate` with replace or push per field |
| `useResourceResults(index, values)` | Memoised `filterResources` then `searchResources`; returns `results`, `hasCriteria`, `count`, and `sections` (grouped by category when idle, flat when filtering). Same shape as `useDriveSearch` (`src/hooks/use-drive-search.ts:8-38`) |
| `useRepoResults(index, values)` | Same for repositories, grouped by domain |

Pure functions in `src/lib/resources/`:

| File | Function | Note |
|---|---|---|
| `filter.ts` | `filterResources(tools, { category, badge })` | `badge` list is OR within the list |
| `search.ts` | `searchResources(tools, q)` | Token scoring like `scoreNode` (`src/lib/drive/search-score.ts:54-71`): name word start 6, name partial 4, alias 3, tag 2, description 1; every token must hit |
| `group.ts` | `groupByCategory`, `groupByStage`, `groupByDomain` | Keeps taxonomy order, drops empty groups when filtering |
| `facets.ts` | `countByBadge(tools)` | For toggle counts |

## Card anatomy

`ResourceCard` is an `<a href target="_blank" rel="noopener">` because every
card leaves the site, same as `DriveDirectCard`
(`src/components/marketing/drive-direct-card.tsx:21`). It reuses that card's
hover and active translate classes (`drive-direct-card.tsx:9-13`) so the hub
reads as part of the site.

```
+----------------------------------------------------------+
| [icon tile]                                 [arrow ↗]    |
| Zotero                                                   |
| Reference manager with browser capture and PDF notes.    |
| [Free] [Open Source]              Account required       |
| Confirm with the LIU library      (only when liu)        |
+----------------------------------------------------------+
```

- Icon tile: 40px square, `border-2`, chart-colour drop shadow by category
  like the Drive glyph tile in `drive-direct-card.tsx:23-28`.
- Name in `font-head text-lg`; description in `text-sm text-muted-foreground`,
  clamped to two lines.
- Badges use the existing `Badge` primitive (`src/components/ui/badge.tsx:7-28`),
  variant `outline`, with a background token per access value. Text label is
  always present; colour is never the only carrier.
- Footnote row: `requiresAccount`, `status: experimental` ("New, 2026"), and
  the LIU line when `verification: "liu"`.
- Domain of the URL in `font-mono text-xs` under the name is optional; the
  drafts split on it. Recommendation: omit, the card is already dense.
- Cards have equal height per row (`h-full`) so the grid stays calm.

`RepoCard` differs: title is `owner/name` in mono, the tile shows the GitHub
mark unless `resourceId` resolves to a tool with a brand icon, the badge row
shows the license (`MIT`) and reuse class (`Permissive`), and a maintenance
chip appears when not `active`.

Grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`, one card per column, no
masonry.

## Icon resolution

Hybrid, resolved at build time into `IconDescriptor` (see `03`):

1. `brandIcon` set and the svgl fetch succeeded: brand SVG, self-hosted from
   `public/resources/icons/`, rendered as `<img width="24" height="24"
   loading="lazy" alt="">`. Dark variant when svgl ships one.
2. Otherwise: the category's lucide icon from `RESOURCE_CATEGORIES`, following
   `COURSE_ICON_BY_CODE` (`src/config/courses.ts:28`) and the tile in
   `MarginChip` (`src/components/margin-chip.tsx:16-21`).
3. Otherwise (should not happen, every category has an icon): a monogram,
   the first two letters of the name in `font-head`, for repositories whose
   owner has no brand.

`alt=""` is correct: the name is next to the icon as text, so the image is
decorative.

Which tools get a brand icon is data, not code. The author checks svgl for a
slug; if none exists the field stays empty and the category icon shows.
Expect roughly half of the catalog to have one (the big SaaS names, the
frameworks, the editors); the long tail of academic tools will use category
icons, and that is fine because the category icon still tells the student
what kind of thing it is.

## Empty and edge states

- No results: `Empty` primitive (`src/components/ui/empty.tsx`) with "Nothing
  matches." and a "Clear filters" link.
- Category page for an unknown id: not-found block with a link to
  `/resources`.
- A tool with `linkStatus: "broken"` still renders; the weekly job files a
  PR, a human decides. No red badge on the card.
- Loading: routes ensure the index in `loader`, so there is no client
  loading state beyond the existing `RoutePending`.

## Jump rows and anchors

Category and stage sections carry `id` attributes; jump chips are `Link`s
with `hash`, exactly like `ExamCourseJump`
(`src/components/exams/exam-course-jump.tsx:13-21`). The recent scroll fix in
`fix(navigation): preserve hash in scroll restoration` (commit `7c19568`)
already handles the hash on load.

## Motion

Hero uses `PageHeroMotion` and the shared `HERO_DRIFT`
(`src/config/page-hero.ts:9-16`). Cards do not animate on mount; 300 cards
with staggered entry would be slow and noisy. Only `motion` is used, per the
project rule.
