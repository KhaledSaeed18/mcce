import { Badge } from "@/components/ui/badge";

interface CourseTopicsProps {
  topics: string[];
}

export function CourseTopics({ topics }: CourseTopicsProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h2 className="text-muted-foreground text-xs uppercase tracking-wide">
        Topics
      </h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Badge key={topic} variant="secondary">
            {topic}
          </Badge>
        ))}
      </div>
    </div>
  );
}
