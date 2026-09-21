import { isValidResourceId } from "../../src/lib/resources/slug";
import type { Repository, Resource } from "../../src/lib/resources/types";

export interface ValidationContext {
  categoryIds: ReadonlySet<string>;
  courseCodes: ReadonlySet<string>;
  domainIds: ReadonlySet<string>;
  stageIds: ReadonlySet<string>;
}

const DESCRIPTION_MAX_LENGTH = 140;
const URL_PATTERN = /^https?:\/\/[^\s#]+$/;

function checkUrl(url: string, label: string, out: string[]) {
  if (!URL_PATTERN.test(url)) {
    out.push(`${label}: url must be http(s) with no fragment: ${url}`);
  }
  if (url.endsWith("/")) {
    out.push(`${label}: url must not end with a slash: ${url}`);
  }
}

function checkCourses(
  courses: string[] | undefined,
  label: string,
  context: ValidationContext,
  out: string[]
) {
  for (const code of courses ?? []) {
    if (!context.courseCodes.has(code)) {
      out.push(`${label}: unknown course code ${code}`);
    }
  }
}

function validateTool(
  tool: Resource,
  context: ValidationContext,
  out: string[]
) {
  const label = `tool ${tool.id}`;
  if (!isValidResourceId(tool.id)) {
    out.push(`${label}: id is not kebab-case`);
  }
  if (tool.description.length > DESCRIPTION_MAX_LENGTH) {
    out.push(`${label}: description over ${DESCRIPTION_MAX_LENGTH} characters`);
  }
  checkUrl(tool.url, label, out);
  if (!context.categoryIds.has(tool.category)) {
    out.push(`${label}: unknown category ${tool.category}`);
  }
  if (tool.platform.length === 0) {
    out.push(`${label}: needs at least one platform`);
  }
  for (const stage of tool.thesisStages ?? []) {
    if (!context.stageIds.has(stage)) {
      out.push(`${label}: unknown thesis stage ${stage}`);
    }
  }
  checkCourses(tool.courses, label, context, out);
}

function validateRepo(
  repo: Repository,
  toolIds: ReadonlySet<string>,
  context: ValidationContext,
  out: string[]
) {
  const label = `repo ${repo.owner}/${repo.name}`;
  if (!isValidResourceId(repo.id)) {
    out.push(`${label}: id is not kebab-case`);
  }
  if (!context.domainIds.has(repo.domain)) {
    out.push(`${label}: unknown domain ${repo.domain}`);
  }
  if (repo.resourceId && !toolIds.has(repo.resourceId)) {
    out.push(`${label}: resourceId ${repo.resourceId} does not match a tool`);
  }
  checkCourses(repo.courses, label, context, out);
}

function checkUnique(values: string[], what: string, out: string[]) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      out.push(`duplicate ${what}: ${value}`);
    }
    seen.add(value);
  }
}

/** Every violation at once, so one run fixes them all. Empty means valid. */
export function validateCatalog(
  tools: Resource[],
  repos: Repository[],
  context: ValidationContext
): string[] {
  const out: string[] = [];
  const toolIds = new Set(tools.map((tool) => tool.id));

  checkUnique(
    tools.map((tool) => tool.id),
    "tool id",
    out
  );
  checkUnique(
    tools.map((tool) => tool.url),
    "tool url",
    out
  );
  checkUnique(
    repos.map((repo) => repo.id),
    "repo id",
    out
  );

  for (const tool of tools) {
    validateTool(tool, context, out);
  }
  for (const repo of repos) {
    validateRepo(repo, toolIds, context, out);
  }

  for (const categoryId of context.categoryIds) {
    if (!tools.some((tool) => tool.category === categoryId)) {
      out.push(`category ${categoryId} has no tools`);
    }
  }

  return out;
}
