import { describe, expect, it } from "vitest";
import { LINKS_URL } from "@/config/links";
import type { SemesterFolder } from "@/lib/drive/types";
import { courseUrl } from "@/lib/seo/course-url";
import { buildLinksPageSchema } from "./links-schema";

const SYNCED_AT = "2026-11-05T10:17:03.938Z";
const FOLDER: SemesterFolder = {
  courses: [{ code: "ENGG515", name: "Advanced Engineering Mathematics" }],
  fileCount: 12,
  href: "https://drive.google.com/drive/folders/a",
  id: "a",
  term: "Fall",
  year: 1,
};

describe("buildLinksPageSchema", () => {
  it("describes the page and carries the last sync as its modified date", () => {
    const schema = buildLinksPageSchema([FOLDER], SYNCED_AT);

    expect(schema["@type"]).toBe("CollectionPage");
    expect(schema.url).toBe(LINKS_URL);
    expect(schema.dateModified).toBe(SYNCED_AT);
  });

  it("lists each folder with its Drive link, size, and course pages", () => {
    const { mainEntity } = buildLinksPageSchema([FOLDER], SYNCED_AT);
    const [{ item, position }] = mainEntity.itemListElement;

    expect(mainEntity.numberOfItems).toBe(1);
    expect(position).toBe(1);
    expect(item).toMatchObject({
      collectionSize: 12,
      name: "Year 1, Fall semester",
      url: FOLDER.href,
    });
    expect(item.about[0]).toMatchObject({
      courseCode: "ENGG515",
      url: courseUrl("ENGG515"),
    });
  });
});
