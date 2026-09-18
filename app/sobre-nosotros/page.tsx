import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros — CuidaTuMascota.es",
  description: "Somos el equipo editorial de CuidaTuMascota.es. Conoce cómo investigamos y seleccionamos los productos que recomendamos para perros y gatos, y por qué nunca sustituimos el consejo veterinario.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Equipo Editorial de CuidaTuMascota.es",
  description: "Equipo editorial de CuidaTuMascota.es (Mkt Web 360 SLU). Comparamos ingredientes, composición nutricional, certificaciones y opiniones verificadas de propietarios antes de recomendar cualquier producto, con apoyo de IA en investigación y redacción bajo revisión editorial. No somos veterinarios: nuestro contenido es informativo y nunca sustituye la consulta veterinaria profesional.",
  url: "https://www.cuidatumascota.es/sobre-nosotros",
  parentOrganization: {
    "@type": "Organization",
    name: "CuidaTuMascota.es",
    url: "https://www.cuidatumascota.es",
  },
  knowsAbout: [
    "nutrición animal",
    "alimentación para perros y gatos",
    "salud veterinaria preventiva",
    "comportamiento canino",
    "comportamiento felino",
    "antiparasitarios y desparasitación",
    "higiene y cuidado de mascotas",
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CuidaTuMascota.es",
  legalName: "Mkt Web 360 SLU",
  url: "https://www.cuidatumascota.es",
  logo: { "@type": "ImageObject", url: "https://www.cuidatumascota.es/logo.png" },
  description: "Portal especializado en alimentación, salud y accesorios para perros y gatos. Comparamos productos con información contrastada para que elijas con confianza.",
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "España" },
  contactPoint: { "@type": "ContactPoint", email: "info@mktweb360.com", contactType: "customer service" },
};

export default function SobreNosotrosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <nav className="text-gray-400 text-sm mb-6">
          <Link href="/" className="hover:text-cyan-700">Inicio</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Sobre nosotros</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Sobre CuidaTuMascota.es</h1>
        <p className="text-gray-500 text-lg mb-10">Analizamos y comparamos productos para mascotas con criterio veterinario, para que elijas siempre lo mejor para tu perro o gato.</p>

        {/* Author profile */}
        <div className="flex items-start gap-5 bg-cyan-50 border border-cyan-100 rounded-2xl p-6 mb-10">
          <div className="shrink-0 w-16 h-16 rounded-full bg-cyan-200 flex items-center justify-center text-2xl font-extrabold text-cyan-800">
            CM
          </div>
          <div>
            <p className="font-extrabold text-gray-900 text-lg leading-tight">Equipo Editorial de CuidaTuMascota.es</p>
            <p className="text-cyan-700 font-semibold text-sm mb-2">Mkt Web 360 SLU</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              No somos veterinarios. Nuestro equipo compara ingredientes, composición nutricional, certificaciones de seguridad y opiniones verificadas de propietarios antes de recomendar cualquier producto, con apoyo de herramientas de IA en la investigación y redacción, siempre con revisión editorial. El contenido de este portal es informativo y nunca sustituye la consulta con tu veterinario.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {["Nutrición animal", "Comportamiento canino", "Salud preventiva", "Antiparasitarios"].map((tag) => (
                <span key={tag} className="text-xs bg-cyan-100 text-cyan-800 font-semibold px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8 text-gray-700">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Qué es CuidaTuMascota.es</h2>
            <p>
              CuidaTuMascota.es es un portal especializado en bienestar animal desarrollado por <strong>Mkt Web 360 SLU</strong> (CIF B87679304).
              Nuestro objetivo es ayudar a los propietarios de perros y gatos a tomar decisiones informadas sobre alimentación, salud y accesorios,
              con análisis basados en criterio veterinario y experiencia práctica de campo.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Cómo evaluamos los productos</h2>
            <p className="mb-3">Cada producto analizado en este portal pasa por un proceso de evaluación estructurado:</p>
            <ul className="space-y-2">
              {[
                "Análisis de ingredientes y composición nutricional (especialmente en alimentación)",
                "Verificación de seguridad y certificaciones (CE, normativa europea de bienestar animal)",
                "Estudio de valoraciones verificadas de propietarios en múltiples plataformas",
                "Comparativa de relación calidad-precio en el mercado español",
                "Revisión de contraindicaciones y compatibilidad con distintos perfiles de mascota",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-cyan-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Aviso de salud</h2>
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5">
              <p className="font-semibold text-cyan-900 mb-2">🩺 Importante</p>
              <p className="text-cyan-800 text-sm leading-relaxed">
                Todo el contenido de CuidaTuMascota.es es de carácter informativo y orientativo. No sustituye al consejo veterinario profesional individualizado.
                Consulta siempre con tu veterinario antes de cambiar la alimentación, el tratamiento antiparasitario o cualquier protocolo de salud de tu mascota.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Transparencia en afiliados</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="font-semibold text-amber-900 mb-3">Programas de afiliados que utilizamos:</p>
              <ul className="space-y-2 text-sm text-amber-800">
                <li><strong>Programa de afiliación:</strong> Somos afiliados de distintos programas de partners comerciales. Recibimos una comisión sin coste adicional para ti cuando realizas una compra a través de nuestros enlaces. Más detalle en nuestra política de privacidad.</li>
                <li><strong>Google AdSense (pub-6063067965030118):</strong> Publicidad contextual de Google, únicamente con tu consentimiento de cookies.</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Las comisiones nos permiten mantener y mejorar el portal. <strong>Nunca aceptamos pagos por reseñas positivas ni por posicionamiento preferente de productos.</strong> Nuestras opiniones son siempre honestas, independientes y basadas en criterio técnico.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-1">Datos de la empresa</p>
            <p>Mkt Web 360 SLU · CIF: B87679304 · <a href="mailto:info@mktweb360.com" className="text-cyan-700 hover:underline">info@mktweb360.com</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
