import { ArrowUpRightIcon, GitBranchIcon } from "lucide-react";
import { RepoLicenseBadge } from "@/components/resources/repo-license-badge";
import { RESOURCE_CARD_CLASSES } from "@/components/resources/resource-card";
import { ResourceIcon } from "@/components/resources/resource-icon";
import { OPENS_IN_NEW_TAB } from "@/config/resources/copy";
import { REPO_DOMAIN_BY_ID } from "@/config/resources/repo-domains";
import type { RepoEntry } from "@/lib/resources/types";

interface RepoCardProps {
  repo: RepoEntry;
}

export function RepoCard({ repo }: RepoCardProps) {
  const domain = REPO_DOMAIN_BY_ID.get(repo.domain);

  return (
    <a
      className={RESOURCE_CARD_CLASSES}
      href={repo.url}
      rel="noopener"
      target="_blank"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded border-2 border-black bg-white text-black shadow-[4px_4px_0_0_var(--chart-4)]">
          <ResourceIcon fallbackIcon={GitBranchIcon} icon={repo.icon} />
        </div>
        <ArrowUpRightIcon
          aria-hidden="true"
          className="size-5 shrink-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="break-all font-head font-mono text-base leading-tight">
          {repo.owner}/{repo.name}
          <span className="sr-only">, {OPENS_IN_NEW_TAB}</span>
        </h3>
        <p className="text-muted-foreground text-sm">{repo.description}</p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <RepoLicenseBadge
          license={repo.license}
          maintenance={repo.maintenance}
          reuseClass={repo.reuseClass}
        />
        {repo.note ? (
          <p className="text-muted-foreground text-xs">{repo.note}</p>
        ) : null}
        {domain ? <span className="sr-only">{domain.label}</span> : null}
      </div>
    </a>
  );
}
