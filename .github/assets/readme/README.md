# README showcase

The README uses `../mcce-showcase.webp`, a static 1600 × 1160 image.
The editable composition is `showcase.html` with `showcase.css`. Fonts and the
brand mark come from the project. The four WebP crops show the live interface
captured on October 12, 2026:

- `search.webp`: `/search?q=FinalSampleExam`.
- `exams.webp`: `/exams`, the Embedded Systems section.
- `roadmap.webp`: `/plan-of-study?tab=roadmap`, the prerequisite graph.
- `gpa.webp`: `/gpa-calculator`, the cumulative summary. The sample averages are
  88 for CENG507, 82 for EENG527, 85 for EENG537, and 90 for ENGG515.

Knip excludes `showcase.css` because the standalone HTML consumes it outside
the application dependency graph. Biome still checks the stylesheet.

To refresh the composition, install the project's dependencies, serve the
repository root with `python3 -m http.server 8765 --bind 127.0.0.1`, and open
`http://127.0.0.1:8765/.github/assets/readme/showcase.html`. Wait for the fonts
and images to load, capture the full page at its native 1600 × 1160 size, and
export a single-frame WebP to `../mcce-showcase.webp`. Check the exported image
at README width before replacing it. The HTML is an asset source, not a site route.
