import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies — CuidaTuMascota.es",
  description: "Qué cookies utilizamos en CuidaTuMascota.es y cómo gestionarlas.",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-cyan-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Política de cookies</span>
      </nav>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Política de cookies</h1>
      <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <p>En cumplimiento de la Ley 34/2002 (LSSICE) y el RGPD, informamos sobre las cookies utilizadas en www.cuidatumascota.es.</p>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Cookies utilizadas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-cyan-50">
                  <th className="text-left px-3 py-2 border border-cyan-100">Cookie</th>
                  <th className="text-left px-3 py-2 border border-cyan-100">Tipo</th>
                  <th className="text-left px-3 py-2 border border-cyan-100">Finalidad</th>
                  <th className="text-left px-3 py-2 border border-cyan-100">Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border border-gray-100">cuidatumascota_consent</td>
                  <td className="px-3 py-2 border border-gray-100">Técnica propia</td>
                  <td className="px-3 py-2 border border-gray-100">Guardar preferencia de consentimiento</td>
                  <td className="px-3 py-2 border border-gray-100">Permanente (localStorage)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-3 py-2 border border-gray-100">Google AdSense</td>
                  <td className="px-3 py-2 border border-gray-100">Publicidad terceros</td>
                  <td className="px-3 py-2 border border-gray-100">Publicidad personalizada (solo con consentimiento)</td>
                  <td className="px-3 py-2 border border-gray-100">Variable (Google)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border border-gray-100">Amazon</td>
                  <td className="px-3 py-2 border border-gray-100">Afiliados terceros</td>
                  <td className="px-3 py-2 border border-gray-100">Rastreo conversiones de afiliado</td>
                  <td className="px-3 py-2 border border-gray-100">24 horas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Gestión de cookies</h2>
          <ul className="space-y-1">
            <li>Acepta o rechaza desde el banner al entrar al sitio</li>
            <li>Elimina cookies desde la configuración de tu navegador</li>
            <li>Gestiona publicidad de Google en <a href="https://www.google.com/settings/ads" className="text-cyan-700 hover:underline" target="_blank" rel="noopener noreferrer">google.com/settings/ads</a></li>
          </ul>
        </section>
        <p>Más información en nuestra <Link href="/politica-de-privacidad" className="text-cyan-700 hover:underline">política de privacidad</Link> o escríbenos a info@mktweb360.com.</p>
        <p className="text-xs text-gray-400">Última actualización: junio 2025</p>
      </div>
    </div>
  );
}
