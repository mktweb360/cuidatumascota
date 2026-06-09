import Link from "next/link";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐾</span>
              <span className="font-extrabold text-white text-lg">CuidaTuMascota.es</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Guías y reseñas de productos para mascotas. Ayudamos a los dueños de perros y gatos a elegir los mejores productos para sus compañeros.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Categorías</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/tienda/${c.slug}`} className="hover:text-cyan-400 transition-colors">
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Blog</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/mejor-pienso-perro-2025" className="hover:text-cyan-400 transition-colors">Mejor pienso para perros</Link></li>
              <li><Link href="/blog/pienso-gato-adulto-comparativa" className="hover:text-cyan-400 transition-colors">Mejor pienso para gatos</Link></li>
              <li><Link href="/blog/antiparasitarios-perros-guia" className="hover:text-cyan-400 transition-colors">Guía antiparasitarios</Link></li>
              <li><Link href="/blog/transportin-viaje-mascotas" className="hover:text-cyan-400 transition-colors">Elegir transportín</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors font-semibold">→ Ver todos los artículos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sobre-nosotros" className="hover:text-cyan-400 transition-colors">Sobre nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-cyan-400 transition-colors">Contacto</Link></li>
              <li><Link href="/aviso-legal" className="hover:text-cyan-400 transition-colors">Aviso legal</Link></li>
              <li><Link href="/politica-de-privacidad" className="hover:text-cyan-400 transition-colors">Privacidad</Link></li>
              <li><Link href="/politica-de-cookies" className="hover:text-cyan-400 transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 space-y-2 text-xs text-gray-500">
          <p>
            <strong className="text-gray-400">Aviso de afiliados:</strong> CuidaTuMascota.es participa en el Programa de Afiliados de Amazon EU (cclaserdepi01-21). Los precios son orientativos y pueden variar.
          </p>
          <p>© {new Date().getFullYear()} Mkt Web 360 SLU — CIF B87679304 — info@mktweb360.com</p>
        </div>
      </div>
    </footer>
  );
}
