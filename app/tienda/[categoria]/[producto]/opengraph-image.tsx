import { ImageResponse } from "next/og";
import { products, getProductBySlug } from "@/data/products";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ categoria: p.categorySlug, producto: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ categoria: string; producto: string }> }) {
  const { producto } = await params;
  const product = getProductBySlug(producto);
  const name = product?.name ?? "Producto";
  const description = product?.shortDescription ?? "";
  const badge = product?.badge;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "70px 80px",
        }}
      >
        {badge && (
          <div
            style={{
              background: "rgba(255,255,255,0.20)",
              borderRadius: 999,
              padding: "8px 22px",
              fontSize: 18,
              color: "white",
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            {badge}
          </div>
        )}
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {name}
        </div>
        {description && (
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 850,
              lineHeight: 1.4,
              marginBottom: 40,
            }}
          >
            {description.length > 140 ? description.slice(0, 137) + "…" : description}
          </div>
        )}
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
