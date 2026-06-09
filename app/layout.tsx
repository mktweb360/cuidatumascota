import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "CuidaTuMascota.es — Salud, cuidado y accesorios para perros y gatos",
    template: "%s | CuidaTuMascota.es",
  },
  description: "Las mejores guías y reseñas de productos para mascotas. Alimentación, salud, accesorios y todo lo que necesita tu perro o gato.",
  metadataBase: new URL("https://www.cuidatumascota.es"),
  openGraph: { type: "website", locale: "es_ES", siteName: "CuidaTuMascota.es" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CuidaTuMascota.es",
  url: "https://www.cuidatumascota.es",
  description: "Guías y reseñas de productos para mascotas — perros y gatos",
  potentialAction: { "@type": "SearchAction", target: "https://www.cuidatumascota.es/tienda", query: "productos mascotas" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CuidaTuMascota.es — Mkt Web 360 SLU",
  url: "https://www.cuidatumascota.es",
  contactPoint: { "@type": "ContactPoint", email: "info@mktweb360.com", contactType: "customer service" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
