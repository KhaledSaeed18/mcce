# 11. Open items for sign-off

Decisions needed before Phase 1 starts. Each has a recommendation so the
answer can be a yes or a change.

| # | Item | Recommendation |
|---|---|---|
| 1 | Data home: typed source in `src/config/resources/` plus a generated `src/data/resources-index.json` and committed icons | Yes, per `03` |
| 2 | Route prefix: `/resources`, `/resources/$category`, `/resources/thesis`, `/resources/open-source` | Yes. Keeps one prefix for the nav highlight and the sitemap |
| 3 | Nav group label and position: "Resources", third of four, colour `chart-4` | Yes |
| 4 | Badge rendering: Open Source as a second badge beside the cost badge, not instead of it | Yes. It honours the seven-badge decision and keeps cost and license apart |
| 5 | Badge colours mapped to the existing chart tokens: free `chart-2`, freemium `chart-1`, trial `chart-4`, paid `chart-5`, student `chart-3`, university outline, open source outline with text | Accept, or supply a different mapping. No new palette |
| 6 | Category list: the 25 in `02`, including `learning` and the `math` / `data-analysis` and `ml` / `data-mining` splits | Yes. Cut `learning` if the everyday group feels too broad |
| 7 | Catalog size at launch: ship all 406 tools, or ship `core` plus `supported` (about 330) and add `single` rows over time | Ship core plus supported in Phase 2, add `single` rows in Phase 3 with the thesis pages. Same code path, less to verify at once |
| 8 | Repo index size: 284 rows, or backbone plus the six track groups with the most course overlap | Ship all backbone rows and all track rows that are also tool entries first (about 200), the rest in Phase 4 |
| 9 | Optional `software-engineering` repo group | Drop for v1 |
| 10 | Brand logos from svgl, self-hosted, used to identify the product | Yes, with the trademark note recorded in `03`. If you prefer no logos at all, the category icon path already covers every card |
| 11 | `q` uses `replace: true` while selects push history; `/search` pushes everything | Adopt for the hub, and open a small follow-up to align `/search` |
| 12 | Multi-select badge filter (`badge=free,student`) versus single-select | Multi-select |
| 13 | Access section as a badge filter view rather than a category holding duplicates (JetBrains, MATLAB) | Yes. Keep the `access` category for programs only |
| 14 | Contact topic "A tool to add" and the suggest block on `/resources` | Yes |
| 15 | Home feature tile linking to `/resources` in Phase 2 | Yes |
| 16 | Command palette results for tools | Phase 4 |
| 17 | Course tags: author `courses` where drafts supplied them, hide in UI until course strips are scheduled | Yes, author now, no UI |
| 18 | LIU library portal URL and the subscription list | Needs a human at LIU. Until then every `liu` row shows "Confirm with the LIU library" and links to `liu.edu.lb` |
| 19 | MATLAB badge: `university` until the license is known, with the student license named in the description | Yes |
| 20 | Turnitin: list at all, given it is institutional and may not be used by the department | List with `liu`; drop if the department confirms it is not used |
| 21 | 2026 writing and review tools (Oleafly, tinyleaf, TeXbrain, OpenPrism, TeXlyre, FlowTex, Scholarly skill, OpenDraft, ReviQ, prismAId, metaScreener): include as `experimental` with a "New" tag | Include the ones that verify in Phase 0, `experimental` status, re-check quarterly |
| 22 | AI tools privacy note wording | "Do not upload unpublished thesis material without your advisor's approval." One line, shown on every AI and cloud-reading card |
| 23 | Security note wording | "Use only on systems you own or are authorised to test." Shown on every security card |
| 24 | Hero copy in `01` | Accept or rewrite |
| 25 | Weekly link job opens a PR, never auto-deletes | Yes |
| 26 | Sitemap `lastmod` tracks the resources build via a new sentinel | Yes |
| 27 | Thesis page structure: 12 stages with first picks and a default stack table | Yes |
| 28 | Whether `/resources/$category` should exist at all versus `?category=` only | Keep it. Indexable category URLs are the only per-topic landing pages the hub will have |
| 29 | `docs/` is git-ignored (`.gitignore:22`), so this plan and the drafts are local only. Track `docs/resource-hub/plan/` in git, or keep it out of the repo on purpose | Track the plan folder (an exception line in `.gitignore`), keep the raw drafts ignored |
