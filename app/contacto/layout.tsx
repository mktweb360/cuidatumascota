import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Tienes alguna pregunta o sugerencia sobre el cuidado de tu perro o gato? Contacta con el equipo de CuidaTuMascota.es.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
