import { cn } from "@/lib/utils";

const SATELLITES = [
  { color: "#e63946", delay: "delay-0", x: 221, y: 71 },
  { color: "#ffdc58", delay: "delay-75", x: 371, y: 221 },
  { color: "#01ffcc", delay: "delay-150", x: 221, y: 371 },
  { color: "#c4a1ff", delay: "delay-200", x: 71, y: 221 },
] as const;

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-7", className)}
      viewBox="52 52 408 408"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="var(--border)" strokeLinecap="square" strokeWidth={16}>
        <line x1={256} x2={256} y1={256} y2={106} />
        <line x1={256} x2={406} y1={256} y2={256} />
        <line x1={256} x2={256} y1={256} y2={406} />
        <line x1={256} x2={106} y1={256} y2={256} />
      </g>

      {SATELLITES.map((node) => (
        <rect
          className={cn(
            "origin-center transition-transform duration-300 ease-out [transform-box:fill-box] motion-safe:group-hover:scale-125 motion-reduce:transition-none",
            node.delay
          )}
          fill={node.color}
          height={70}
          key={node.color}
          rx={14}
          stroke="var(--border)"
          strokeWidth={12}
          width={70}
          x={node.x}
          y={node.y}
        />
      ))}

      <rect
        fill="#ff9f1c"
        height={100}
        rx={18}
        stroke="var(--border)"
        strokeWidth={14}
        width={100}
        x={206}
        y={206}
      />
    </svg>
  );
}
