import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Sobre nosotros | CuidaTuMascota.es";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Sobre nosotros", kicker: "Sobre nosotros" });
}
