import { describe, expect, it } from "vitest";
import { MAX_ZOOM } from "@/config/pdf-editor";
import { resolveSavedView } from "./saved-view";

describe("resolveSavedView", () => {
  it("returns a stored view that fits the document", () => {
    expect(
      resolveSavedView({ page: 3, zoom: 1.5, zoomMode: "custom" }, 10)
    ).toEqual({ page: 3, zoom: 1.5, zoomMode: "custom" });
  });

  it("keeps the page inside a document that has since lost pages", () => {
    expect(
      resolveSavedView({ page: 12, zoom: 1, zoomMode: "fit-width" }, 5)?.page
    ).toBe(4);
  });

  it("holds the zoom inside the range the editor allows", () => {
    expect(
      resolveSavedView({ page: 0, zoom: 99, zoomMode: "custom" }, 5)?.zoom
    ).toBe(MAX_ZOOM);
  });

  it("ignores anything that is not a view", () => {
    expect(resolveSavedView(null, 5)).toBeNull();
    expect(resolveSavedView({ page: "2" }, 5)).toBeNull();
    expect(
      resolveSavedView({ page: 1, zoom: 1, zoomMode: "stretch" }, 5)
    ).toBeNull();
  });

  it("has nowhere to go in a document with no pages", () => {
    expect(
      resolveSavedView({ page: 0, zoom: 1, zoomMode: "custom" }, 0)
    ).toBeNull();
  });
});
