# public/media

Esta carpeta guarda los **archivos audiovisuales originales** del proyecto
(el material que subís vos). Remotion los sirve como archivos estáticos vía
`staticFile("media/...")`, y nada en el código los modifica ni los
sobrescribe: los cortes, recortes y efectos se aplican solo al renderizar,
nunca sobre el archivo original.

No están versionados en git (ver `.gitignore`) para no inflar el repositorio
con binarios pesados; quedan solamente en el sistema de archivos local.

## Estructura

```
public/media/
├── videos/    -> Video(s) original(es) sin editar (mp4, mov, webm...)
├── images/    -> Fotos, logos, imágenes para overlays o escenas
├── audio/
│   ├── music/ -> Música de fondo
│   └── sfx/   -> Efectos de sonido puntuales
└── captions/  -> Subtítulos en formato .srt
```

## Cómo referenciar estos archivos

En `src/config/timeline.ts`, las rutas son relativas a esta carpeta. Por
ejemplo, un archivo en `public/media/videos/mi-video.mp4` se referencia como
`src: "videos/mi-video.mp4"` en una escena de tipo `video`.
