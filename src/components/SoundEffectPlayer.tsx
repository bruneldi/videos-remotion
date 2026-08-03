import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import type { SoundEffect } from "../types";

export const SoundEffectPlayer: React.FC<{ effect: SoundEffect }> = ({ effect }) => {
  const volume = effect.volume ?? 1;

  return (
    <Sequence from={effect.from} layout="none">
      <Audio src={staticFile(`media/${effect.src}`)} volume={() => volume} />
    </Sequence>
  );
};
