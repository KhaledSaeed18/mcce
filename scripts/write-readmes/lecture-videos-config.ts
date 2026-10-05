export interface LecturePlaylist {
  playlistId: string;
  topics: Record<number, string>;
  /** Lecture number to its YouTube videos as [videoId, title]. Missing lectures have video files in Drive instead. */
  videos: Record<number, [videoId: string, title: string][]>;
}

export const LECTURE_PLAYLISTS: Record<string, LecturePlaylist> = {
  CENG557: {
    playlistId: "PL9ldhHhtFlnfVKwoHVJqTGHqXX-CaWOEd",
    topics: {
      1: "Introduction",
      2: "Wi-Fi and mobile access",
      3: "Optical, DSL, and Ethernet access",
      4: "SONET/SDH",
      5: "The need for QoS",
      6: "ATM",
      7: "MPLS",
    },
    videos: {
      1: [["aHcogP2qhuk", "L1 Intro"]],
      2: [
        ["HTgK8tCQkjA", "L2 Wireless, part 1"],
        ["l8P4cAnCpBA", "L2 Mobile, part 2"],
      ],
      3: [["kSp-r1Ocfys", "L3 Wired access"]],
      4: [
        ["juB-skA0Tvg", "L4 SONET, part 1"],
        ["NJv7C2Ms_yo", "L4 SONET, part 2"],
      ],
      5: [
        ["fPWo-Zane8c", "L5 QoS, part 1"],
        ["O7XJFBQNf7Q", "L5 QoS, part 2"],
      ],
    },
  },
};
