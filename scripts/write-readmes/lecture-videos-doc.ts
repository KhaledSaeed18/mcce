import type { DriveNode } from "../../src/lib/drive/types";
import { childFolders, findCourseFolder, type ReadmeContext } from "./context";
import {
  callout,
  heading,
  link,
  paragraph,
  plural,
  table,
  wrapDocument,
} from "./html";
import {
  LECTURE_PLAYLISTS,
  type LecturePlaylist,
} from "./lecture-videos-config";
import { folderLink, readmeLink, sitePage } from "./sections";
import type { ReadmeDoc } from "./types";

const VIDEOS_DOC_NAME = /videos/i;
const LECTURE_NUMBER = /^Lecture (\d+)$/;

function videoUrl(playlist: LecturePlaylist, videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}&list=${playlist.playlistId}`;
}

function playlistUrl(playlist: LecturePlaylist): string {
  return `https://www.youtube.com/playlist?list=${playlist.playlistId}`;
}

function lectureLabel(n: number): string {
  return `Lecture ${String(n).padStart(2, "0")}`;
}

function overviewBody(
  code: string,
  playlist: LecturePlaylist,
  lectures: DriveNode[]
): string {
  const onYoutube = Object.keys(playlist.videos).map(Number);
  const videoCount = Object.values(playlist.videos).flat().length;
  const rows = lectures.map((folder) => {
    const n = Number(folder.name.match(LECTURE_NUMBER)?.[1]);
    const videos = playlist.videos[n];
    return [
      `<b>${folderLink(folder.id, folder.name)}</b>`,
      playlist.topics[n] ?? "",
      videos
        ? videos
            .map(([id, title]) => link(videoUrl(playlist, id), title))
            .join("<br>")
        : "Video files in the Drive folder",
    ];
  });
  return [
    heading(1, `${code} Lecture Videos`),
    paragraph(
      `Recorded lectures for ${code}. Lectures ${Math.min(...onYoutube)} to ${Math.max(...onYoutube)} are on YouTube; the rest are video files inside their Drive folders.`
    ),
    callout(
      `<b>Watch the full playlist:</b> ${link(playlistUrl(playlist), `${code} on YouTube`)} (${plural(videoCount, "video")})`
    ),
    heading(2, "By lecture"),
    table(rows, ["Lecture", "Topic", "Videos"]),
    paragraph(
      "Each lecture folder holds the slides next to the videos, so you can follow along."
    ),
  ].join("");
}

function lectureBody(
  code: string,
  playlist: LecturePlaylist,
  n: number,
  lectures: DriveNode[]
): string {
  const videos = playlist.videos[n] ?? [];
  const byNumber = (k: number) =>
    lectures.find((folder) => folder.name === lectureLabel(k));
  const previous = byNumber(n - 1);
  const next = byNumber(n + 1);
  return [
    heading(
      1,
      `${code} ${lectureLabel(n)} Videos: ${playlist.topics[n] ?? ""}`
    ),
    callout(
      videos
        .map(([id, title]) => `<b>${link(videoUrl(playlist, id), title)}</b>`)
        .join("<br>")
    ),
    paragraph(
      `The slides for this lecture are in this same folder. The ${link(playlistUrl(playlist), "full playlist")} has every recorded lecture.`
    ),
    paragraph(
      [
        previous ? folderLink(previous.id, `Previous: ${previous.name}`) : "",
        next ? folderLink(next.id, `Next: ${next.name}`) : "",
      ]
        .filter(Boolean)
        .join(" | ")
    ),
  ].join("");
}

export function buildLectureVideoDocs(ctx: ReadmeContext): ReadmeDoc[] {
  return Object.entries(LECTURE_PLAYLISTS).flatMap(([code, playlist]) => {
    const course = findCourseFolder(ctx, code);
    const lecturesFolder =
      course && childFolders(ctx, course.id).find((f) => f.name === "Lectures");
    if (!(course && lecturesFolder)) {
      return [];
    }
    const lectures = childFolders(ctx, lecturesFolder.id).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const nav = paragraph(
      [
        sitePage(`/course/${code}`, `${code} course page`),
        folderLink(lecturesFolder.id, "All lectures"),
        readmeLink(ctx, course.id, "Course README"),
        sitePage(`/exams#${code}`, "Past exams"),
      ]
        .filter(Boolean)
        .join(" | ")
    );
    const docs = ctx.nodes.filter(
      (node) =>
        node.kind === "doc" &&
        node.courseCode === code &&
        VIDEOS_DOC_NAME.test(node.name)
    );
    return docs.flatMap((node) => {
      const parent = ctx.nodes.find(
        (candidate) => candidate.id === node.parentId
      );
      const n = Number(parent?.name.match(LECTURE_NUMBER)?.[1]);
      const isOverview = node.parentId === lecturesFolder.id;
      if (!(isOverview || playlist.videos[n])) {
        return [];
      }
      const body = isOverview
        ? overviewBody(code, playlist, lectures)
        : lectureBody(code, playlist, n, lectures);
      return [
        {
          docId: node.id,
          folderId: node.parentId ?? lecturesFolder.id,
          html: wrapDocument(body + nav),
          name: isOverview
            ? `${code} Lecture Videos`
            : `${lectureLabel(n)} Videos`,
        },
      ];
    });
  });
}
