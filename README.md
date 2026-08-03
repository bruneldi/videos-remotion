# videos-remotion

Proyecto de [Remotion](https://www.remotion.dev/) para editar videos
verticales (formato **1080×1920**, 9:16) listos para **Instagram Reels** y
**TikTok**, escribiendo la edición en código React en lugar de usar un editor
de video tradicional.

## Qué incluye

- Composición vertical `VerticalReel` (1080×1920 @ 30fps) en `src/Root.tsx`.
- Un timeline declarativo (`src/config/timeline.ts`) donde se arma el video:
  escenas de video o imagen, cortes/recortes, acercamientos (Ken Burns),
  títulos, imágenes flotantes, transiciones, música y efectos de sonido.
- Subtítulos sincronizados y animados estilo TikTok (karaoke, palabra por
  palabra) a partir de un archivo `.srt`, usando `@remotion/captions`.
- Transiciones entre escenas (`fade`, `slide`, `wipe`) con
  `@remotion/transitions`.
- Carpeta `public/media/` para guardar tus archivos originales (video, fotos,
  música, efectos, subtítulos) sin que el código los sobrescriba nunca.
- [Remotion Agent Skills](https://www.remotion.dev/docs/ai/coding-agents)
  oficiales instaladas en `.claude/skills` para asistir a Claude Code con
  patrones específicos de Remotion (creación, captions, render, etc).

## Requisitos

- Node.js 18 o superior (probado con Node 22).

## Instalación

```bash
npm install
```

## Vista previa (Remotion Studio)

```bash
npm run dev
```

Abre Remotion Studio en `http://localhost:3000`, donde podés reproducir la
composición, moverte por el timeline y ver los cambios en vivo mientras
editás los archivos de `src/`.

## Cómo armar tu video

1. **Agregá tus archivos originales** dentro de `public/media/`:
   - `public/media/videos/` → el o los videos originales.
   - `public/media/images/` → fotos o imágenes.
   - `public/media/audio/music/` → música de fondo.
   - `public/media/audio/sfx/` → efectos de sonido.
   - `public/media/captions/` → subtítulos en formato `.srt`.

   Estos archivos nunca se modifican ni se sobrescriben: la edición (cortes,
   zoom, transiciones) se aplica solo al renderizar. Ver
   `public/media/README.md` para más detalle.

2. **Editá `src/config/timeline.ts`** para definir:
   - `scenes`: la lista ordenada de escenas (`type: "video"` o
     `type: "image"`), con duración, recorte (`trimBeforeFrames` /
     `trimAfterFrames`), acercamiento (`kenBurns`) y transición hacia la
     siguiente escena (`transitionToNext`).
   - `overlays`: títulos (`type: "title"`) e imágenes flotantes
     (`type: "image-overlay"`) con su momento de aparición (`from`) y
     duración.
   - `soundEffects`: efectos de sonido puntuales con su momento de reproducción.
   - `music`: la pista de música de fondo (opcional).
   - `captionsSrtPath`: ruta al archivo `.srt` dentro de
     `public/media/captions` para los subtítulos animados.

   Los tipos completos están documentados en `src/types.ts`.

3. Los cambios se reflejan al instante en `npm run dev`.

## Renderizar a MP4

```bash
npx remotion render VerticalReel out/video.mp4
```

El archivo final queda en `out/video.mp4` (carpeta ignorada por git).

## Estructura del proyecto

```
src/
├── index.ts                     Punto de entrada (registerRoot)
├── Root.tsx                     Registra la composición VerticalReel
├── Timeline.tsx                 Arma escenas + transiciones + overlays + audio
├── constants.ts                 Dimensiones, fps y duración por defecto
├── types.ts                     Tipos de escenas, overlays, audio y subtítulos
├── config/
│   └── timeline.ts              Editá acá tu video (escenas, overlays, audio)
├── components/
│   ├── VideoClip.tsx             Escena de video con corte + Ken Burns
│   ├── ImageClip.tsx             Escena de imagen con Ken Burns
│   ├── TitleCard.tsx             Título animado
│   ├── ImageOverlayCard.tsx      Imagen flotante animada
│   ├── AnimatedCaptions.tsx      Subtítulos animados estilo TikTok
│   ├── BackgroundMusic.tsx       Música de fondo
│   ├── SoundEffectPlayer.tsx     Efectos de sonido puntuales
│   └── EmptyState.tsx            Placeholder mientras no hay escenas cargadas
├── captions/
│   └── useCaptions.ts           Carga y parsea el .srt de subtítulos
└── utils/
    └── timeline-duration.ts     Calcula la duración total del video
```

## Notas

- Este entorno de nube resuelve automáticamente el navegador de Remotion
  (Chromium) para el render; en tu máquina local `npx remotion render`
  descarga su propio Chrome Headless Shell la primera vez sin que tengas
  que hacer nada.
- Para más patrones y comandos, las Remotion Agent Skills instaladas en
  `.claude/skills` (`remotion-create`, `remotion-captions`,
  `remotion-render`, `remotion-markup`, etc.) están disponibles para asistir
  durante la edición.
