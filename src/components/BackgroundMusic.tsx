import React from "react";
import { Audio, staticFile } from "remotion";
import type { MusicTrack } from "../types";

export const BackgroundMusic: React.FC<{ track: MusicTrack }> = ({ track }) => {
  const volume = track.volume ?? 0.5;

  return (
    <Audio
      src={staticFile(`media/${track.src}`)}
      volume={() => volume}
      trimBefore={track.trimBeforeFrames}
    />
  );
};
