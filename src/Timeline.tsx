import type { TransitionPresentation } from "@remotion/transitions";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { useCaptions } from "./captions/useCaptions";
import { AnimatedCaptions } from "./components/AnimatedCaptions";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { EmptyState } from "./components/EmptyState";
import { ImageClip } from "./components/ImageClip";
import { ImageOverlayCard } from "./components/ImageOverlayCard";
import { SoundEffectPlayer } from "./components/SoundEffectPlayer";
import { TitleCard } from "./components/TitleCard";
import { VideoClip } from "./components/VideoClip";
import { captionsSrtPath, music, overlays, scenes, soundEffects } from "./config/timeline";
import type { TransitionKind } from "./types";

const getPresentation = (
  kind: Exclude<TransitionKind, "none">,
): TransitionPresentation<Record<string, unknown>> => {
  if (kind === "fade") return fade();
  if (kind === "slide") return slide();
  return wipe();
};

export const Timeline: React.FC = () => {
  const captions = useCaptions(captionsSrtPath);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {scenes.length === 0 ? (
        <EmptyState />
      ) : (
        <TransitionSeries>
          {scenes.map((scene, index) => {
            const isLast = index === scenes.length - 1;
            const transition = scene.transitionToNext;

            return (
              <React.Fragment key={scene.id}>
                <TransitionSeries.Sequence durationInFrames={scene.durationInFrames}>
                  {scene.type === "video" ? (
                    <VideoClip scene={scene} />
                  ) : (
                    <ImageClip scene={scene} />
                  )}
                </TransitionSeries.Sequence>
                {!isLast && transition && transition.kind !== "none" ? (
                  <TransitionSeries.Transition
                    presentation={getPresentation(transition.kind)}
                    timing={linearTiming({ durationInFrames: transition.durationInFrames })}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </TransitionSeries>
      )}

      {overlays.map((overlay) => (
        <Sequence key={overlay.id} from={overlay.from} durationInFrames={overlay.durationInFrames}>
          {overlay.type === "title" ? (
            <TitleCard overlay={overlay} />
          ) : (
            <ImageOverlayCard overlay={overlay} />
          )}
        </Sequence>
      ))}

      {soundEffects.map((effect) => (
        <SoundEffectPlayer key={effect.id} effect={effect} />
      ))}

      {music ? <BackgroundMusic track={music} /> : null}

      <AnimatedCaptions captions={captions} />
    </AbsoluteFill>
  );
};
