import { RepoGrid } from "@/components/resources/repo-grid";
import type { DomainSection } from "@/lib/resources/group";

interface RepoDomainSectionProps {
  section: DomainSection;
}

export function RepoDomainSection({ section }: RepoDomainSectionProps) {
  const { domain, repos } = section;

  return (
    <section className="flex scroll-mt-20 flex-col gap-4" id={domain.id}>
      <div className="flex items-center gap-3 border-b-2 pb-2">
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-head text-lg sm:text-xl" tabIndex={-1}>
            {domain.label}
          </h2>
          <p className="truncate text-muted-foreground text-xs">
            {domain.tagline}
          </p>
        </div>
        <span className="shrink-0 text-muted-foreground text-sm">
          {repos.length} repositories
        </span>
      </div>

      <RepoGrid repos={repos} />
    </section>
  );
}
