import { LinksFolderCard } from "@/components/links/links-folder-card";
import { getLinksFolderStyle, LINKS_FOLDERS_HEADING } from "@/config/links";
import type { SemesterFolder } from "@/lib/drive/types";

interface LinksFolderListProps {
  folders: SemesterFolder[];
}

export function LinksFolderList({ folders }: LinksFolderListProps) {
  return (
    <section aria-labelledby="links-folders-heading">
      <h2 className="sr-only" id="links-folders-heading">
        {LINKS_FOLDERS_HEADING}
      </h2>
      <ul className="flex flex-col gap-3 lg:gap-5">
        {folders.map((folder, index) => {
          const style = getLinksFolderStyle(index);

          return (
            <li key={folder.id}>
              <LinksFolderCard
                color={style.color}
                folder={folder}
                tabLeftPercent={style.tabLeftPercent}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
