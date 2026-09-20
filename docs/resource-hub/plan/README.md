# Resource Hub: master plan

Unified plan for the MCCE Resource Hub, merged from the 40 research drafts in
`docs/resource-hub/` and `docs/resource-hub/thesis/`. This folder is the single
source for scope, structure, data, UX, and rollout. The drafts stay as raw
input and are not edited.

Planning only. Nothing in `src/`, `scripts/`, `public/`, or config changes until
the open items in `11-open-items.md` are signed off.

## Decisions already taken

Confirmed in the planning conversation on 2026-09-20:

| Decision | Choice |
|---|---|
| Scope of v1 | Tools hub plus a thesis area (stage toolkit and GitHub index) in the same release |
| Grouping axis | Tool type only. No course-code grouping or course filter in v1 |
| Badge set | Free, Freemium, Paid, Student, University Access, Open Source, Trial |
| Catalog size | Everything that survives merge and dedupe, 200 plus entries |
| Filters | URL search params, same pattern as `/search` |
| Navigation | New top-level nav group |
| Icons | Hybrid: brand SVG from svgl.app, category icon, monogram fallback |
| Data home | Recommendation requested, see `03-data-schema-and-build.md` |

## Files in this plan

| File | What it settles |
|---|---|
| `01-information-architecture.md` | Pages, routes, navigation, sitemap, footer, home tile, command palette |
| `02-taxonomy.md` | Category list, badge model, flags, thesis stages, repo domains, per-draft vocabulary mapping |
| `03-data-schema-and-build.md` | Data shape, where it lives, build and verification pipeline |
| `04-filters-cards-icons.md` | Filter UX with URL state, card anatomy, icon resolution, empty states |
| `05-merge-and-dedupe.md` | Source trust tiers, canonical rules, conflict resolution, exclusions |
| `06-catalog-tools.md` | Merged tool catalog draft, grouped by category |
| `07-catalog-thesis-and-repos.md` | Thesis stage mapping and the GitHub repo index draft |
| `08-seo-accessibility.md` | Head tags, JSON-LD, sitemap, indexing rules, keyboard and screen reader rules |
| `09-file-layout.md` | Every new and touched file, mapped to the layer map in `CLAUDE.md` |
| `10-rollout.md` | Phases, deliverables, done criteria |
| `11-open-items.md` | Decisions needed before any build starts |

## How the drafts were used

Each draft was read in full. Two drafts (`kilo-*` and `ling-*`) are near copies
of `big-pickle-*` and count as one source family. Three sources are treated as
low trust and used for corroboration only: `zai-*` (medical categories,
several fabricated URLs), `preplexity-*-opensource-thesis-repos.md` (147 of
200 links are `your-org` placeholders), and `deepseek-web-*-opensource-thesis-repos.md`
(mostly personal or one-off repositories). Details in `05-merge-and-dedupe.md`.

## Reading order

Read `01` through `05` for the design, skim `06` and `07` for content, then
`10` and `11` to decide what ships first.
