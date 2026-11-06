import type { CourseFaqEntry } from "@/lib/curriculum/course-faq";

interface CourseFaqProps {
  code: string;
  entries: CourseFaqEntry[];
}

export function CourseFaq({ code, entries }: CourseFaqProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-head border-b-2 pb-2 text-lg">{code} questions</h2>
      <dl className="flex flex-col gap-3 text-sm">
        {entries.map((entry) => (
          <div key={entry.question}>
            <dt className="font-medium">{entry.question}</dt>
            <dd className="text-muted-foreground mt-1">{entry.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
