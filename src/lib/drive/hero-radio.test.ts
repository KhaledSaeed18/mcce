import { describe, expect, it } from "vitest";
import { HERO_RADIO_MATERIAL_LIMIT } from "@/config/hero-radio";
import driveIndex from "@/data/drive-index.json";
import type { DriveIndex } from "@/lib/drive/types";
import { buildHeroStations, stationFrequency } from "./hero-radio";

const { nodes } = driveIndex as DriveIndex;
const STATIONS = buildHeroStations(nodes);

describe("stationFrequency", () => {
  it("reads the course number, with lab sections half a step above", () => {
    expect(stationFrequency("EENG537")).toBe(537);
    expect(stationFrequency("CENG566L")).toBe(566.5);
  });
});

describe("buildHeroStations", () => {
  it("gives every indexed course exactly one station", () => {
    const codes = new Set(
      nodes.flatMap((node) =>
        node.kind !== "folder" && node.courseCode && node.courseName
          ? [node.courseCode]
          : []
      )
    );
    expect(new Set(STATIONS.map((station) => station.code))).toEqual(codes);
    expect(STATIONS).toHaveLength(codes.size);
  });

  it("lays the stations out in rising frequency", () => {
    const frequencies = STATIONS.map((station) => station.frequency);
    expect(frequencies).toEqual([...frequencies].sort((a, b) => a - b));
    expect(new Set(frequencies).size).toBe(frequencies.length);
  });

  it("counts each course's files the way the index does", () => {
    for (const station of STATIONS) {
      const files = nodes.filter(
        (node) => node.kind !== "folder" && node.courseCode === station.code
      );
      expect(station.fileCount).toBe(files.length);
    }
  });

  it("splits every file of a course across its material entries", () => {
    for (const station of STATIONS) {
      const total = station.materials.reduce(
        (sum, material) => sum + material.count,
        0
      );
      expect(total).toBe(station.fileCount);
      expect(station.materials.length).toBeLessThanOrEqual(
        HERO_RADIO_MATERIAL_LIMIT + 1
      );
    }
  });
});
