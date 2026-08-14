export type CurriculumTerm = "fall" | "spring" | "summer";
export type CurriculumCourseKind = "course" | "lab" | "thesis";

export interface CurriculumCourse {
  code: string;
  corequisites: string[];
  credits: number;
  description: string | null;
  kind: CurriculumCourseKind;
  name: string;
  objectives: string[];
  prerequisites: string[];
}

export interface CurriculumSemester {
  courses: CurriculumCourse[];
  id: string;
  label: string;
  term: CurriculumTerm;
}

export interface CurriculumYear {
  id: string;
  label: string;
  semesters: CurriculumSemester[];
  year: number;
}

export interface CurriculumCourseContext {
  course: CurriculumCourse;
  semester: CurriculumSemester;
  year: CurriculumYear;
}
