const CLIPBOARD_CLIP = { height: 4, rx: 1, width: 8, x: 8, y: 2 };
const CLIPBOARD_BODY =
  "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2Z";
const CLIPBOARD_ROWS = ["M12 11h4", "M12 16h4", "M8 11h.01", "M8 16h.01"];

export function CurriculumClipboard() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 82"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(12.4 14) scale(1.8)">
        <path d={CLIPBOARD_BODY} fill="#000000" />
        <rect fill="#000000" {...CLIPBOARD_CLIP} />
      </g>
      <g transform="translate(8.4 10) scale(1.8)">
        <path d={CLIPBOARD_BODY} fill="var(--primary)" />
        <rect fill="var(--primary)" {...CLIPBOARD_CLIP} />
        {CLIPBOARD_ROWS.map((d) => (
          <path
            d={d}
            fill="none"
            key={d}
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.6"
          />
        ))}
      </g>
    </svg>
  );
}
