export function EditorIdleHint() {
  return (
    <div className="pointer-events-none absolute top-2 left-4 flex items-start gap-1 text-primary">
      <svg
        aria-hidden="true"
        fill="none"
        height="64"
        viewBox="0 0 80 64"
        width="80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M72 56 C60 45, 20 54, 8 50"
          stroke="currentColor"
          strokeDasharray="4 3"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M18 41 L8 50 L18 62"
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
