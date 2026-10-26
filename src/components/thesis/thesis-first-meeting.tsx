import { ThesisSection } from "@/components/thesis/thesis-section";
import { THESIS_FIRST_MEETING, THESIS_GUIDE_SECTIONS } from "@/config/thesis";
import { THESIS_PROGRESS_LOG_TIP } from "@/config/thesis-topic";

export function ThesisFirstMeeting() {
  return (
    <ThesisSection
      description="What the kickoff session asks every group to bring to the next supervisor meeting."
      id={THESIS_GUIDE_SECTIONS.firstMeeting.id}
      title="Before the first meeting"
    >
      <ol className="flex flex-col divide-y-2 rounded border-2 bg-card shadow-md">
        {THESIS_FIRST_MEETING.map((task, index) => (
          <li
            className="flex items-baseline gap-3 px-4 py-3 text-sm"
            key={task}
          >
            <span className="font-head text-lg text-primary">{index + 1}</span>
            {task}
          </li>
        ))}
      </ol>
      <p className="text-sm">{THESIS_PROGRESS_LOG_TIP}</p>
    </ThesisSection>
  );
}
