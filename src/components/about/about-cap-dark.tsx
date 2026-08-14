const PAPER_FILL = "#fff7e8";

const CAP_BOARD =
  "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z";
const CAP_BAND = "M6 12.5 V16 A6 3 0 0 0 18 16 V12.5 Z";
const CAP_CORD = "M22 10v6";

export function AboutCapDark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 82"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(12.4 14) scale(1.8)">
        <path d={CAP_BOARD} fill={PAPER_FILL} />
        <path d={CAP_BAND} fill={PAPER_FILL} />
        <path
          d={CAP_CORD}
          fill="none"
          stroke={PAPER_FILL}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.6"
        />
        <circle cx="22" cy="16.3" fill={PAPER_FILL} r="1.7" />
        <circle cx="12" cy="8" fill={PAPER_FILL} r="1.3" />
      </g>
      <g transform="translate(8.4 10) scale(1.8)">
        <path d={CAP_BOARD} fill="var(--primary)" />
        <path d={CAP_BAND} fill="var(--primary)" />
        <path
          d={CAP_CORD}
          fill="none"
          stroke="var(--primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.6"
        />
        <circle cx="22" cy="16.3" fill="var(--primary)" r="1.7" />
        <circle cx="12" cy="8" fill="var(--primary)" r="1.3" />
      </g>
    </svg>
  );
}
