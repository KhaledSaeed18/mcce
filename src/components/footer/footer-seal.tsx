interface FooterSealProps {
  className?: string;
}

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
      <circle
        cx={60}
        cy={60}
        fill="none"
        opacity={0.4}
        r={46}
        stroke="var(--border)"
        strokeDasharray="2 5"
        strokeWidth={1.5}
      />

      <rect
        fill="var(--primary)"
        height={30}
        rx={4}
        stroke="var(--border)"
        strokeWidth={5}
        width={30}
        x={26}
        y={50}
      />
      <rect
        fill="var(--card)"
        height={10}
        stroke="var(--border)"
        strokeWidth={3}
        width={10}
        x={36}
        y={60}
      />

      <g stroke="var(--border)" strokeLinecap="square" strokeWidth={4}>
        <line x1={26} x2={20} y1={56} y2={56} />
        <line x1={26} x2={20} y1={65} y2={65} />
        <line x1={26} x2={20} y1={74} y2={74} />
        <line x1={32} x2={32} y1={80} y2={86} />
        <line x1={41} x2={41} y1={80} y2={86} />
        <line x1={50} x2={50} y1={80} y2={86} />
      </g>

      <line
        stroke="var(--border)"
        strokeLinecap="round"
        strokeWidth={4}
        x1={56}
        x2={74}
        y1={50}
        y2={44}
      />
      <circle cx={78} cy={44} fill="var(--border)" r={4} />

      <g
        fill="none"
        stroke="var(--chart-2)"
        strokeLinecap="round"
        strokeWidth={4}
      >
        <path d="M71.45,39.41 A8,8 0 0 1 84.55,39.41" />
        <path d="M66.53,35.96 A14,14 0 0 1 89.47,35.96" />
        <path d="M61.62,32.52 A20,20 0 0 1 94.38,32.52" />
      </g>
    </svg>
  );
}
