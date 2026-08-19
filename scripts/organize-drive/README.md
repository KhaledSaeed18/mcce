# organize-drive

Brings the Drive folders into the one vocabulary the site reads, and normalises
file names so terms and solutions parse.

```bash
pnpm organize:drive          # dry run, prints every path that would change
pnpm organize:drive apply    # writes to Drive and appends to journal.ndjson
pnpm organize:drive rollback # replays the journal backwards
```

Run `pnpm sync:drive` afterwards to rebuild `src/data/drive-index.json`.

## Layout

| File | Holds |
|---|---|
| `layout.ts` | The canonical category vocabulary and the per-course path rewrites |
| `naming.ts` | File name rules: term markers, solution markers, version prefixes |
| `folder-name.ts` | Folder name rules: zero-padding, MATLAB spellings, bracket prefixes |
| `plan.ts` | Turns the crawled tree into a target path per node, plus the safety checks |
| `apply.ts` | Walks the plan, creating folders as needed |
| `journal.ndjson` | What the last `apply` actually did, and the only way to undo it |

## What it will not do

The service account has `canRename` and `canMoveItemWithinDrive` but **not**
`canTrash` or `canDelete`. Nothing can be destroyed by a run, and a folder left
empty by a merge has to be deleted by the folder's owner. `plan` lists any
course-level folder outside the canonical set, which is how those surface.

`apply` refuses to run if two nodes would normalise onto the same path, so a
file can never be shadowed by another. Renames and moves keep Drive's file ids,
so `firstSeenAt` in the index is unaffected and the site's recent feed does not
fill up with items that only moved.
