import type { TransitionPresentation } from "@remotion/transitions";

export type TransitionKind = "fade" | "slide" | "wipe" | "none";

export type KenBurns = {
  /** Escala al inicio de la escena (1 = tamano original). */
  fromScale: number;
  /** Escala al final de la escena. */
  toScale: number;
};

type SceneBase = {
  id: string;
  durationInFrames: number;
  /**
   * Transicion hacia la SIGUIENTE escena. `durationInFrames` es la
   * superposicion (en frames) entre esta escena y la siguiente.
   */
  transitionToNext?: {
    kind: TransitionKind;
    durationInFrames: number;
  };
  /** Acercamiento animado tipo Ken Burns aplicado a esta escena. */
  kenBurns?: KenBurns;
};

export type VideoScene = SceneBase & {
  type: "video";
  /** Ruta relativa a public/media/videos, ej: "videos/clip-1.mp4" */
  src: string;
  /** Punto de corte de entrada, en frames del video original. */
  trimBeforeFrames?: number;
  /** Punto de corte de salida, en frames del video original. */
  trimAfterFrames?: number;
  volume?: number;
  muted?: boolean;
};

export type ImageScene = SceneBase & {
  type: "image";
  /** Ruta relativa a public/media/images, ej: "images/foto-1.jpg" */
  src: string;
};

export type Scene = VideoScene | ImageScene;

export type TitleOverlay = {
  type: "title";
  id: string;
  text: string;
  subtitle?: string;
  from: number;
  durationInFrames: number;
};

export type ImageOverlay = {
  type: "image-overlay";
  id: string;
  /** Ruta relativa a public/media/images */
  src: string;
  from: number;
  durationInFrames: number;
  /** Ancho como fraccion del ancho de la composicion (0-1). */
  widthFraction?: number;
};

export type Overlay = TitleOverlay | ImageOverlay;

export type SoundEffect = {
  id: string;
  /** Ruta relativa a public/media/audio/sfx */
  src: string;
  from: number;
  volume?: number;
};

export type MusicTrack = {
  /** Ruta relativa a public/media/audio/music */
  src: string;
  volume?: number;
  /** Recorta el inicio de la pista musical, en frames. */
  trimBeforeFrames?: number;
};

export type { TransitionPresentation };
