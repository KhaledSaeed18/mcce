import { describe, expect, it } from "vitest";
import { toListingNode } from "./listing-node";
import { makeNode } from "./test-fixtures";

describe("toListingNode", () => {
  const node = makeNode({
    categoryPath: ["Lectures"],
    id: "a",
    name: "Lecture 1.pdf",
    pathIds: ["root", "a"],
    pathNames: ["Root", "Lecture 1.pdf"],
    webViewLink: "https://drive.google.com/file/d/a/view",
  });

  it("drops folder paths", () => {
    const listing = toListingNode(node);

    expect(listing.pathIds).toEqual([]);
    expect(listing.pathNames).toEqual([]);
    expect(listing.categoryPath).toEqual([]);
  });

  it("keeps what a card and its preview read", () => {
    expect(toListingNode(node)).toMatchObject({
      id: "a",
      name: "Lecture 1.pdf",
      webViewLink: "https://drive.google.com/file/d/a/view",
    });
  });

  it("leaves out fields the index still carries from older syncs", () => {
    const legacy = { ...node, iconLink: "https://example.com/icon.png" };

    expect(toListingNode(legacy)).not.toHaveProperty("iconLink");
  });
});
