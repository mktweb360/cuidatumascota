import type { Metadata } from "next";
import Link from "next/link";
import { categories, getFeaturedProducts, getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Tienda — Los mejores productos para perros y gatos | CuidaTuMascota.es",
  description:
    "Encuentra los mejores productos para tu mascota. Alimentación, accesorios, salud y más. Comparativas honestas y precios actualizados en Amazon.",
  alternates: { canonical: "https://www.cuidatumascota.es/tienda" },
  openGraph: {
    title: "Tienda — Los mejores productos para perros y gatos",
    description: "Comparativas y análisis de los mejores productos para mascotas.",
    url: "https://www.cuidatumascota.es/tienda",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tienda — Los mejores productos para perros y gatos",
  description: "Encuentra los mejores productos para tu mascota con comparativas honestas.",
  url: "https://www.cuidatumascota.es/tienda",
  publisher: { "@type": "Organization", name: "CuidaTuMascota.es", url: "https://www.cuidatumascota.es" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cuidatumascota.es" },
    { "@type": "ListItem", position: 2, name: "Tienda", item: "https://www.cuidatumascota.es/tienda" },
  ],
};

export default function TiendaPage() {
  const featured = getFeaturedProducts(6);

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: getProductsByCategory(cat.slug).length,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-cyan-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Tienda</span>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-cyan-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Tienda — Los mejores productos para tu mascota
          </h1>
          <p className="text-cyan-100 text-lg mb-6">
            Comparativas honestas y precios actualizados. Compra en Amazon con total confianza.
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Categorías</h2>
          <p className="text-gray-500 mb-8">Elige tu categoría y encuentra el producto perfecto</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoriesWithCount.map((cat) => (
              <Link
                key={cat.slug}
                href={`/tienda/${cat.slug}`}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-cyan-200 transition-all group"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-cyan-700 transition-colors text-sm leading-snug">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-1 rounded-full">
                    Ver categoría →
                  </span>
                  <span className="text-xs text-gray-400">{cat.count} productos</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Productos destacados</h2>
          <p className="text-gray-500 mb-8">Los mejor valorados por nuestros lectores</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <div
                key={product.slug}
                className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {product.categoryName}
                  </span>
                  {product.badge && (
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 leading-snug">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 flex-grow">{product.shortDescription}</p>
                <div className="mt-3 flex items-center justify-end">
                  <Link
                    href={`/tienda/${product.categorySlug}/${product.slug}`}
                    className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
                  >
                    Ver producto →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate disclaimer */}
      <section className="py-6 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center text-xs text-gray-400">
          Como Asociado de Amazon obtenemos una pequeña comisión en cada compra realizada a través de nuestros enlaces, sin coste adicional para ti. Los precios y disponibilidad se muestran directamente en Amazon.
        </div>
      </section>
    </>
  );
}
