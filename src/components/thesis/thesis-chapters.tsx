import { ThesisSection } from "@/components/thesis/thesis-section";
import { Badge } from "@/components/ui/badge";
import {
  THESIS_CHAPTER_TERM_LABELS,
  THESIS_CHAPTERS,
  THESIS_GUIDE_SECTIONS,
} from "@/config/thesis";
import type { ThesisChapterTerm } from "@/lib/thesis/types";

const TERM_BADGE_VARIANT: Record<
  ThesisChapterTerm,
  "default" | "outline" | "secondary"
> = {
  A: "default",
  AB: "outline",
  B: "secondary",
};

export function ThesisChapters() {
  return (
    <ThesisSection
      description="One template, filled across both parts. Front matter such as the abstract is written last, in Part B."
      id={THESIS_GUIDE_SECTIONS.chapters.id}
      title="The eight chapters"
    >
      <div className="overflow-x-auto rounded-lg border-2 bg-card shadow-md">
        <table className="w-full text-sm">
          <thead className="border-b-2 text-left">
            <tr>
              <th className="px-3 py-2 font-head" scope="col">
                #
              </th>
              <th className="px-3 py-2 font-head" scope="col">
                Chapter
              </th>
              <th className="px-3 py-2 font-head" scope="col">
                Written in
              </th>
            </tr>
          </thead>
          <tbody>
            {THESIS_CHAPTERS.map((chapter) => (
              <tr className="border-b last:border-b-0" key={chapter.number}>
                <td className="px-3 py-2 align-top font-head">
                  {chapter.number}
                </td>
                <td className="px-3 py-2">
                  <span className="font-medium">{chapter.title}</span>
                  <span className="block text-muted-foreground">
                    {chapter.content}
                  </span>
                </td>
                <td className="px-3 py-2 align-top">
                  <Badge variant={TERM_BADGE_VARIANT[chapter.term]}>
                    {THESIS_CHAPTER_TERM_LABELS[chapter.term]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ThesisSection>
  );
}
