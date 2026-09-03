export function EditorIdleHint() {
  return (
    <div className="pointer-events-none absolute top-0 left-6 flex items-start gap-3 text-muted-foreground/60">
      <svg
        aria-hidden="true"
        fill="none"
        height="64"
        viewBox="0 0 80 64"
        width="80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M72 56 C60 58, 20 54, 8 26"
          stroke="currentColor"
          strokeDasharray="4 3"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M8 26 L4 36 M8 26 L18 30"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
      <span className="mt-12 text-xs leading-snug">Pick a file from here</span>
    </div>
  );
}
