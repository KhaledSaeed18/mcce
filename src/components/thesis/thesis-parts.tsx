import { ThesisPartCard } from "@/components/thesis/thesis-part-card";
import { ThesisSection } from "@/components/thesis/thesis-section";
import { THESIS_GUIDE_SECTIONS, THESIS_PARTS } from "@/config/thesis";

export function ThesisParts() {
  return (
    <ThesisSection
      description="On the transcript, the project appears as two courses. Part A weights come from its syllabus. Part B has its own grade and presentation at the end of the spring."
      id={THESIS_GUIDE_SECTIONS.parts.id}
      title="What each part delivers"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {THESIS_PARTS.map((part) => (
          <ThesisPartCard key={part.code} part={part} />
        ))}
      </div>
    </ThesisSection>
  );
}
