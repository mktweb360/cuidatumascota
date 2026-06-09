import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros — CuidaTuMascota.es",
  description: "Quiénes somos y cómo seleccionamos los productos que recomendamos para mascotas.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-cyan-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Sobre nosotros</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Sobre CuidaTuMascota.es</h1>

      <div className="space-y-6 text-gray-700">
        <p className="text-lg">
          CuidaTuMascota.es es un proyecto de <strong>Mkt Web 360 SLU</strong> (CIF B87679304) dedicado a ayudar a los dueños de perros y gatos a elegir los mejores productos para el bienestar de sus mascotas.
        </p>

        <h2 className="text-xl font-extrabold text-gray-900">Aviso de salud</h2>
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5">
          <p className="font-semibold text-cyan-900 mb-2">🩺 Importante</p>
          <p className="text-cyan-800 text-sm">
            Todo el contenido de CuidaTuMascota.es es de carácter informativo y no sustituye al consejo veterinario profesional. Consulta siempre con tu veterinario antes de cambiar la alimentación o tratamiento de tu mascota.
          </p>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900">Cómo evaluamos los productos</h2>
        <ul className="space-y-2">
          {["Calidad e ingredientes (especialmente en alimentación)", "Seguridad y certificaciones (CE, normativa EU)", "Relación calidad-precio real", "Valoraciones verificadas de otros dueños", "Criterios de bienestar animal"].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-cyan-500 font-bold shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-extrabold text-gray-900">Transparencia en afiliados</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="font-semibold text-amber-900 mb-2">Programas de afiliados que usamos:</p>
          <ul className="space-y-2 text-sm text-amber-800">
            <li><strong>Amazon Associates (cclaserdepi01-21):</strong> Somos afiliados de Amazon España. Recibimos comisión sin coste adicional para ti cuando compras por nuestros enlaces.</li>
            <li><strong>Google AdSense (pub-6063067965030118):</strong> Publicidad de Google, solo con tu consentimiento de cookies.</li>
          </ul>
        </div>

        <p>Las comisiones nos permiten mantener el sitio. <strong>Nunca aceptamos pagos por reseñas positivas</strong> y nuestras opiniones son siempre honestas e independientes.</p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
          <p><strong>Datos de la empresa:</strong> Mkt Web 360 SLU · CIF: B87679304 · info@mktweb360.com</p>
        </div>
      </div>
    </div>
  );
}
