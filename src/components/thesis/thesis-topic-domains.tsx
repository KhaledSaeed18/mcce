import { Link } from "@tanstack/react-router";
import { ThesisTipList } from "@/components/thesis/thesis-tip-list";
import { THESIS_AI_REQUIREMENT, THESIS_TOPIC_DOMAINS } from "@/config/thesis";
import { THESIS_DOMAIN_TIPS } from "@/config/thesis-topic";

export function ThesisTopicDomains() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-head text-base">Step 1, start from the courses</h3>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {THESIS_TOPIC_DOMAINS.map((domain) => (
          <li
            className="flex flex-col gap-1 rounded border-2 bg-card p-3 text-sm"
            key={domain.title}
          >
            <span className="font-head">{domain.title}</span>
            <Link
              className="w-fit text-xs underline underline-offset-2 hover:text-primary"
              params={{ code: domain.courseCode }}
              to="/course/$code"
            >
              {domain.courseCode}
            </Link>
            <span className="text-muted-foreground">{domain.examples}</span>
          </li>
        ))}
      </ul>
      <p className="font-medium text-sm">{THESIS_AI_REQUIREMENT}</p>
      <ThesisTipList
        tips={THESIS_DOMAIN_TIPS}
        title="Choosing between domains"
      />
    </div>
  );
}
