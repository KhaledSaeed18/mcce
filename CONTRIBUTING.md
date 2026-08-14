# Contributing to MCCE

MCCE is a course-materials browser for the LIU M.S. in Computer and Communication Engineering
program. This document covers how to set up the project, the standards your changes are held to,
and how to submit them.

## Table of contents

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Environment variables](#environment-variables)
- [Making changes](#making-changes)
- [Code standards](#code-standards)
- [Testing](#testing)
- [Commit messages](#commit-messages)
- [Branch naming](#branch-naming)
- [Submitting a pull request](#submitting-a-pull-request)
- [CI](#ci)
- [Reporting bugs and requesting features](#reporting-bugs-and-requesting-features)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (file-based routing via TanStack Router) |
| UI | React 19, [shadcn/ui](https://ui.shadcn.com) (`base-nova` style, neutral base color), [Base UI](https://base-ui.com) primitives |
| Styling | Tailwind CSS v4 |
| Animation | [motion](https://motion.dev) only. No GSAP, Lenis, or other animation libraries |
| Icons | lucide-react |
| Data fetching | TanStack Query, TanStack Router SSR query integration |
| Forms | Web3Forms (contact form), hCaptcha |
| PDF export | jsPDF, jspdf-autotable |
| Build tool | Vite 8 |
| Deployment target | Cloudflare Workers (via `@cloudflare/vite-plugin` and Wrangler) |
| Language | TypeScript, strict mode |
| Linting/formatting | Biome, via [Ultracite](https://ultracite.dev) preset |
| Unused code detection | Knip |
| Testing | Vitest, jsdom |
| Git hooks | Lefthook |
| Package manager | pnpm (`pnpm@11.11.0`, workspace-enabled) |

The project has no traditional backend. Course data is served from a generated JSON index
(`src/data/drive-index.json`) that is crawled from Google Drive by a scheduled GitHub Action and
committed back to the repository.

## Project structure

```
src/
  routes/         TanStack Router file-based routes. Compose layouts and sections, no logic.
  components/
    ui/           shadcn/Base UI primitives. Never modify these directly, use shadcn CLI to update.
    <domain>/     Shared presentational components (about, contact, curriculum, drive, faq,
                  footer, marketing, nav, seo). JSX only, no data fetching.
  hooks/          Custom hooks. All stateful logic and side effects live here.
  lib/            Pure utilities and server-side data access (TanStack Start server functions).
                  No JSX. Grouped by domain (contact, curriculum, drive, seo).
  config/         Named constants and static config, grouped by domain.
  data/           Generated data artifacts (the Drive index). Machine-written, never hand-edited.
  assets/         Static brand assets.
scripts/
  sync-drive/     Standalone script that crawls Google Drive and regenerates the Drive index.
```

Full architecture, naming, and file-size rules are documented in `AGENTS.md` (symlinked as
`CLAUDE.md`) at the repository root. Read it before making structural changes, its rules are
enforced in review.

## Getting started

Requirements:

- Node.js 22
- pnpm (`corepack enable` will pick up the pinned version from `package.json`)

```bash
git clone https://github.com/KhaledSaeed18/mcce.git
cd mcce
pnpm install
cp .env.example .env
pnpm dev
```

The dev server runs at `http://localhost:3000`.

`pnpm install` runs the `prepare` script, which installs Lefthook git hooks. A pre-commit hook
runs `ultracite fix` on staged JS/TS/JSON/CSS files automatically.

## Available scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Vite dev server on port 3000 |
| `pnpm build` | Build the production bundle |
| `pnpm preview` | Build, then preview under `wrangler dev` |
| `pnpm deploy` | Build and deploy to Cloudflare Workers |
| `pnpm check` | Run Biome checks via Ultracite |
| `pnpm fix` | Auto-fix formatting and lint issues via Ultracite |
| `pnpm typecheck` | Run `tsc --noEmit` |
| `pnpm test` | Run the Vitest suite once |
| `pnpm knip` | Detect unused files, exports, and dependencies |
| `pnpm fullcheck` | Run typecheck, knip, check, and test together |
| `pnpm sync:drive` | Crawl Google Drive and regenerate `src/data/drive-index.json` |
| `pnpm cf-typegen` | Generate Cloudflare Worker types from `wrangler.jsonc` |

Run `pnpm fullcheck` before opening a pull request. It is the same set of checks CI runs.

## Environment variables

Copy `.env.example` to `.env` and fill in the values you need locally.

| Variable | Used for |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Submitting the contact form via Web3Forms |

`pnpm sync:drive` additionally requires a `GOOGLE_SERVICE_ACCOUNT_KEY` (a Google service account
with read access to the source Drive folder) available in the environment. This is only needed if
you are working on the Drive sync script itself, it is not required for normal frontend
development since `src/data/drive-index.json` is already checked in.

Never commit `.env`, `service-account-key.json`, or any file containing credentials. Both are
already covered by `.gitignore`.

## Making changes

1. Create a branch off `main` (see [Branch naming](#branch-naming)).
2. Make your change, keeping it scoped to one logical concern.
3. Run `pnpm fix` to apply formatting and safe lint fixes.
4. Run `pnpm fullcheck` and confirm everything passes.
5. For UI or frontend changes, run `pnpm dev` and verify the change in the browser, both the
   change itself and the surrounding areas it could affect.
6. Commit with a Conventional Commits message.
7. Open a pull request against `main`.

## Code standards

This repository enforces a strict, written set of rules in `AGENTS.md`. Highlights:

- **File size limits.** Pages max ~80 lines, components max ~150 lines, hooks max ~100 lines,
  utilities max ~60 lines. Split a file when it exceeds its limit, do not suppress the rule.
- **Separation of concerns.** Routes compose, components render, hooks hold state and side
  effects, `lib/` holds pure utilities and server-side data access. No component fetches data
  directly, no `useEffect` in a component body for data a route loader could fetch instead.
- **DRY at two occurrences.** The same JSX block, logic, string literal, type shape, or API call
  appearing in two places gets extracted, not three.
- **No magic numbers or strings** inline in JSX or logic. Extract to `src/config/`.
- **Naming conventions** are fixed: PascalCase components, `use`-prefixed camelCase hooks,
  `is`/`has`/`can`/`should`-prefixed booleans, `on`-prefixed handler props, `handle`-prefixed
  handler implementations. See the naming table in `AGENTS.md` for the full list.
- **No em dashes, no emojis, no exclamation marks** in UI text, comments, commit messages, or
  documentation, including this file.
- **Comments** only when the WHY is non-obvious (a hidden constraint, a workaround, an invariant).
  No decorative dividers or ASCII art in comments. Never describe what code already makes obvious.
- **Animation** uses `motion` exclusively. Do not add GSAP, Lenis, or any other animation library.
- **`src/components/ui/`** holds shadcn/Base UI primitives and is never hand-edited. Use the
  shadcn CLI (`npx shadcn@latest add <component>`) to add or update them.
- **`src/data/drive-index.json`** is generated by `pnpm sync:drive` and is excluded from Biome
  and the pre-commit hook. Never hand-edit it.

Formatting and most style issues are enforced automatically by Biome through Ultracite
(`pnpm check` / `pnpm fix`). Read `AGENTS.md` for anything Biome cannot catch: architecture,
naming judgment, and the design anti-patterns section.

## Testing

Tests are written with Vitest and jsdom, and live next to the code they cover as `*.test.ts`
(see `src/lib/curriculum/` and `src/lib/drive/` for examples).

- Assertions belong inside `it()`/`test()` blocks.
- No `.only` or `.skip` in committed code.
- Keep `describe` nesting flat.
- New logic in `src/lib/` should ship with tests when it has meaningful branching or edge cases.

Run the suite with:

```bash
pnpm test
```

## Commit messages

This repository follows [Conventional Commits](https://www.conventionalcommits.org) strictly.

```
<type>(<scope>): <subject>

<body>

<footer>
```

- Subject: lowercase, imperative mood, no trailing period, max 72 characters.
- Body: wrap at 100 characters, explain what changed and why, not how.
- Footer: reference issues (`Closes #123`), note breaking changes (`BREAKING CHANGE: ...`).
- One type per commit. If a change needs two types, split it into two commits.
- No co-author lines, no AI tool attributions, no generator signatures.

Types: `feat`, `fix`, `refactor`, `style`, `perf`, `test`, `docs`, `chore`, `ci`, `revert`.

```
feat(curriculum): add roadmap tab to curriculum year tabs
fix(sidebar): resolve active item highlight not clearing on route change
refactor(hooks): extract useOrderFilters from OrderList component
```

Keep commits atomic: one logical change per commit, no mixing a refactor with a feature. Never
commit code that does not build, or that contains `console.log`, `debugger`, commented-out code,
or leftover `TODO`s from active debugging.

## Branch naming

```
<type>/<short-description>
```

Lowercase and hyphens only, 3-5 words for the description, matching the type of the commits on
the branch:

```
feat/order-bulk-status-update
fix/sidebar-active-state
refactor/extract-order-hooks
```

## Submitting a pull request

- Keep the PR title in the same Conventional Commits format as commit subjects.
- Fill in the pull request template: summary, type of change, related issues, and test plan.
- Before requesting review, confirm locally:
  - `pnpm check`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm knip`
  - Manual verification in the browser for UI changes
- A PR should represent one logical change. Split unrelated changes into separate PRs.

## CI

Every push and pull request against `main` runs the following jobs (`.github/workflows/ci.yml`):

- **Lint**: `pnpm check` (Biome via Ultracite)
- **Typecheck**: `pnpm typecheck`
- **Test**: `pnpm test`
- **Knip**: `pnpm knip` (unused files, exports, and dependencies)
- **Build**: `pnpm build`

All jobs must pass before a pull request can merge. On merge to `main`, a separate workflow
deploys the production bundle to Cloudflare Workers.

A scheduled workflow (`sync-drive.yml`) re-crawls Google Drive weekly and commits an updated
`src/data/drive-index.json` when the source material changes. You do not need to run this
yourself unless you are working on the sync script.

## Reporting bugs and requesting features

Open an issue using the appropriate template:

- **Bug report**: description, reproduction steps, expected behavior, browser and environment.
- **Feature request**: the problem being solved, the proposed solution, and any alternatives
  considered.

Search existing issues first to avoid duplicates.
