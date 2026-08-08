import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "CuidaTuMascota.es — Salud, cuidado y accesorios para mascotas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 100, marginBottom: 32 }}>🐾</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          CuidaTuMascota.es
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.80)",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Guías y reseñas para el cuidado de tu perro y gato
        </div>
        <div
          style={{
            marginTop: 40,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 999,
            padding: "10px 28px",
            fontSize: 20,
            color: "white",
            fontWeight: 600,
          }}
        >
          cuidatumascota.es
        </div>
      </div>
    ),
    { ...size }
  );
}
