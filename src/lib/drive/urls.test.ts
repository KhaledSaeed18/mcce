import { describe, expect, it } from "vitest";
import { buildDriveFolderUrl } from "./urls";

describe("buildDriveFolderUrl", () => {
  it("points at the folder view on Drive", () => {
    expect(buildDriveFolderUrl("15A8bxA33GichTPcZkyXxaZnP_dRyryTq")).toBe(
      "https://drive.google.com/drive/folders/15A8bxA33GichTPcZkyXxaZnP_dRyryTq"
    );
  });
});
