import { CCE_INTRO_PARAGRAPHS } from "@/config/cce/content";

export function CceIntro() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-head text-xl sm:text-2xl">
        What Computer and Communications Engineering is at LIU
      </h2>

      {CCE_INTRO_PARAGRAPHS.map((paragraph) => (
        <p
          className="text-muted-foreground text-sm sm:text-base"
          key={paragraph}
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}
