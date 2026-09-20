# 08. SEO and accessibility

## Head tags

Every hub route exports `head` built with `buildPageMeta`
(`src/lib/seo/meta.ts:9-30`) and a canonical link, as `src/routes/exams.tsx:19-26`
does. A `src/lib/seo/resources-head.ts` module holds the four builders so the
route files stay under the page line limit:

| Route | Title | Canonical | Robots |
|---|---|---|---|
| `/resources` | `Tools · MCCE` | `${SITE_URL}/resources` | index |
| `/resources/$category` | `{Category label} · Tools · MCCE` | `${SITE_URL}/resources/{category}` | index; `noindex, follow` for an unknown category, following `buildCourseHead` (`src/lib/seo/course-head.ts:30-35`) |
| `/resources/thesis` | `Thesis toolkit · MCCE` | `${SITE_URL}/resources/thesis` | index |
| `/resources/open-source` | `Open source index · MCCE` | `${SITE_URL}/resources/open-source` | index |

Filtered states (`?q=`, `?badge=`, `?category=`) keep the same canonical,
so search engines index one URL per page. `/search` uses `noindex` because
its results are files; the hub pages have real content without params, so
they stay indexable and the canonical does the deduplication.

Descriptions state the count ("312 tools across 25 categories, each with
its cost up front. Independent, not sponsored.") and are built from
`meta.countsByCategory` in the index so they never go stale.

## JSON-LD

Rendered through `JsonLd` (`src/components/seo/json-ld.tsx`) like
`src/routes/admissions.tsx:33-39`:

- `/resources`: `CollectionPage` with an `ItemList` of `ListItem` entries,
  each `item` a `SoftwareApplication` (`name`, `url`, `applicationCategory`
  from the category label, `offers` with `price: "0"` for `free` rows only),
  capped at the first 100 entries to keep the payload small. Plus
  `BreadcrumbList` via `buildBreadcrumbSchema` (`src/lib/seo/schema.ts:147`).
- `/resources/$category`: same shape scoped to the category, uncapped.
- `/resources/thesis`: `HowTo` with one `HowToStep` per stage naming the
  first picks, plus breadcrumbs. `HowTo` fits a stage-ordered guide better
  than `ItemList`.
- `/resources/open-source`: `ItemList` of `SoftwareSourceCode` with
  `codeRepository` and `license`, capped at 100, plus breadcrumbs.

Builders live in `src/lib/seo/resources-schema.ts`, one function per page,
next to `cce-schema.ts`.

## Sitemap and discovery

- `scripts/sync-drive/sitemap.ts:33` `STATIC_PAGES` gains four rows with
  `changefreq: "monthly"`, priority `0.8` for `/resources` and `0.7` for
  the rest, `lastmod: TRACKS_RESOURCES` (see `03`). Category pages are
  generated from `RESOURCE_CATEGORIES` the way course pages are generated
  from `CURRICULUM` (`sitemap.ts:1-3`), priority `0.6`.
- `public/llms.txt` gains a "Resources" section with the four URLs and one
  line each.
- `README.md` features list gains one bullet. `CONTRIBUTING.md` gains the
  authoring section from `03`.
- Internal links: nav group, footer column, sitemap page, home tile
  (Phase 2), and a "Tools for this course" strip later. No orphan routes.

## Open Graph

Reuse `SITE_OG_IMAGE` from the root head (`src/routes/__root.tsx:97-100`).
A hub-specific OG image is a later polish item; the root image already says
"Program materials, organized."

## Accessibility

Rules the components must meet, checked in review and in a keyboard-only
pass before Phase 2 ships:

1. One `h1` per page (the hero title). Category and stage sections are `h2`,
   card names are `h3` inside the link. Jump rows are `<nav aria-label>`
   like `ExamCourseJump` (`src/components/exams/exam-course-jump.tsx:11`).
2. Filter controls are native or Base UI controls: the text input has an
   `sr-only` `<Label>` (`src/components/drive/search-filters.tsx:60-68`),
   selects use `SelectTrigger aria-label`
   (`src/components/drive/search-filter-select.tsx:41`), badge toggles are
   `<button type="button" aria-pressed>` with the badge text as the
   accessible name. Never a `div` with a click handler.
3. Result count lives in an `aria-live="polite"` region so screen readers
   hear "42 tools" after a filter change. It is a `<p>`, not a heading.
4. Cards are one `<a>` each with `target="_blank"` and `rel="noopener"`
   (`src/components/marketing/drive-direct-card.tsx:21`), an `sr-only`
   "opens in a new tab" suffix, and the focus ring pattern from
   `CourseIndexCard` (`src/components/course/course-index-card.tsx:20`).
   No nested interactive elements inside a card.
5. Brand icons are `<img alt="">` with explicit `width` and `height` and
   `loading="lazy"`; category icons are `aria-hidden` SVGs. The name is
   always text next to the icon.
6. Badges carry their label as text. Colour distinguishes them, text
   identifies them. Contrast on the chart tokens is checked in both themes;
   the dark theme already inverts `--chart-*` in `src/styles.css`.
7. The LIU verification line and the security "authorised use only" note
   are visible text, not tooltips, so they are read by everyone.
8. Empty state uses `Empty` (`src/components/ui/empty.tsx`) with a real link
   to clear filters, reachable by keyboard.
9. Motion is limited to the hero decoration, which already respects the
   shared drift and hides below `lg`
   (`src/components/marketing/page-hero-decoration.tsx:25`). No card entry
   animation.
10. Hash jumps land on a section whose `h2` is focusable via `tabIndex={-1}`
    so keyboard users get focus, not only scroll.

## Performance

- The index JSON is lazy-imported per route and cached by React Query with
  `staleTime: Infinity`; the service worker caches it under `/assets/`.
  Estimated size: 400 tools and 300 repos at roughly 400 bytes each is
  under 300 KB uncompressed, about 60 KB over the wire.
- Brand SVGs are small (most under 2 KB) and lazy. A grid of 400 cards
  renders 400 `<img>` tags; each is a separate request, all cache-first
  after first visit. If Lighthouse flags request count, the fallback is to
  inline the SVGs at build time into the index for the top 50 tools only.
- No external requests at render time. svgl, GitHub, and tool sites are
  never fetched by the page.
