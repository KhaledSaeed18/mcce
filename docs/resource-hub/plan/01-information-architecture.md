# 01. Information architecture

## What the hub is

A curated directory of external tools for MCCE students, in three views over
two data collections:

| View | Collection | Question it answers |
|---|---|---|
| Tools | `tools` | What do I open for this kind of task, and what does it cost |
| Thesis toolkit | `tools` filtered and ordered by thesis stage | What do I use at this point of CENG695A or CENG695B |
| Open source index | `repos` | Which public GitHub repository do I clone, and under what license |

The thesis toolkit does not have its own entries. Every tool that belongs to a
thesis stage carries `thesisStages` on the same record, so nothing is
maintained twice. Repositories are a separate collection because their fields
(owner, license, reuse class, maintenance) do not fit a tool card.

## Pages and routes

All hub routes sit under one prefix so the nav group highlight works without
new matching logic: `findActiveNavGroupValue` matches on `pathname.startsWith`
in `src/lib/nav-groups.ts:13`.

| Route | File | Purpose | Indexed |
|---|---|---|---|
| `/resources` | `src/routes/resources.index.tsx` | Full tools directory, every category as a section, filter bar on top | Yes |
| `/resources/$category` | `src/routes/resources.$category.tsx` | One category, same grid, no category filter | Yes |
| `/resources/thesis` | `src/routes/resources.thesis.tsx` | Tools grouped by thesis stage, in order from topic framing to defense | Yes |
| `/resources/open-source` | `src/routes/resources.open-source.tsx` | GitHub repositories grouped by domain, with license and maintenance columns | Yes |

Route file naming follows the flat dot convention already used by
`src/routes/course.index.tsx` and `src/routes/course.$code.tsx`.

Not in v1, recorded so nobody adds them by accident:

- No per-tool detail route (`/resources/$category/$slug`). Cards link out. A
  page per tool would be 300 thin pages and an SEO liability.
- No inline "tools for this course" strip on `/course/$code`. Course tags are
  out of v1 scope by decision. The schema keeps an optional `courses` field so
  this can land later without a migration.

## Page composition

Every hub page follows the pattern in `src/routes/exams.tsx:34-50`: a hero,
a jump row, sections, and a `<main>` with the shared spacing classes
(`mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14`).

### `/resources`

1. `ResourcesHero` built on `PageHero` (`src/components/marketing/page-hero.tsx:17`)
   with badge `RESOURCES`, a title and highlight, a one-line description that
   states the entry count and category count, and a decoration mark built like
   `ExamPapersMark` with its constants in `src/config/resources-mark.ts`
   (pattern: `src/config/exams-mark.ts`).
2. `ResourceFilters`: text input, category select, badge toggles. See `04`.
3. `ResourceCategoryJump`: category chips with counts, same shape as
   `ExamCourseJump` (`src/components/exams/exam-course-jump.tsx:9-24`). Hidden
   when a category filter is active.
4. One `ResourceCategorySection` per category group in taxonomy order, each
   with an `h2`, a one-line tagline, and a `ResourceGrid`.
5. A closing `SectionDividerDots` and a short "Suggest a tool" block that links
   to `/contact` with a new topic preset (see contact note below).

When filters are active the sections collapse into a single results grid with
a result count, matching how `/search` switches between idle and results.

### `/resources/$category`

Same as above minus the category select and jump row. The hero title is the
category label, the description is the category tagline. Unknown category
renders a not-found block like `CourseNotFound`
(`src/components/course/course-not-found.tsx`) with a link back to `/resources`.

### `/resources/thesis`

1. `ThesisHero` on `PageHero`, badge `THESIS`, description names CENG695A and
   CENG695B and says the list follows the two terms in order.
2. `ThesisStageJump`: one chip per stage, labelled by stage number and term
   (A or B).
3. One `ThesisStageSection` per stage: `h2` with the stage name, the term chip,
   a two-sentence "what happens here" note from `src/config/resources/thesis-stages.ts`,
   the primary picks first, then the alternates. Cards are the same
   `ResourceCard` as the tools page.
4. A "Default stack" summary table at the end, one row per stage, taken from
   the stage config. This is the one-recommendation-per-stage view the drafts
   agree on.

Filters on this page: `q` and `badge` only. Stage is a jump, not a filter.

### `/resources/open-source`

1. `OpenSourceHero`, badge `OPEN SOURCE`, description states the count and the
   rule that every row is a public GitHub repository.
2. `RepoFilters`: text input, domain select, reuse-class select, maintenance
   select.
3. `RepoDomainSection` per domain: `h2`, tagline, `RepoGrid` of `RepoCard`.
4. A short "Before you clone" checklist block from config (license first,
   last commit, tagged release, README reaches a working example, pin the
   commit and cite it).

## Navigation

Add a fourth group to `NAV_GROUPS` in `src/config/navigation.ts:204-229`:

| Field | Value |
|---|---|
| `label` | Resources |
| `value` | `resources` |
| `tagline` | Tools, thesis workflow, and open source, with what each one costs. |
| `icon` | `WrenchIcon` or `ToolboxIcon` from lucide (pick one that is not already used in the file) |
| `color` | `chart-4` (the only chart token not used by the three current groups; `chart-2` is used by the sitemap Drive group) |
| `entries` | Tools (`/resources`), Thesis toolkit (`/resources/thesis`), Open source index (`/resources/open-source`) |

Three entries is under `MEGA_MENU_TWO_COLUMN_THRESHOLD` (`navigation.ts:232`),
so the panel renders one column. `NavRoute` (`navigation.ts:33-49`) gains the
three literal paths.

Group order: Browse, Program, Resources, About. Resources sits before About
because it is a student-facing feature, not site meta.

## Sitemap page, footer, home

- `src/config/sitemap.ts`: add a `SitemapGroup` "Resources" with the three
  entries, color `chart-4`, and extend the `to` union at `sitemap.ts:15-30`.
- `src/config/footer.ts`: add the three links to the Program column, or add a
  fourth "Resources" column. Recommendation: add to the Program column to keep
  the footer at three columns on desktop. The `to` union at `footer.ts:8-24`
  gains the three paths.
- Home feature grid: optional `FeatureCardItem` in `src/config/features.ts:23`
  pointing at `/resources`. `FeatureRoute` (`features.ts:10`) gains the path.
  Recommendation: yes, in Phase 2, because the home page is where most
  students land.

## Command palette

`useCommandPalette` (`src/hooks/use-command-palette.ts:42-47`) searches Drive
nodes only. In Phase 4, add a second result group for tools so typing
"zotero" in the palette jumps to `/resources?q=zotero`. The palette already
lazy-loads the Drive index through `driveIndexQueryOptions`; the resources
index would load the same way via `resourcesIndexQueryOptions`. Not in Phase
2, because the palette result list would need a second section and a
different `goTo` handler.

## Contact page

`CONTACT_TOPICS` in `src/config/contact.ts:94-98` gains a topic
`{ label: "A tool to add", value: "resource" }`. The "Suggest a tool" block on
`/resources` links to `/contact?topic=resource` if the contact route accepts a
topic search param; if it does not, the block links to `/contact` and the
copy asks the student to pick that topic. Confirm in Phase 2.

## Copy

All page copy lives in `src/config/resources/copy.ts`, short and direct, no
exclamation marks:

- Hero title: "Every tool worth opening," highlight: "with what it costs."
- Hero description: "{count} tools across {categories} categories. Each card
  shows the cost up front. Nothing here is sponsored."
- Thesis title: "The thesis, stage by stage," highlight: "one tool at a time."
- Open source title: "Public repositories," highlight: "with the license read
  for you."
- Empty state: "Nothing matches." with a "Clear filters" link.
- Suggest block: "Missing something? Send the link and one line on why."

Final wording is an open item.
