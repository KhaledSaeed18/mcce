# 02. Taxonomy

One category per tool, one cost badge per tool, one open source flag, and
optional thesis stages. Repositories use a separate domain list and a license
reuse class. Nothing else is a taxonomy; everything else is a plain field.

## Category list (tools)

Twenty-five categories in four groups. The group is only a layout device for
section order and the jump row; the filter operates on category.

| Group | Id | Label | Tagline (one line under the h2) | Lucide icon |
|---|---|---|---|---|
| Everyday | `ai-assistants` | AI assistants | Explain a derivation, summarise slides, draft a first pass. | `SparklesIcon` |
| Everyday | `file-utilities` | PDF, image, and media utilities | Merge, compress, convert, and clean up files. | `FileStackIcon` |
| Everyday | `diagramming` | Diagrams, figures, and slides | Sketch a topology, draw a block diagram, build a deck. | `PenToolIcon` |
| Everyday | `productivity` | Notes and project tracking | Keep the semester and the thesis on a board. | `KanbanIcon` |
| Everyday | `dev` | Development environments | Editors, version control, containers, and package managers. | `TerminalIcon` |
| Everyday | `learning` | Learning and study aids | Courses, flashcards, and references outside the syllabus. | `BookOpenIcon` |
| Coursework | `math` | Math and symbolic computation | Check a transform, solve a system, plot a function. | `SigmaIcon` |
| Coursework | `data-analysis` | Statistics and notebooks | Numbers, tests, and figures that survive a defense. | `ChartLineIcon` |
| Coursework | `dsp` | Signal processing and SDR | Filters, spectra, and software radio chains. | `AudioWaveformIcon` |
| Coursework | `wireless` | Communications and wireless | Modulation, coding, channels, and 5G stacks. | `RadioIcon` |
| Coursework | `satellite` | Satellite and space | Passes, link budgets, and telemetry decoding. | `SatelliteIcon` |
| Coursework | `networking` | Networking | Packets, topologies, routing, and measurement. | `NetworkIcon` |
| Coursework | `multimedia` | Multimedia and streaming | Codecs, packaging, playback, and quality metrics. | `ClapperboardIcon` |
| Coursework | `ml` | Machine learning | Training, compute, tracking, and datasets. | `BrainCircuitIcon` |
| Coursework | `data-mining` | Data mining | Dataframes, mining workbenches, and profiling. | `DatabaseIcon` |
| Coursework | `vision` | Image processing and vision | Annotation, augmentation, and detection. | `ImageIcon` |
| Coursework | `security` | Security and cryptography | Primitives, practice ranges, and monitoring. | `ShieldIcon` |
| Coursework | `embedded` | Embedded systems | Toolchains, RTOS, simulators, and debug. | `CpuIcon` |
| Research | `literature` | Literature search and discovery | Databases, citation graphs, and reading aids. | `SearchIcon` |
| Research | `references` | Reference management | Collect, cite, and keep DOIs clean. | `LibraryIcon` |
| Research | `writing` | Writing and typesetting | LaTeX, Typst, Quarto, and proofing. | `FileTextIcon` |
| Research | `review` | Systematic review | Screening, snowballing, and PRISMA reporting. | `ListChecksIcon` |
| Research | `thesis-archives` | Open access and thesis archives | Prior theses and open full text. | `ArchiveIcon` |
| Research | `integrity-archiving` | Integrity and archiving | Similarity checks, DOIs for artifacts, identifiers. | `BadgeCheckIcon` |
| Access | `access` | Student and university programs | Bundles and campus licenses to check before paying. | `GraduationCapIcon` |

Four Coursework rows came from splitting what the drafts called "ML and data
mining" and "math and scientific computing" into pairs, because each half has
more than 12 entries after the merge.

Icons reuse what `src/config/courses.ts:1-19` already imports where the subject
overlaps (`AudioWaveformIcon`, `RadioIcon`, `NetworkIcon`, `BrainCircuitIcon`,
`DatabaseIcon`, `ImageIcon`, `ShieldIcon`, `CpuIcon`, `SigmaIcon`,
`ClapperboardIcon`, `SatelliteIcon`, `BookOpenIcon`, `LibraryIcon`). Icon
names not yet imported anywhere must be checked against the installed
`lucide-react` version before use.

Order within a group is the order above. Order within a category is
`featured` first, then alphabetical by name.

## Cost badge (exactly one per tool)

| Id | Label | Meaning | Rule for choosing it |
|---|---|---|---|
| `free` | Free | Core use costs nothing, no trial clock, no card | Desktop or self-hosted software with no paid tier that matters for coursework, or a web app with no meaningful gate |
| `freemium` | Freemium | A real free tier covers coursework, paid tiers add capacity | If any draft disagreed between Free and Freemium, this wins |
| `trial` | Trial | Free only for a limited time, then paid | A trial is never described as free |
| `paid` | Paid | Payment expected for the relevant use | Listed only when the tool is the field standard and a free alternative sits beside it |
| `student` | Student | Free or expanded after student verification | Academic email or program enrolment opens it |
| `university` | University Access | Access depends on an LIU subscription or campus license | Always paired with `verification: "liu"` until the library confirms |

## Open source (boolean, rendered as a second badge)

`isOpenSource: true` renders an "Open Source" badge next to the cost badge.
This is how the seven-badge decision is honoured without mixing cost and
license in one enum. A self-hosted open source tool is `free` plus open
source. A hosted service with an open core (Overleaf, GitHub) is `freemium`
and open source only if the thing the student uses is the open part
(Overleaf: no, the hosted service is what they use; Zotero: yes).

The badge filter accepts the seven values. `open-source` filters on the
boolean, the other six filter on `access`.

## Flags and status

| Field | Values | Purpose |
|---|---|---|
| `verification` | `verified`, `liu`, `pending` | `liu` shows "Confirm with the LIU library" on the card. `pending` hides nothing but is reported by the build |
| `status` | `recommended`, `experimental`, `deprecated` | `experimental` adds a small "New" tag for 2026 projects. `deprecated` rows fail the build; delete them instead |
| `featured` | boolean | Sorts first in its category and marks the "start here" pick on the thesis page |
| `requiresAccount` | boolean | Shown as a footnote line on the card ("Account required") |
| `privacyNote` | short string | AI and cloud tools: one line on not uploading unpublished thesis material |
| `verifiedOn` | ISO date | Last date a human checked badge and URL |

## Thesis stages

Twelve stages, ordered. Each tool may carry several. `term` says which course
the stage belongs to.

| Order | Id | Label | Term |
|---|---|---|---|
| 0 | `frame` | Frame the topic | A |
| 1 | `search` | Systematic search | A |
| 2 | `map` | Citation graph widening | A |
| 3 | `retrieve` | Get the PDF legally | A |
| 4 | `screen` | Screen and synthesise | A |
| 5 | `cite` | Reference hygiene | A |
| 6 | `prior-theses` | Read prior theses | A |
| 7 | `experiment` | Experiments and data | B |
| 8 | `analyse` | Analysis and figures | B |
| 9 | `write` | Write and typeset | B |
| 10 | `integrity` | Integrity and archiving | B |
| 11 | `defend` | Plan the work and defend | B |

Each stage config carries a `note` (two sentences on what happens there, from
the drafts that agree: reproduce a baseline before building, freeze metrics
at the proposal, one command regenerates every figure) and a `defaultPick`
(one tool id) for the "Default stack" table.

## Repository domains

| Group | Id | Label |
|---|---|---|
| Backbone | `writing` | Writing and typesetting |
| Backbone | `templates` | Thesis templates |
| Backbone | `references` | References and BibTeX |
| Backbone | `review` | Review method and screening |
| Backbone | `scholarly-apis` | Scholarly graphs and paper tooling |
| Backbone | `reading` | PDF extraction and reading |
| Backbone | `rag-agents` | Local document QA and research agents |
| Backbone | `reproducibility` | Reproducibility and pipelines |
| Backbone | `integrity` | Integrity and preservation |
| Backbone | `collaboration` | Collaboration and project tracking |
| Backbone | `analysis` | Data analysis and plotting |
| Track | `ml` | Machine learning |
| Track | `data-mining` | Data mining |
| Track | `vision` | Vision and imaging |
| Track | `dsp` | DSP and SDR |
| Track | `wireless` | Communications and wireless |
| Track | `mobile-core` | Mobile core and radio stacks |
| Track | `networking` | Networking and multimedia |
| Track | `embedded` | Embedded and RTOS |
| Track | `satellite` | Satellite and space |
| Track | `security` | Security and cryptography |
| Track | `math` | Math, graphs, and optimisation |
| Track | `software-engineering` | Software engineering research (optional group, see open items) |

## Repository reuse class

Taken from the DeepSeek v4 draft, which is the only one that defined it
cleanly.

| Id | Label | Typical licenses | What it means for thesis code |
|---|---|---|---|
| `permissive` | Permissive | MIT, BSD, Apache-2.0, ISC | Use and modify, keep the notice, cite the project |
| `weak-copyleft` | Weak copyleft | LGPL, MPL | Link freely, changes to the library itself stay open |
| `copyleft` | Copyleft | GPL, AGPL | Distributed derivatives must carry the same license |
| `check` | Check the license | Custom, dual, or unclear (NPSL, OAI, unlicensed) | Read `LICENSE` before depending on it |

`maintenance`: `active`, `steady`, `dormant`, `archived`, `unverified`. Rows
with `archived` render with a note and never as a first pick.

## Course codes (optional, not filterable in v1)

`courses?: string[]` is validated against the codes in
`src/config/curriculum.ts` at build time so a typo cannot land. The field is
authored where a draft supplied it and ignored by the UI until course-page
strips are scheduled.

## How each draft's vocabulary maps

| Draft term | Maps to |
|---|---|
| Free-for-Students, Free for students, Student License, Student | `student` |
| University Access, Institutional, check-liu, Check LIU, Check-LIU | `university` plus `verification: "liu"` |
| Open Source, OSS, Open-Source, `openSource: true` | `isOpenSource: true` (cost badge chosen separately, usually `free`) |
| FREE PLAN (zai) | `freemium` |
| Free trial, FREE TRIAL | `trial` |
| Commercial | `paid` |
| Self-hosted, Hardware, Account required, Installation required (badge modifiers in Perplexity, Poolside, DeepSeek v4) | Not badges. `requiresAccount` boolean; self-hosted and hardware go in the description or `note` |
| Big Pickle category ids (`study-ai`, `math-sim`, `comms`, `refs`, `slr`, `pdf-util`, `prod`) | `ai-assistants`, `math`, `wireless`, `references`, `review`, `file-utilities`, `productivity` |
| Muse 1.3 task groups T1 to T9 | Split across `math`, `dsp`, `wireless`, `satellite`, `networking`, `ml`, `security`, `embedded`, and the Research group |
| Perplexity "by purpose" list (explain a concept, draw a diagram, ...) | Not a taxonomy. Reused as search synonyms in `src/config/resources/search-synonyms.ts` |
| Zai categories 2, 6, 12, 13, 15, 16, 17 (flashcards, medical, cloud storage, comms apps, video editing, learning platforms, password managers) | Dropped, except Anki, Khan Academy, and a few learning platforms kept under `learning` |
