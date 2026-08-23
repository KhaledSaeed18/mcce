export const REQUIREMENT_CHIP_CLASSNAME =
  "inline-flex max-w-full items-baseline gap-1.5 rounded border-2 bg-background px-2.5 py-1 text-left text-sm shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-x-0 active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

interface RequirementChipLabelProps {
  code: string;
  name?: string;
}

/** A wrapping code + name pair, so a long course name breaks onto more lines
 * inside the chip instead of overflowing it. */
export function RequirementChipLabel({
  code,
  name,
}: RequirementChipLabelProps) {
  return (
    <>
      <span className="shrink-0 font-head font-medium">{code}</span>
      {name ? <span className="text-muted-foreground">, {name}</span> : null}
    </>
  );
}
