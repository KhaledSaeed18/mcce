import { TextLink } from "@/components/text-link";
import type { ThesisTip } from "@/lib/thesis/types";

interface ThesisTipTextProps {
  tip: ThesisTip;
}

export function ThesisTipText({ tip }: ThesisTipTextProps) {
  return (
    <>
      {tip.text}
      {tip.links?.map((link) => (
        <TextLink className="ml-2" href={link.href} key={link.href}>
          {link.label}
        </TextLink>
      ))}
    </>
  );
}
