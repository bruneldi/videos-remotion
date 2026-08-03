import React from "react";
import { Composition } from "remotion";
import { COMPOSITION_ID, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "./constants";
import { overlays, scenes } from "./config/timeline";
import { Timeline } from "./Timeline";
import { getTimelineDurationInFrames } from "./utils/timeline-duration";

import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMPOSITION_ID}
      component={Timeline}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      durationInFrames={getTimelineDurationInFrames(scenes, overlays)}
    />
  );
};
