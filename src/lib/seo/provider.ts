import { CCE_OFFICIAL_DEPARTMENT_URL } from "@/config/cce/content";
import { PROGRAM_UNIVERSITY, PROGRAM_UNIVERSITY_SHORT } from "@/config/site";

export const UNIVERSITY_PROVIDER = {
  "@type": "CollegeOrUniversity",
  alternateName: PROGRAM_UNIVERSITY_SHORT,
  name: PROGRAM_UNIVERSITY,
  url: CCE_OFFICIAL_DEPARTMENT_URL,
};
