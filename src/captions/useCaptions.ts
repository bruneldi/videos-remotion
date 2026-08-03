import { parseSrt, type Caption } from "@remotion/captions";
import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

/**
 * Carga y parsea un archivo .srt desde public/media/captions.
 * Si `path` es null o el archivo todavia no existe, devuelve un
 * arreglo vacio en lugar de romper el preview/render.
 */
export const useCaptions = (path: string | null): Caption[] => {
  const [handle] = useState(() => delayRender(`Cargando subtitulos: ${path}`));
  const [captions, setCaptions] = useState<Caption[]>([]);

  useEffect(() => {
    if (!path) {
      continueRender(handle);
      return;
    }

    fetch(staticFile(path))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se encontro el archivo de subtitulos: ${path}`);
        }
        return response.text();
      })
      .then((input) => {
        const { captions: parsed } = parseSrt({ input });
        setCaptions(parsed);
      })
      .catch(() => {
        setCaptions([]);
      })
      .finally(() => {
        continueRender(handle);
      });
  }, [handle, path]);

  return captions;
};
