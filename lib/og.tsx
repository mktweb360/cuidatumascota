import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

// Imagen Open Graph común (1200×630) para posts, guías y páginas fijas.
// Cumplimiento Amazon Associates: nunca precios, valoraciones ni «más vendido».

export const ogSize = { width: 1200, height: 630 };

/** Lee una imagen de /public y la devuelve como data URI (o null si no existe). */
function publicImageDataUri(publicPath?: string): string | null {
  if (!publicPath) return null;
  try {
    const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const ext = path.extname(file).toLowerCase();
    const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : null;
    if (!mime) return null;
    return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
  } catch {
    return null;
  }
}

export function renderOgImage({
  title,
  kicker = "Guía",
  photo,
}: {
  title: string;
  kicker?: string;
  /** Ruta en /public de una foto opcional (p. ej. la imagen destacada del post). */
  photo?: string;
}) {
  const src = publicImageDataUri(photo);
  const max = src ? 80 : 95;
  const text = title.length > max ? title.slice(0, max - 3).trimEnd() + "…" : title;
  const base = src ? 50 : 62;
  const fontSize = text.length > 70 ? base - 8 : text.length > 45 ? base : base + 6;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: src ? "720px" : "100%",
            height: "100%",
            padding: "60px 70px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ fontSize: 40 }}>🐾</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "white" }}>CuidaTuMascota.es</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "rgba(255,255,255,0.18)",
                borderRadius: 999,
                padding: "6px 20px",
                fontSize: 20,
                color: "white",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: 24,
              }}
            >
              {kicker}
            </div>
            <div style={{ display: "flex", fontSize, fontWeight: 900, color: "white", lineHeight: 1.12, letterSpacing: "-1px" }}>
              {text}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.82)" }}>
            Guías y análisis para el cuidado de tu perro y gato
          </div>
        </div>
        {src && (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={src} width={480} height={630} style={{ width: 480, height: 630, objectFit: "cover" }} />
        )}
      </div>
    ),
    { ...ogSize }
  );
}
