import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Se muestra mientras `src/config/timeline.ts` no tiene escenas configuradas,
 * para que el preview de Remotion Studio nunca quede en blanco.
 */
export const EmptyState: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: "#111111",
      justifyContent: "center",
      alignItems: "center",
      padding: 80,
    }}
  >
    <div style={{ textAlign: "center", fontFamily: "Arial, Helvetica, sans-serif", color: "white" }}>
      <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 24 }}>
        Proyecto Remotion listo
      </div>
      <div style={{ fontSize: 32, lineHeight: 1.5, opacity: 0.85 }}>
        Agregá tu video original a public/media/videos y definí tus escenas
        en src/config/timeline.ts para empezar a editar.
      </div>
    </div>
  </AbsoluteFill>
);
