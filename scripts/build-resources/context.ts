import { CURRICULUM } from "../../src/config/curriculum";
import { RESOURCE_CATEGORIES } from "../../src/config/resources/categories";
import { REPO_DOMAINS } from "../../src/config/resources/repo-domains";
import { THESIS_STAGES } from "../../src/config/resources/thesis-stages";
import { flattenCourses } from "../../src/lib/curriculum/lookup";
import type { ValidationContext } from "./validate";

/** The id sets the validator checks references against, read from config. */
export function buildValidationContext(): ValidationContext {
  return {
    categoryIds: new Set(RESOURCE_CATEGORIES.map((category) => category.id)),
    courseCodes: new Set(
      flattenCourses(CURRICULUM).map((course) => course.code)
    ),
    domainIds: new Set(REPO_DOMAINS.map((domain) => domain.id)),
    stageIds: new Set(THESIS_STAGES.map((stage) => stage.id)),
  };
}
