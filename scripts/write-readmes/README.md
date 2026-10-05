# write-readmes

Writes the README Google Docs that sit in each Drive folder: one per Drive
root, one per semester folder, one per course folder, plus the lecture video
docs listed in `lecture-videos-config.ts`. Each one links to the matching site
pages and to the other folders.

```bash
pnpm sync:drive               # refresh src/data/drive-index.json first, the docs read their counts from it
pnpm readmes:drive            # dry run, lists which docs have a target in Drive
pnpm readmes:drive apply      # overwrites every doc that has a target
```

## Adding a folder

The service account has no Drive storage quota, so it **cannot create files**,
only overwrite docs it can edit. When a new semester or course folder appears:

1. Open the folder in Drive while signed in as an editor and press `Shift+T`
   to make an empty Google Doc. Type any character so Drive keeps it.
2. Run `pnpm readmes:drive apply`. The doc is found by its name ("Untitled
   document" or anything starting with "README"), renamed, and filled.

A folder with more than one matching doc is skipped and reported.

## Layout

| File | Holds |
|---|---|
| `config.ts` | Folder descriptions, course to tools-category map, site page list |
| `context.ts` | Joins the Drive index with the curriculum and the README doc ids |
| `course-stats.ts` | File, exam, and per-term counts for one course |
| `sections.ts` | Tables and blocks shared by every doc: Drive and semester navigation, footer |
| `root-doc.ts`, `semester-doc.ts`, `course-doc.ts` | One builder per README level |
| `course-sections.ts` | The course README's sections |
| `lecture-videos-*.ts` | YouTube playlist docs, currently CENG557 |
| `drive-docs.ts` | Finds a folder's README doc and overwrites a doc with converted HTML |
| `html.ts` | The small HTML vocabulary Drive keeps when it converts to a Doc |

Writing rules from `AGENTS.md` apply to the doc text too: no em dashes, no
emojis, no exclamation marks.
