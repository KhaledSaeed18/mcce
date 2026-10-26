import { ThesisAiBrainstorm } from "@/components/thesis/thesis-ai-brainstorm";
import { ThesisContributionTypes } from "@/components/thesis/thesis-contribution-types";
import { ThesisDatabaseSearch } from "@/components/thesis/thesis-database-search";
import { ThesisSection } from "@/components/thesis/thesis-section";
import { ThesisTopicChecks } from "@/components/thesis/thesis-topic-checks";
import { ThesisTopicDomains } from "@/components/thesis/thesis-topic-domains";
import { ThesisTopicSteps } from "@/components/thesis/thesis-topic-steps";
import { THESIS_GUIDE_SECTIONS } from "@/config/thesis";

export function ThesisTopic() {
  return (
    <ThesisSection
      description="The first job of Part A: a topic that is modern, built around machine learning, and feasible in seven to eight months."
      id={THESIS_GUIDE_SECTIONS.topic.id}
      title="Finding a topic"
    >
      <ThesisTopicSteps />
      <ThesisTopicDomains />
      <ThesisAiBrainstorm />
      <ThesisDatabaseSearch />
      <ThesisContributionTypes />
      <ThesisTopicChecks />
    </ThesisSection>
  );
}
