# 09. File layout

Every file the build touches, mapped to the layer map in `CLAUDE.md`. Line
limits from the same file apply: pages 80, components 150, hooks 100,
utilities 60, constants and types unlimited.

## New files

### `src/config/` (constants, no logic)

| File | Contents |
|---|---|
| `resources/categories.ts` | `RESOURCE_CATEGORIES`, `RESOURCE_GROUPS`, `RESOURCE_CATEGORY_BY_ID` |
| `resources/badges.ts` | `ACCESS_BADGES`, `BADGE_FILTERS`, labels, one-line explanations, colour token per badge |
| `resources/thesis-stages.ts` | `THESIS_STAGES` with order, term, note, defaultPick |
| `resources/repo-domains.ts` | `REPO_DOMAINS`, `REUSE_CLASSES`, `MAINTENANCE_STATES`, labels |
| `resources/search-synonyms.ts` | `RESOURCE_SEARCH_SYNONYMS` |
| `resources/copy.ts` | Page paths, hero copy, empty state, suggest block, security note, AI privacy note |
| `resources/resources-mark.ts` | Hero mark geometry and loop constants |
| `resources/catalog/*.ts` | 25 category files, each exporting a `Resource[]` |
| `resources/repos/*.ts` | 22 or 23 domain files, each exporting a `Repository[]` |
| `resources/catalog.ts` | `RESOURCE_CATALOG`, `REPO_CATALOG` (aggregation, not a barrel) |

### `src/lib/` (pure functions, server data access)

| File | Contents |
|---|---|
| `resources/types.ts` | All types from `03` |
| `resources/queries.ts` | `resourcesIndexQueryOptions` |
| `resources/filter.ts` and `filter.test.ts` | `filterResources`, `filterRepos` |
| `resources/search.ts`, `search-score.ts`, and tests | `searchResources`, `searchRepos`, `scoreResource` |
| `resources/group.ts` and test | `groupByCategory`, `groupByStage`, `groupByDomain` |
| `resources/facets.ts` and test | `countByBadge`, `countByCategory` |
| `resources/icon.ts` and test | `resolveIcon(entry)` returning the descriptor, used by the build and by tests |
| `resources/slug.ts` and test | `isValidResourceId` for the validator |
| `search-params.ts` | add `readOptionalList` next to `readOptionalString` (`src/lib/search-params.ts:1`) |
| `seo/resources-head.ts` | four head builders |
| `seo/resources-schema.ts` | four JSON-LD builders |

### `src/hooks/`

| File | Contents |
|---|---|
| `use-resource-filters.ts` | URL patch callback with replace or push per field |
| `use-resource-results.ts` | memoised filter, search, group for tools |
| `use-repo-results.ts` | same for repositories |
| `use-thesis-sections.ts` | memoised `groupByStage` with featured-first ordering |

### `src/components/resources/`

| File | Role |
|---|---|
| `resources-hero.tsx` | Hero for `/resources` |
| `resources-mark.tsx` | Animated decoration, pattern of `exam-papers-mark.tsx` |
| `resource-filters.tsx` | Input, category select, badge toggles, count, clear link |
| `resource-badge-toggle.tsx` | One `aria-pressed` button |
| `resource-badge.tsx` | Badge visual for access and open source |
| `resource-category-jump.tsx` | Chip row with counts |
| `resource-category-section.tsx` | `h2`, tagline, grid |
| `resource-grid.tsx` | Responsive grid |
| `resource-card.tsx` | One tool |
| `resource-icon.tsx` | Renders the icon descriptor (brand, category, monogram) |
| `resource-empty-state.tsx` | Empty result block |
| `resource-suggest-block.tsx` | Link to contact |
| `category-not-found.tsx` | Unknown category |
| `thesis-hero.tsx`, `thesis-stage-jump.tsx`, `thesis-stage-section.tsx`, `thesis-default-stack.tsx`, `thesis-route-map.tsx` | Thesis page |
| `open-source-hero.tsx`, `repo-filters.tsx`, `repo-domain-section.tsx`, `repo-grid.tsx`, `repo-card.tsx`, `repo-license-badge.tsx`, `repo-checklist.tsx` | Open source page |

### `src/routes/`

`resources.index.tsx`, `resources.$category.tsx`, `resources.thesis.tsx`,
`resources.open-source.tsx`. Each composes a hero, filters, sections, and
`JsonLd`; no logic beyond `useMemo` wiring.

### `src/data/` (generated)

`resources-index.json`, committed, written only by the build script.

### `public/resources/icons/` (generated)

One SVG per brand icon, plus `-dark` variants, committed. Excluded from knip
via the existing `ignore` list in `knip.json` if it complains; SVGs are not
modules so it should not.

### `scripts/build-resources/`

`index.ts`, `validate.ts`, `icons.ts`, `links.ts`, `haystack.ts`, tests.

## Touched files

| File | Change |
|---|---|
| `src/config/navigation.ts:33-49` | three paths in `NavRoute` |
| `src/config/navigation.ts:204-229` | fourth `NavGroup` |
| `src/config/sitemap.ts:15-30` and `:47` | union and group |
| `src/config/footer.ts:8-24` and `:71-83` | union and links |
| `src/config/features.ts:10` and `:23` | optional home tile |
| `src/config/contact.ts:94-98` | new topic |
| `scripts/sync-drive/sitemap.ts:11-31` and `:33` | `TRACKS_RESOURCES` sentinel and four rows, plus category rows |
| `package.json` | `build:resources` script |
| `.github/workflows/*` | resources build check on PR, weekly link job |
| `public/llms.txt`, `README.md`, `CONTRIBUTING.md` | docs |

Nothing under `src/components/ui/` changes. `Badge`, `Select`, `Input`,
`Label`, `Empty`, and `Card` are used as they are.

## Naming check against the conventions table

- Components PascalCase, files kebab-case to match the existing tree
  (`exam-course-jump.tsx`, not `ExamCourseJump.tsx`; the repo already
  diverges from the PascalCase file rule in `CLAUDE.md` and consistency with
  the tree wins).
- Hooks `useResourceFilters`, `useResourceResults`, `useRepoResults`: domain
  then action.
- Utilities as verb phrases: `filterResources`, `searchResources`,
  `resolveIcon`.
- Constants UPPER_SNAKE_CASE: `RESOURCE_CATEGORIES`, `THESIS_STAGES`.
- Types PascalCase nouns: `Resource`, `Repository`, `ResourcesIndex`.
