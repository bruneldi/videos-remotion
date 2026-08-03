import { FALLBACK_DURATION_IN_FRAMES } from "../constants";
import type { Overlay, Scene } from "../types";

export const getScenesDurationInFrames = (scenes: Scene[]): number => {
  let total = 0;

  scenes.forEach((scene, index) => {
    total += scene.durationInFrames;
    const isLast = index === scenes.length - 1;
    if (!isLast && scene.transitionToNext && scene.transitionToNext.kind !== "none") {
      total -= scene.transitionToNext.durationInFrames;
    }
  });

  return total;
};

export const getTimelineDurationInFrames = (
  scenes: Scene[],
  overlays: Overlay[],
): number => {
  const scenesDuration = getScenesDurationInFrames(scenes);
  const overlaysEnd = overlays.reduce(
    (max, overlay) => Math.max(max, overlay.from + overlay.durationInFrames),
    0,
  );
  const total = Math.max(scenesDuration, overlaysEnd);

  return total > 0 ? total : FALLBACK_DURATION_IN_FRAMES;
};
