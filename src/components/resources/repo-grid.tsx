import { RepoCard } from "@/components/resources/repo-card";
import type { RepoEntry } from "@/lib/resources/types";

interface RepoGridProps {
  repos: RepoEntry[];
}

export function RepoGrid({ repos }: RepoGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <li className="min-w-0" key={repo.id}>
          <RepoCard repo={repo} />
        </li>
      ))}
    </ul>
  );
}
