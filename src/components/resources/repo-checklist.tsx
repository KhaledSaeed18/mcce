import { REPO_CHECKLIST } from "@/config/resources/repo-domains";

export function RepoChecklist() {
  return (
    <section className="flex flex-col gap-3 rounded-lg border-2 bg-card p-4 shadow-md">
      <h2 className="font-head text-lg">Before you clone</h2>
      <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm">
        {REPO_CHECKLIST.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}
