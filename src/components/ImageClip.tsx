import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { ImageScene } from "../types";

export const ImageClip: React.FC<{ scene: ImageScene }> = ({ scene }) => {
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
      <Img
        src={staticFile(`media/${scene.src}`)}
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
