import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const msToFrame = (ms: number, fps: number) => (ms / 1000) * fps;

export const AnimatedCaptions: React.FC<{ captions: Caption[] }> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = (frame / fps) * 1000;

  if (captions.length === 0) {
    return null;
  }

  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: 350,
  });

  const page = pages.find(
    (p) => timeMs >= p.startMs && timeMs < p.startMs + p.durationMs,
  );

  if (!page) {
    return null;
  }

  const pageEnter = spring({
    frame: frame - msToFrame(page.startMs, fps),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 220 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "88%",
          columnGap: 14,
          rowGap: 6,
          opacity: pageEnter,
          transform: `scale(${interpolate(pageEnter, [0, 1], [0.9, 1])})`,
        }}
      >
        {page.tokens.map((token, i) => {
          const active = timeMs >= token.fromMs && timeMs < token.toMs;
          const wordEnter = spring({
            frame: frame - msToFrame(token.fromMs, fps),
            fps,
            config: { damping: 200 },
          });

          return (
            <span
              key={i}
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: 800,
                fontSize: 64,
                lineHeight: 1.3,
                color: active ? "#FFD400" : "#FFFFFF",
                WebkitTextStroke: "2px black",
                textShadow: "0 4px 12px rgba(0,0,0,0.6)",
                transform: `scale(${interpolate(wordEnter, [0, 1], [0.85, 1])})`,
                display: "inline-block",
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
