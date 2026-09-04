import { describe, expect, it } from "vitest";
import { DRIVE_DIRECT_LINKS, findDriveDirectLinksForYear } from "./drive-links";

describe("DRIVE_DIRECT_LINKS", () => {
  it("includes all three drive sources", () => {
    expect(DRIVE_DIRECT_LINKS).toHaveLength(3);
    expect(DRIVE_DIRECT_LINKS.map((link) => link.driveLabel)).toEqual([
      "LIU | MCCE 1",
      "LIU | MCCE 2.1",
      "LIU | MCCE 2.2",
    ]);
  });

  it("finds the direct link for year 1", () => {
    const links = findDriveDirectLinksForYear(1);
    expect(links).toHaveLength(1);
    expect(links[0].driveLabel).toBe("LIU | MCCE 1");
    expect(links[0].href).toBe(
      "https://drive.google.com/drive/folders/15A8bxA33GichTPcZkyXxaZnP_dRyryTq"
    );
  });

  it("finds both direct links for year 2", () => {
    const links = findDriveDirectLinksForYear(2);
    expect(links).toHaveLength(2);
    expect(links.map((link) => link.driveLabel)).toEqual([
      "LIU | MCCE 2.1",
      "LIU | MCCE 2.2",
    ]);
    expect(links[1].href).toBe(
      "https://drive.google.com/drive/folders/1Ed1qu98go160SHcte4FstkPVhxX9pRK1"
    );
  });
});
