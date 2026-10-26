import { THESIS_TOPIC_STEPS } from "@/config/thesis";

export function ThesisTopicSteps() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {THESIS_TOPIC_STEPS.map((step, index) => (
        <li
          className="flex flex-col gap-1 rounded border-2 bg-card p-3 shadow-md"
          key={step.title}
        >
          <span className="font-head text-2xl text-primary">{index + 1}</span>
          <span className="font-head text-sm">{step.title}</span>
          <span className="text-muted-foreground text-sm">{step.detail}</span>
        </li>
      ))}
    </ol>
  );
}
