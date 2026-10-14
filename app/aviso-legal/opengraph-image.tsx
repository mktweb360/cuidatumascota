import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Aviso legal | CuidaTuMascota.es";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Aviso legal", kicker: "Información legal" });
}
