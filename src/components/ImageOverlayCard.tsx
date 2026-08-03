import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ImageOverlay } from "../types";

export const ImageOverlayCard: React.FC<{ overlay: ImageOverlay }> = ({ overlay }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const exit = interpolate(
    frame,
    [overlay.durationInFrames - 15, overlay.durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const overlayWidth = width * (overlay.widthFraction ?? 0.7);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile(`media/${overlay.src}`)}
        style={{
          width: overlayWidth,
          opacity: enter * exit,
          transform: `scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
          borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      />
    </AbsoluteFill>
  );
};
