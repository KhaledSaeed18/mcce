import { m } from "motion/react";
import { DriveDirectCard } from "@/components/marketing/drive-direct-card";
import {
  DRIVE_DIRECT_LINKS,
  DRIVE_DIRECT_NOTE,
  DRIVE_DIRECT_SUBTITLE,
  DRIVE_DIRECT_TITLE,
} from "@/config/drive-links";
import { useReveal } from "@/hooks/use-reveal";

export function DriveDirectSection() {
  const reveal = useReveal();

  return (
    <section className="flex scroll-mt-20 flex-col gap-6" id="drive">
      <m.div className="flex flex-col gap-1" {...reveal.single}>
        <h2 className="font-head text-2xl sm:text-3xl">{DRIVE_DIRECT_TITLE}</h2>
        <p className="text-muted-foreground text-sm">{DRIVE_DIRECT_SUBTITLE}</p>
      </m.div>

      <m.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        {...reveal.group}
      >
        {DRIVE_DIRECT_LINKS.map((link) => (
          <m.div key={link.id} {...reveal.item}>
            <DriveDirectCard link={link} />
          </m.div>
        ))}
      </m.div>

      <p className="text-muted-foreground text-xs">{DRIVE_DIRECT_NOTE}</p>
    </section>
  );
}
