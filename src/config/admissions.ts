export const ADMISSIONS_PAGE_PATH = "/admissions";

export interface AdmissionsTrack {
  gpaRequirement: string;
  id: "liu" | "non-liu";
  label: string;
  /** Fits the home tile and other tight rows, where the full label wraps. */
  shortLabel: string;
  steps: string[];
}

export const ADMISSIONS_NON_LIU_REQUIREMENTS: string[] = [
  "Certified copy of the Lebanese Baccalaureate Degree (BACC II), Technical Baccalaureate degree (BT3), or approved equivalent (Foreign Baccalaureate).",
  "Certified copy of the university degree.",
  "Certified copy of the university transcript.",
  "One copy of the identification card.",
  "One copy of family civil status record.",
  "One recent passport-size color photo.",
  "All Lebanese applicants must submit national social security papers (daman), if available, or pay $135 and fill the required papers at the social security office.",
  "Application fee: $50 (non-refundable).",
  "English entrance exam fee: $20.",
];

export const ADMISSIONS_TRACKS: AdmissionsTrack[] = [
  {
    gpaRequirement:
      "Major GPA and cumulative GPA of at least 2.0 for LIU bachelor graduates.",
    id: "liu",
    label: "For LIU bachelor graduates",
    shortLabel: "LIU graduates",
    steps: [
      "Submit the application through the admissions office.",
      "Admissions opens a file including your official transcript and bachelor clearance status.",
      "The file is sent to the School of Engineering for evaluation.",
      "The school returns acceptance or rejection, typically within 72 hours.",
      "If accepted, the registrar applies recommendations, enters remedial requirements if needed, and finalizes your major file and curriculum.",
    ],
  },
  {
    gpaRequirement:
      "Major GPA of at least 2.25 for bachelor graduates from recognized institutions licensed by the Ministry of Higher Education.",
    id: "non-liu",
    label: "For non-LIU bachelor graduates",
    shortLabel: "Non-LIU graduates",
    steps: [
      "Submit an application to the registrar office.",
      "Registrar opens a file with your official mailed transcript, certified degree, certified identification, and supporting documents.",
      "The file and English exam result are sent to the School of Engineering by a designated registrar officer.",
      "The school studies the file and returns acceptance or rejection, typically within 72 hours.",
      "If accepted, the registrar officer applies recommendations, enters remedial requirements if needed, then finalizes the curriculum file with the acceptance letter.",
    ],
  },
];

export const ADMISSIONS_PROGRAM_WINDOW =
  "Master program applications should be submitted before the end of September and before the end of the first week of the fall semester. Applicants may still be assessed during the year based on their bachelor background.";

export const ADMISSIONS_CURRENT_LIU_NOTE =
  "If you are already an LIU student, pass by the admissions office to fill out an application form and pay the $50 non-refundable application fee.";

export const ADMISSIONS_CONTACT_EMAILS: string[] = [
  "admissions@liu.edu.lb",
  "soe@liu.edu.lb",
  "info@liu.edu.lb",
];
