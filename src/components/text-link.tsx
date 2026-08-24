import { ExternalLinkIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

/** An underlined link out to another site, opened in a new tab. */
export function TextLink({ children, className, href }: TextLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary",
        className
      )}
      href={href}
      rel="noopener"
      target="_blank"
    >
      {children}
      <ExternalLinkIcon className="size-3.5 shrink-0" />
    </a>
  );
}
