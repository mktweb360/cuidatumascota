import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Contacto | CuidaTuMascota.es";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Contacto", kicker: "Contacto" });
}
