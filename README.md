<p align="center">
  <img src="public/og-image.png" alt="MCCE: Program materials, organized." width="100%" />
</p>

<h1 align="center">MCCE</h1>

<p align="center">
  A materials browser for the LIU M.S. in Computer and Communication Engineering program.
</p>

<p align="center">
  <a href="https://mcce.khaledsaeed.tech"><img src="https://shieldcn.dev/badge/site-mcce.khaledsaeed.tech-1a1815.svg?logo=lu:Globe" alt="Site" /></a>
  <a href="https://github.com/KhaledSaeed18/mcce/actions"><img src="https://shieldcn.dev/github/ci/KhaledSaeed18/mcce.svg" alt="CI" /></a>
  <a href="https://github.com/KhaledSaeed18/mcce/blob/main/LICENSE"><img src="https://shieldcn.dev/github/license/KhaledSaeed18/mcce.svg" alt="License" /></a>
  <a href="https://github.com/KhaledSaeed18/mcce/commits/main"><img src="https://shieldcn.dev/github/last-commit/KhaledSaeed18/mcce.svg" alt="Last commit" /></a>
  <a href="./CONTRIBUTING.md"><img src="https://shieldcn.dev/badge/PRs-welcome-16a34a.svg?logo=lu:GitPullRequest" alt="PRs welcome" /></a>
</p>

---

## What this is

Course material for the MCCE program moves through a few channels before it reaches a student,
and each one loses something along the way. Instructors post to Classroom, which is the official
source but is mostly slides and files with no notes, past exams, or exercises. Students fill the
gaps in WhatsApp group chats, which helps but is hard to search, hard to keep current, and not
available to everyone in the program.

MCCE indexes the shared Drive folders behind both of those channels into one place: a site to
browse, search, and link to material by semester and course. It re-syncs from Drive on a weekly
schedule, so the index tracks what's actually shared without anyone maintaining it by hand.
Alongside the index, it carries the parts of the program that are otherwise scattered across
PDFs and screenshots: the plan of study, the prerequisite roadmap, and a GPA calculator on the
program's grading scale.

This is an independent, student-built site. It is not an official page of Lebanese International
University. For admissions, curriculum, and official program details, see the
[official program page](https://cce.liu.edu.lb/academic-programs/graduate-programs).

**[mcce.khaledsaeed.tech](https://mcce.khaledsaeed.tech)**

## Features

- **Browse by source and course**: program materials organized by Drive source, semester, and
  course, with folder and file counts at a glance.
- **Search**: find material by name, filtered by semester, course, material type, or file type.
- **Command palette**: jump straight to a file from anywhere on the site.
- **File previews**: preview documents, slides, and sheets without leaving the browser.
- **Past exams**: every indexed midterm, final, and assessment in one view, grouped by course and
  by the term it was sat, with papers that record no year kept at the end of each course.
- **Saved files**: keep a shortlist of files while browsing. It stays in the browser.
- **Plan of study**: a year-by-year curriculum view with semester groups, course requirements,
  and prerequisite notes.
- **Curriculum roadmap**: a traceable prerequisite graph across the full program, with credit
  totals per year and semester.
- **GPA calculator**: semester and cumulative GPA on the program's 4.0 scale, with a trend chart,
  an end-of-program projection, and the course average needed to reach a target. Entries stay in
  the browser, nothing is sent anywhere.
- **Exports**: download, preview, or share the plan of study as a PDF, and the GPA report as PDF,
  CSV, or JSON.
- **Weekly auto-sync**: a scheduled job re-crawls the source Drive and updates the index, so
  material doesn't go stale.
- **Recently added**: what each sync picked up, grouped by course, with an RSS feed to follow.
- **FAQ and about pages**: how the program is structured, and how syncing, search, and file
  access work here.
- **Community-sourced contributions**: anyone in the program can send exams, notes, slides, or
  recordings through the contact page to be added to the index.
- **Works offline**: the index is cached on first visit, so browsing and search keep working with
  no connection, no sign-in, and no tracking.
- **Installable**: works as a standalone app on desktop and mobile through the site manifest.
- **Light and dark themes**: follows the system setting, or set it manually.

## Contributing

Contributions are welcome, whether that's code, a bug report, or course material to add to the
index. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the tech stack, project structure, local
setup, and the standards a pull request is held to.

To contribute course material instead of code, use the
[contact page](https://mcce.khaledsaeed.tech/contact).

## License

MIT, see [LICENSE](./LICENSE).
