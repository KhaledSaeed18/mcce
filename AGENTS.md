<!-- BEGIN:craft-rules -->
# Craft Rules

> Applies to all output: code, comments, UI text, and documentation in this repo.

---

## Writing

- No em dashes anywhere. Not in UI copy, code comments, commit messages, or markdown. Use a comma, a colon, or rewrite the sentence.
- No emojis. Not in UI, not in comments, not in documentation.
- No exclamation marks in UI text or copy.
- No filler adjectives: avoid "seamless", "robust", "comprehensive", "powerful", "cutting-edge", "intuitive", "innovative", "next-level", "world-class".
- No AI-flavored verbs: avoid "leverage", "utilize", "delve", "explore", "unlock", "elevate".
- Keep UI copy short and direct. Prefer nouns over adjectives where space is tight.

---

## Code Comments

Comments must be plain. No decorative dividers, no horizontal rules, no ASCII art.

```
/* Wrong */
/* --- Dark mode ---------------------------------------------- */
/* === Typography === */
/* ─── Sidebar ────────────────────────────────────────────────── */

/* Correct */
/* Dark mode */
/* Typography */
/* Sidebar */
```

Only add a comment when the WHY is non-obvious: a hidden constraint, a subtle invariant, a workaround for a known bug. If removing the comment would not confuse a future reader, do not write it. Never describe what the code does -- well-named identifiers already do that.

---

## Design Anti-Patterns to Avoid

These are the most common AI-generated design choices that produce generic, low-quality interfaces. None of them belong in this project.

<!-- END:craft-rules -->

!-- BEGIN:code-architecture-rules -->
# Code Architecture Rules

> Structure is not optional. Every decision -- file size, naming, where logic lives -- either builds toward a maintainable, scalable codebase or against it. These rules are non-negotiable regardless of deadline pressure or feature complexity.

---

## Core Philosophy

- **Small over large.** A file that does one thing is easier to read, test, change, and delete than a file that does many.
- **Explicit over implicit.** Names, types, and structure should make intent obvious without reading the implementation.
- **Duplication is a signal.** If something appears twice, it belongs in one shared place. If it appears once but is clearly generalizable, extract it when you add the second use -- not before.
- **Structure is the product.** A clean, consistent architecture is what makes the product maintainable at scale. Always choose the right structure over the fastest path.

## File Size Limits (approximate)

| File type | Max lines | Reason |
|---|---|---|
| Page (`page.tsx`) | 80 | Pages compose -- they do not implement |
| Component (`.tsx`) | 150 | Beyond this, it is doing more than one thing |
| Custom hook (`use*.ts`) | 100 | Extract sub-hooks if growing |
| Utility / helper | 60 | One responsibility per utility file |
| Constants file | No limit | But group by domain, not one global dump |
| Type definition file | No limit | But group by domain |

When a file exceeds its limit, split it -- do not suppress the rule.

---

## Separation of Concerns

Every piece of code has exactly one home. Never mix these layers.

### Layer map

```
app/                  Pages -- compose layouts and sections, no logic
components/ui/        shadcn primitives -- never modified directly
components/           Shared presentational components -- JSX only, no data fetching
hooks/                Custom hooks -- all stateful logic and side effects
services/             API calls and data access -- no JSX, no React
lib/                  Pure utilities -- no React, no side effects
constants/            Named constants and static config
types/                TypeScript interfaces and types
```

### Rules

- Components contain JSX and event handler wiring only. Business logic belongs in a custom hook.
- Data fetching happens in Server Components (preferred) or custom hooks. Never in `useEffect` inside a component body.
- No magic numbers or magic strings inline in JSX or logic. Extract to `constants/`.
- Types are never defined inline at the call site if they are reused. Move them to `types/`.
- No component imports a service directly. Data flows down via props or context. Services are called from hooks or Server Components.

---

## DRY -- Don't Repeat Yourself

| Situation | Action |
|---|---|
| Same JSX block appears in 2+ places | Extract a component |
| Same logic or calculation appears in 2+ places | Extract a utility function or custom hook |
| Same string literal appears in 2+ places | Extract a constant |
| Same type shape appears in 2+ places | Extract a named type or interface |
| Same API call appears in 2+ places | Extract a service function |

The threshold is two. Not three, not "several". Two occurrences means extract.

---

## Component Design

- One component per file. The file name matches the component name exactly.
- Components are presentational by default. If a component needs to know where data comes from, it should receive it as props.
- Props interfaces are always explicitly typed. No `any`, no implicit object shapes.
- A component that renders a list item is different from the component that renders the list. Both should exist as separate files.
- Avoid components that accept a `type` or `variant` prop that completely changes the rendered output -- that is two components, not one.
- Children composition over configuration: prefer `<Card><Card.Header /></Card>` over `<Card header={...} footer={...} />` for layout flexibility.

---

## Custom Hooks

- Any `useState`, `useEffect`, `useCallback`, or `useRef` logic that is not a trivial single-line toggle belongs in a custom hook.
- Hooks are named `use[Domain][Action]`: `useUserProfile`, `useOrderList`, `useAuthSession`.
- One hook, one concern. A hook that manages form state should not also handle API submission.
- Hooks return only what the consumer needs. Do not return the raw internal state if a derived value is what the consumer uses.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component | PascalCase noun | `UserProfileCard`, `OrderStatusBadge` |
| Hook | camelCase, `use` prefix | `useCartItems`, `useFormValidation` |
| Utility function | camelCase verb phrase | `formatCurrency`, `parseISODate` |
| Service function | camelCase verb phrase | `fetchOrders`, `updateUserProfile` |
| Boolean variable | `is`, `has`, `can`, `should` prefix | `isLoading`, `hasError`, `canSubmit` |
| Event handler prop | `on` prefix | `onSubmit`, `onChange`, `onClose` |
| Event handler implementation | `handle` prefix | `handleSubmit`, `handleClose` |
| Constant | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| Type / Interface | PascalCase noun | `UserProfile`, `ApiResponse<T>` |
| Enum | PascalCase, singular | `OrderStatus`, `UserRole` |
| File (component) | PascalCase | `UserProfileCard.tsx` |
| File (hook, util, service) | camelCase | `useCartItems.ts`, `formatCurrency.ts` |

Names describe what a thing IS or DOES, not how it is implemented. `getFilteredAndSortedActiveUsers` is a bad name. `getActiveUsers` is better. `activeUsers` (if it is a derived value) is best.

---

## Functions

- One function, one job. If a function needs an "and" in its name, split it.
- Functions should fit in a screen without scrolling (roughly 25-40 lines).
- Prefer early returns to reduce nesting. Guard clauses at the top, happy path at the bottom.
- Pure functions (no side effects) wherever possible. Side effects should be explicit and isolated.
- Default to named exports. Avoid anonymous default exports -- they lose their name in stack traces and search results.

---

## Constants and Configuration

Every project-level constant lives in `constants/`. Organize by domain:

```
constants/
  api.ts          API endpoints, timeouts, retry limits
  routes.ts       Application route strings
  validation.ts   Regex patterns, length limits, error messages
  ui.ts           Animation durations, breakpoints, z-index scale
```

No inline literals for things that could change or that appear more than once.

---

## Code Splitting

- Route-level pages are already split by Next.js App Router. Do not fight this.
- Heavy third-party components (rich text editors, chart libraries, map components) are dynamically imported with `next/dynamic`.
- Server Components handle data fetching. Client Components handle interactivity. Never use `useEffect` to fetch data that could be fetched on the server.
- Do not add `"use client"` to a file unless it genuinely needs browser APIs or React state. Keep the server/client boundary as far down the tree as possible.

---

## When to Refactor

Refactor immediately -- not in a future ticket -- when:

- A file exceeds its line limit.
- The same code block appears in a second place.
- A function needs an "and" to describe what it does.
- A component file contains `useState`, `useEffect`, and JSX that all relate to different concerns.
- A magic string or number appears for the second time.

Do not defer structural debt. It compounds.
<!-- END:code-architecture-rules -->

<!-- BEGIN:ultracite-agent-rules -->
# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `pnpm dlx ultracite fix` before committing to ensure compliance.
<!-- END:ultracite-agent-rules -->

<!-- BEGIN:git-rules -->
# Git & Version Control Rules

> Every commit is a permanent, public record of a decision. Write it like someone who has never seen this codebase will read it six months from now -- because they will.

---

## Commit Message Format

Follow the Conventional Commits specification strictly.

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Subject line rules

- Maximum 72 characters
- Type and scope in lowercase
- Subject in lowercase, imperative mood ("add", "fix", "remove" -- not "added", "fixes", "removing")
- No period at the end
- Scope is optional but encouraged when the change is isolated to one area

### Body rules

- Separate from subject with one blank line
- Wrap at 100 characters
- Explain WHAT changed and WHY, not HOW (the diff shows how)
- Use multiple paragraphs or bullet points for complex changes
- Body is required when the subject line alone cannot communicate the full intent

### Footer rules

- Reference issues or tickets: `Closes #123`, `Refs #456`
- Note breaking changes: `BREAKING CHANGE: <description>`
- No co-author lines. No AI tool attributions. No generator signatures of any kind.

---

## Commit Types

| Type | When to use |
|---|---|
| `feat` | A new feature visible to users or consumers of the API |
| `fix` | A bug fix |
| `refactor` | Code change that neither adds a feature nor fixes a bug (restructure, rename, extract) |
| `style` | Formatting, whitespace, missing semicolons -- no logic change |
| `perf` | A change that improves performance |
| `test` | Adding or correcting tests |
| `docs` | Documentation only |
| `chore` | Build process, dependency updates, config changes -- no production code |
| `ci` | CI/CD pipeline changes |
| `revert` | Reverting a previous commit |

Use exactly one type per commit. If a commit needs two types, it should be two commits.

---

## Scope Examples

Scope names should match the domain or directory being changed:

```
feat(auth): add session expiry handling
fix(orders): correct status badge color for cancelled state
refactor(hooks): extract useOrderFilters from OrderList component
chore(deps): update next to 15.3.1
style(globals): reorder CSS custom property declarations
perf(images): convert hero assets to webp
```

Avoid vague scopes like `misc`, `various`, `general`, `update`.

---

## Good vs Bad Examples

```
# Bad -- vague, no context, past tense
fixed some stuff
Updated components
WIP
asdfgh
Fixing the bug from yesterday

# Bad -- describes how, not why
changed the border color from gray to F1F1F1
moved useState to custom hook

# Good
fix(sidebar): resolve active item highlight not clearing on route change

# Good with body
feat(orders): add bulk status update to order table

Allows operators to select multiple orders and update their status
in a single action. Reduces average time-to-update from 4 clicks
per order to 2 clicks total for a batch.

Closes #214
```

---

## Commit Discipline

- **Atomic commits.** One logical change per commit. A commit that adds a component and also fixes an unrelated bug is two commits.
- **Commit working code.** Never commit code that does not build or that contains `console.log`, `debugger`, or `TODO` left over from active debugging.
- **Do not mix refactor and feature in one commit.** Refactor first in one commit, add the feature in the next. This keeps the diff readable and the history bisectable.
- **Do not commit commented-out code.** Delete it. Git history preserves it if it is ever needed.
- **Stage selectively.** Use `git add -p` when a file contains changes that belong to different commits. Never use `git add .` blindly.

---

## Branch Naming

```
<type>/<short-description>

feat/order-bulk-status-update
fix/sidebar-active-state
refactor/extract-order-hooks
chore/update-dependencies
```

- Lowercase and hyphens only. No underscores, no slashes within the description.
- Description should be 3-5 words maximum.
- Branch names match the type of the commits on the branch.

---

## What Never Goes in a Commit

- Co-author lines (`Co-Authored-By:`)
- AI tool names, agent names, or generator signatures
- Temporary debugging code (`console.log`, `debugger`, `alert`)
- Commented-out blocks of old code
- `.env` files or any file containing secrets or credentials
- Build output (`/.next`, `/dist`, `/build`)
- Editor config that belongs in `.gitignore`

---

## Pull Request Titles

PR titles follow the same format as commit subjects:

```
feat(auth): add OAuth provider support
fix(dashboard): resolve chart flickering on data refresh
refactor(components): decompose OrderDashboard into sub-components
```

PR body should explain the motivation, list the key changes, and reference any related issues. It is a record for reviewers and future readers -- write it accordingly.
<!-- END:git-rules -->