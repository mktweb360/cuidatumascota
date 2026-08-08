import type { Metadata } from "next";
import Script from "next/script";
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
  verification: {
    google: "8pvgQ5R0iQ6WHklqEaMBBuazOzpBIskFvk2livTaa-w",
  },
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
        {/* Google Consent Mode v2 — todo denegado por defecto hasta que el
            usuario decida en el banner de cookies */}
        <Script
          id="consent-mode-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />
        {/* AdSense — cargado condicionalmente por CookieBanner tras consentimiento */}
        <meta name="google-adsense-account" content="ca-pub-6063067965030118" />
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
