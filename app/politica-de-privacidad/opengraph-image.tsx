import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Política de privacidad | CuidaTuMascota.es";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Política de privacidad", kicker: "Información legal" });
}
