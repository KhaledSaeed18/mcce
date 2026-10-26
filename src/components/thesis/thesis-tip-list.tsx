import { LightbulbIcon } from "lucide-react";
import { ThesisTipText } from "@/components/thesis/thesis-tip-text";
import type { ThesisTip } from "@/lib/thesis/types";

interface ThesisTipListProps {
  tips: ThesisTip[];
  title: string;
}

export function ThesisTipList({ tips, title }: ThesisTipListProps) {
  return (
    <div className="flex flex-col gap-2 rounded border-2 border-dashed p-3">
      <h4 className="inline-flex items-center gap-1.5 font-head text-sm">
        <LightbulbIcon className="size-4 text-primary" />
        {title}
      </h4>
      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
        {tips.map((tip) => (
          <li key={tip.text}>
            <ThesisTipText tip={tip} />
          </li>
        ))}
      </ul>
    </div>
  );
}
