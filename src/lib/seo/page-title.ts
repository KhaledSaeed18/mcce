import { PAGE_TITLE_SEPARATOR } from "@/config/site";

export function formatPageTitle(...parts: string[]): string {
  return parts.join(PAGE_TITLE_SEPARATOR);
}
