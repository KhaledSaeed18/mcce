import { SITE_URL } from "@/config/site";

export const COURSES_URL = `${SITE_URL}/course`;

export function courseUrl(code: string): string {
  return `${COURSES_URL}/${code}`;
}
