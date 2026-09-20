# 10. Rollout

Five phases. Each ends with a merged PR on `main`, in branches named per the
git rules (`feat/resource-hub-data`, `feat/resource-hub-pages`, ...), with
one logical change per commit and no refactor mixed into a feature commit.

## Phase 0: sign-off and verification (no code)

Deliverables:

- Every item in `11-open-items.md` answered.
- The Phase 0 verification list in `05` worked through: LIU library
  portal and subscriptions, MATLAB, Turnitin, Papers with Code, the 2026
  writing tools, the owner corrections, STK and Keil terms.
- The final badge for each `liu` row written into `06` so authoring does
  not guess.

Done when: `06` and `07` have no `verify` flags left, or each remaining one
has a written decision ("keep with note", "drop").

## Phase 1: data foundation

Deliverables:

- `src/lib/resources/types.ts`, `src/config/resources/` taxonomy files,
  the 25 catalog files and 22 repo files authored from `06` and `07`.
- `scripts/build-resources/` with the validator, haystack builder, icon
  fetch, link check, and tests. `build:resources` script in `package.json`.
- First `src/data/resources-index.json` and `public/resources/icons/`
  committed.
- `src/lib/resources/` pure functions with tests: filter, search, group,
  facets, icon.
- PR workflow that fails when the committed index is stale.

Done when: `pnpm fullcheck` passes, the validator reports zero violations,
every category has entries, and `build:resources --skip-links` is
reproducible (same output twice).

Commit shape: `feat(resources): add resource types and taxonomy config`,
`feat(resources): add tool catalog`, `feat(resources): add repository
catalog`, `feat(scripts): add resources build with validation and icons`,
`feat(resources): add filter, search, and grouping utilities`.

## Phase 2: tools hub

Deliverables:

- `/resources` and `/resources/$category` with hero, filters, jump row,
  sections, cards, empty state, suggest block.
- `useResourceFilters`, `useResourceResults`, `readOptionalList`.
- Head builders and JSON-LD for the two pages.
- Nav group, sitemap page group, footer links, contact topic, `STATIC_PAGES`
  rows and category rows, `llms.txt`, README bullet.
- Optional home feature tile.

Done when: a keyboard-only pass covers filter, toggle, jump, card, and
clear; Lighthouse accessibility is 100 on both pages; the pages render
offline after one online visit; `pnpm fullcheck` passes.

## Phase 3: thesis toolkit and open source index

Deliverables:

- `/resources/thesis` with stage sections, default stack table, route map.
- `/resources/open-source` with domain sections, license and maintenance
  columns, the before-you-clone checklist.
- Head builders and JSON-LD for both.
- Nav entries switched from placeholders to live links (if Phase 2 shipped
  the group with two entries hidden).

Done when: every stage renders at least one featured pick; every repo row
links to a tool card where `resourceId` is set; `pnpm fullcheck` passes.

## Phase 4: care and reach

Deliverables:

- Weekly link check workflow opening a PR on `broken` or `redirect`.
- Command palette tool results.
- `CONTRIBUTING.md` authoring section.
- First quarterly badge sweep scheduled: AI and freemium rows, student
  programs.

Later, only after usage data:

- Course-page strips (`courses` field populated, `CourseResourceStrip`).
- Per-category OG images.
- Curated "start here" sets per assignment type.

## What is explicitly not scheduled

- Ratings, comments, or any user-generated content on the hub.
- Runtime fetching of anything external.
- A per-tool page.
- Arabic copy (the site is English only today; revisit with the site).
