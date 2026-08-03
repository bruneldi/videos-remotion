import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { TitleOverlay } from "../types";

export const TitleCard: React.FC<{ overlay: TitleOverlay }> = ({ overlay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const exit = interpolate(
    frame,
    [overlay.durationInFrames - 15, overlay.durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 160 }}>
      <div
        style={{
          opacity: enter * exit,
          transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`,
          textAlign: "center",
          maxWidth: "85%",
        }}
      >
        <h1
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 76,
            fontWeight: 900,
            color: "white",
            textShadow: "0 4px 16px rgba(0,0,0,0.65)",
            margin: 0,
          }}
        >
          {overlay.text}
        </h1>
        {overlay.subtitle ? (
          <p
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 40,
              fontWeight: 600,
              color: "white",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
              marginTop: 12,
            }}
          >
            {overlay.subtitle}
          </p>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
