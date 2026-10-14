import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* CWV: next/font self-hosts Geist, subsets to latin, applies display:swap and
   emits a preload <link> automatically — eliminates any FOUT and removes the
   render-blocking Google Fonts network round-trip.                            */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CuidaTuMascota.es — Salud, cuidado y accesorios para perros y gatos",
    template: "%s | CuidaTuMascota.es",
  },
  description: "Guías y análisis de productos para mascotas. Alimentación, salud, accesorios y todo lo que necesita tu perro o gato.",
  metadataBase: new URL("https://www.cuidatumascota.es"),
  openGraph: { type: "website", locale: "es_ES", siteName: "CuidaTuMascota.es" },
  twitter: { card: "summary_large_image" },
  verification: {
    google: "8pvgQ5R0iQ6WHklqEaMBBuazOzpBIskFvk2livTaa-w",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CuidaTuMascota.es",
  url: "https://www.cuidatumascota.es",
  description: "Guías y análisis de productos para mascotas — perros y gatos",
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.cuidatumascota.es/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CuidaTuMascota.es",
  legalName: "Mkt Web 360 SLU",
  url: "https://www.cuidatumascota.es",
  logo: { "@type": "ImageObject", url: "https://www.cuidatumascota.es/logo.png" },
  description: "Portal especializado en alimentación, salud y accesorios para perros y gatos. Analizamos y comparamos los mejores productos del mercado para el bienestar de tu mascota.",
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "España" },
  knowsAbout: ["alimentación para mascotas", "salud veterinaria", "accesorios para perros", "accesorios para gatos", "cuidado de animales domésticos"],
  contactPoint: { "@type": "ContactPoint", email: "info@mktweb360.com", contactType: "customer service", availableLanguage: "Spanish" },
  sameAs: [
    "https://www.instagram.com/ctmascota",
    "https://www.facebook.com/cuidatumascota.es",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {/* CWV: preconexión a los dominios de AdSense */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />

        {/* AdSense: el script se carga siempre; el consentimiento (RGPD / TCF v2.2) lo gestiona el
            mensaje certificado de Google configurado en AdSense > Privacidad y mensajes. */}
        <Script
          id="adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6063067965030118"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* AdSense: verificación de la propiedad del sitio */}
        <meta name="google-adsense-account" content="ca-pub-6063067965030118" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
