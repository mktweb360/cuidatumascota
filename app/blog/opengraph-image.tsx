import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Blog — Guías de salud y cuidado para mascotas | CuidaTuMascota.es";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Blog — Guías de salud y cuidado para mascotas", kicker: "Blog" });
}
