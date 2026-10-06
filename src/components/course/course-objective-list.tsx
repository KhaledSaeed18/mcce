interface CourseObjectiveListProps {
  objectives: string[];
}

export function CourseObjectiveList({ objectives }: CourseObjectiveListProps) {
  return (
    <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
      {objectives.map((objective) => (
        <li key={objective}>{objective}</li>
      ))}
    </ul>
  );
}
