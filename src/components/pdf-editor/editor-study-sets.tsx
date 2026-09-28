import { EditorIdleSection } from "@/components/pdf-editor/editor-idle-section";
import { StudySetRow } from "@/components/pdf-editor/study-set-row";
import { STUDY_SETS_LABEL } from "@/config/pdf-editor";
import { useStudySets } from "@/hooks/use-study-sets";

/** The study sets saved in this browser, on the blank editor beside the
 * recently opened files. */
export function EditorStudySets() {
  const sets = useStudySets();
  if (sets.length === 0) {
    return null;
  }
  return (
    <EditorIdleSection title={STUDY_SETS_LABEL}>
      <ul className="flex flex-col gap-1">
        {sets.map((set) => (
          <StudySetRow key={set.id} set={set} />
        ))}
      </ul>
    </EditorIdleSection>
  );
}
