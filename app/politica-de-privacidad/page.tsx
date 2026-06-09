import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad — CuidaTuMascota.es",
  description: "Política de privacidad y protección de datos de CuidaTuMascota.es.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-cyan-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Política de privacidad</span>
      </nav>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Política de privacidad</h1>
      <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <p>En cumplimiento del RGPD (UE) 2016/679 y la LOPDGDD 3/2018, Mkt Web 360 SLU informa sobre el tratamiento de datos personales en www.cuidatumascota.es.</p>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">1. Responsable del tratamiento</h2>
          <ul className="space-y-1">
            <li><strong>Identidad:</strong> Mkt Web 360 SLU · <strong>CIF:</strong> B87679304</li>
            <li><strong>Email:</strong> info@mktweb360.com</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">2. Datos que recopilamos</h2>
          <ul className="space-y-1">
            <li><strong>Formulario de contacto:</strong> nombre y email</li>
            <li><strong>Cookies publicitarias:</strong> con consentimiento (ver política de cookies)</li>
            <li><strong>Google AdSense (ca-pub-6063067965030118):</strong> solo con consentimiento</li>
            <li><strong>Amazon Associates:</strong> Amazon gestiona sus propios datos según su política</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">3. Finalidad y base legal</h2>
          <ul className="space-y-1">
            <li><strong>Atender consultas:</strong> consentimiento del interesado</li>
            <li><strong>Publicidad AdSense:</strong> consentimiento explícito</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">4. Derechos del usuario</h2>
          <p>Puedes ejercer derechos de acceso, rectificación, supresión y portabilidad escribiendo a info@mktweb360.com. Puedes reclamar ante la AEPD (www.aepd.es).</p>
        </section>
        <p className="text-xs text-gray-400">Última actualización: junio 2025</p>
      </div>
    </div>
  );
}
