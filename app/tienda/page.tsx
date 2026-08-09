import type { Metadata } from "next";
import Link from "next/link";
import { categories, getFeaturedProducts, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Tienda — Los mejores productos para perros y gatos | CuidaTuMascota.es",
  description:
    "Encuentra los mejores productos para tu mascota. Alimentación, accesorios, salud y más. Comparativas honestas y precios actualizados en Amazon.",
  alternates: { canonical: "https://www.cuidatumascota.es/tienda" },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tienda — Los mejores productos para mascotas",
  description: "Comparativas y análisis de los mejores productos para perros y gatos.",
  url: "https://www.cuidatumascota.es/tienda",
  publisher: { "@type": "Organization", name: "CuidaTuMascota.es", url: "https://www.cuidatumascota.es" },
};

export default function TiendaPage() {
  const featured = getFeaturedProducts(9);
  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: getProductsByCategory(cat.slug).length,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-cyan-700">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Tienda</span>
        </nav>

        <div className="flex gap-8 items-start">
          {/* ── Sidebar ── */}
          <aside className="hidden md:block w-56 lg:w-64 shrink-0">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden sticky top-4">
              <div className="bg-cyan-600 px-4 py-3">
                <p className="text-white font-extrabold text-sm uppercase tracking-wide">Categorías</p>
              </div>
              <nav className="p-2">
                <Link
                  href="/tienda"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-cyan-50 text-cyan-700 font-bold text-sm mb-1"
                >
                  <span>🏪 Todos los productos</span>
                </Link>
                {categoriesWithCount.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/tienda/${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-cyan-700 transition-colors text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span className="leading-tight">{cat.name}</span>
                    </span>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{cat.count}</span>
                  </Link>
                ))}
              </nav>
              <div className="px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Analizamos y comparamos los productos con criterio veterinario para que elijas con confianza.
                </p>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-gray-900">Tienda de productos para mascotas</h1>
              <p className="text-gray-500 text-sm mt-1">Análisis honestos · {featured.length} productos destacados</p>
            </div>

            {/* Mobile category pills */}
            <div className="flex gap-2 flex-wrap mb-6 md:hidden">
              {categoriesWithCount.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/tienda/${cat.slug}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 hover:bg-cyan-100 text-gray-700 hover:text-cyan-800 transition-colors"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {featured.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-8 pl-3 border-l-2 border-gray-200">
              Enlace de afiliado Amazon Associates (cclaserdepi01-21). Recibimos una comisión sin coste adicional para ti.
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
