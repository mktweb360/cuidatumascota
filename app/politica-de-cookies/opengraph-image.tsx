import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Política de cookies | CuidaTuMascota.es";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Política de cookies", kicker: "Información legal" });
}
