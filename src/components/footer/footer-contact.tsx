import { FolderGit2Icon, MailIcon } from "lucide-react";
import { FOOTER_CONTACT_EMAIL, FOOTER_GITHUB_URL } from "@/config/footer";

const CONTACT_LINK_CLASSES =
  "inline-flex items-center gap-1.5 rounded border-2 border-border bg-card px-2 py-1 text-xs font-head text-muted-foreground shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-black hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

export function FooterContact() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        className={CONTACT_LINK_CLASSES}
        href={`mailto:${FOOTER_CONTACT_EMAIL}`}
      >
        <MailIcon className="size-3.5" />
        {FOOTER_CONTACT_EMAIL}
      </a>

      <a
        className={CONTACT_LINK_CLASSES}
        href={FOOTER_GITHUB_URL}
        rel="noopener"
        target="_blank"
      >
        <FolderGit2Icon className="size-3.5" />
        GitHub
      </a>
    </div>
  );
}
