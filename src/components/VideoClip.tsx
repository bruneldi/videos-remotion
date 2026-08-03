import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { VideoScene } from "../types";

export const VideoClip: React.FC<{ scene: VideoScene }> = ({ scene }) => {
  const frame = useCurrentFrame();

  const scale = scene.kenBurns
    ? interpolate(
        frame,
        [0, scene.durationInFrames],
        [scene.kenBurns.fromScale, scene.kenBurns.toScale],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 1;

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
      <OffthreadVideo
        src={staticFile(`media/${scene.src}`)}
        trimBefore={scene.trimBeforeFrames}
        trimAfter={scene.trimAfterFrames}
        muted={scene.muted}
        volume={scene.muted ? 0 : (scene.volume ?? 1)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};
