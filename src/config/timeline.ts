import type { MusicTrack, Overlay, Scene, SoundEffect } from "../types";

/**
 * Editá este archivo para armar tu video: agregá las escenas (videos o
 * imágenes), los overlays (títulos, imágenes flotantes), los efectos de
 * sonido y la música de fondo. Los archivos referenciados deben existir
 * dentro de `public/media/...`.
 *
 * Ejemplo de una escena de video con corte, Ken Burns y transición:
 *
 * {
 *   type: "video",
 *   id: "escena-1",
 *   src: "videos/mi-clip.mp4",
 *   trimBeforeFrames: 60,
 *   trimAfterFrames: 240,
 *   durationInFrames: 180,
 *   kenBurns: { fromScale: 1, toScale: 1.15 },
 *   transitionToNext: { kind: "fade", durationInFrames: 15 },
 * }
 */
export const scenes: Scene[] = [];

export const overlays: Overlay[] = [];

export const soundEffects: SoundEffect[] = [];

export const music: MusicTrack | null = null;

/** Ruta al archivo de subtítulos (formato SRT) dentro de public/media/captions. */
export const captionsSrtPath: string | null = null;
