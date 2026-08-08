import { ImageResponse } from "next/og";
import { categories } from "@/data/products";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const cat = categories.find((c) => c.slug === categoria);
  const name = cat?.name ?? "Tienda";
  const icon = cat?.icon ?? "🐾";
  const description = cat?.description ?? "Productos para mascotas";

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
        <div style={{ fontSize: 80, marginBottom: 28 }}>{icon}</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.80)",
            textAlign: "center",
            maxWidth: 750,
            marginBottom: 32,
          }}
        >
          {description}
        </div>
        <div
          style={{
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
