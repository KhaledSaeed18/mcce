interface FooterSealProps {
  className?: string;
}

const PIN_OFFSETS = [47, 60, 73] as const;

export function FooterSeal({ className }: FooterSealProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={60}
        cy={60}
        fill="var(--card)"
        r={54}
        stroke="var(--border)"
        strokeWidth={5}
      />

      <g stroke="var(--border)" strokeLinecap="square" strokeWidth={5}>
        {PIN_OFFSETS.map((offset) => (
          <line key={`top-${offset}`} x1={offset} x2={offset} y1={34} y2={22} />
        ))}
        {PIN_OFFSETS.map((offset) => (
          <line
            key={`bottom-${offset}`}
            x1={offset}
            x2={offset}
            y1={86}
            y2={98}
          />
        ))}
        {PIN_OFFSETS.map((offset) => (
          <line
            key={`left-${offset}`}
            x1={34}
            x2={22}
            y1={offset}
            y2={offset}
          />
        ))}
        {PIN_OFFSETS.map((offset) => (
          <line
            key={`right-${offset}`}
            x1={86}
            x2={98}
            y1={offset}
            y2={offset}
          />
        ))}
      </g>

      <rect
        fill="var(--primary)"
        height={52}
        rx={5}
        stroke="var(--border)"
        strokeWidth={6}
        width={52}
        x={34}
        y={34}
      />
      <rect
        fill="var(--card)"
        height={28}
        rx={2}
        stroke="var(--border)"
        strokeWidth={4}
        width={28}
        x={46}
        y={46}
      />
    </svg>
  );
}
