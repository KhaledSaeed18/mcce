# README showcase

The README uses `../mcce-showcase.webp`, a static 1600 × 720 header exported at
2x (3200 × 1440). The editable composition is `showcase.html` with
`showcase.css`. Fonts and the brand mark come from the project. The four WebP
tiles are 3x captures of the live site taken on October 19, 2026:

- `roadmap-trace.webp`: `/plan-of-study?tab=roadmap` with the pointer over
  EENG527 so its unlock paths are highlighted, cropped to the graph.
- `search.webp`: the search palette (Cmd K) on the homepage, with the query
  `final sample`.
- `editor.webp`: `/editor` with EENG527 Lectures, Chapter 02, `Chapter 2.pdf`
  open on page 10, the sidebar hidden, two highlighter strokes, and one circle.
- `gpa.webp`: `/gpa-calculator`, the cumulative summary and course averages. The
  sample averages are 88 for CENG507, 82 for EENG527, 85 for EENG537, and 90 for
  ENGG515.

Knip excludes `showcase.css` because the standalone HTML consumes it outside
the application dependency graph. Biome still checks the stylesheet.

To refresh the composition, install the project's dependencies, serve the
repository root with `python3 -m http.server 8765 --bind 127.0.0.1`, and open
`http://127.0.0.1:8765/.github/assets/readme/showcase.html`. Wait for the fonts
and images to load, capture the 1600 × 720 page at a device scale factor of 2,
and export a single-frame WebP to `../mcce-showcase.webp`. Check the exported
image at README width, on both light and dark GitHub themes, before replacing
it. The HTML is an asset source, not a site route.
