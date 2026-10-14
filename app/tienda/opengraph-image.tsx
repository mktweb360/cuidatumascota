import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Tienda — Los mejores productos para perros y gatos | CuidaTuMascota.es";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Tienda — Los mejores productos para perros y gatos", kicker: "Tienda" });
}
