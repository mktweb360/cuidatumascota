import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params;
  const cat = categories.find((c) => c.slug === categoria);
  if (!cat) return {};
  return {
    title: `${cat.name} — Análisis y comparativas | CuidaTuMascota.es`,
    description: `Los mejores productos de ${cat.name} para tu mascota. Análisis honestos, pros y contras, y precios actualizados en Amazon.`,
    alternates: { canonical: `https://www.cuidatumascota.es/tienda/${categoria}` },
    openGraph: {
      title: `${cat.name} — Análisis y comparativas`,
      description: `Encuentra el mejor ${cat.name} para tu mascota con análisis honestos.`,
      url: `https://www.cuidatumascota.es/tienda/${categoria}`,
    },
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const cat = categories.find((c) => c.slug === categoria);
  if (!cat) notFound();

  const productList = getProductsByCategory(categoria);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.name} — CuidaTuMascota.es`,
    description: `Los mejores productos de ${cat.name} para tu mascota.`,
    url: `https://www.cuidatumascota.es/tienda/${cat.slug}`,
    publisher: { "@type": "Organization", name: "CuidaTuMascota.es", url: "https://www.cuidatumascota.es" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cuidatumascota.es" },
      { "@type": "ListItem", position: 2, name: "Tienda", item: "https://www.cuidatumascota.es/tienda" },
      { "@type": "ListItem", position: 3, name: cat.name, item: `https://www.cuidatumascota.es/tienda/${cat.slug}` },
    ],
  };

  const categoriesWithCount = categories.map((c) => ({
    ...c,
    count: getProductsByCategory(c.slug).length,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-cyan-700">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/tienda" className="hover:text-cyan-700">Tienda</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{cat.name}</span>
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
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-cyan-700 transition-colors text-sm mb-1"
                >
                  <span>🏪 Todos los productos</span>
                </Link>
                {categoriesWithCount.map((c) => {
                  const isActive = c.slug === categoria;
                  return (
                    <Link
                      key={c.slug}
                      href={`/tienda/${c.slug}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm ${
                        isActive
                          ? "bg-cyan-50 text-cyan-700 font-bold"
                          : "hover:bg-gray-50 text-gray-700 hover:text-cyan-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.icon}</span>
                        <span className="leading-tight">{c.name}</span>
                      </span>
                      <span className={`text-xs shrink-0 ml-2 ${isActive ? "text-cyan-500 font-bold" : "text-gray-400"}`}>
                        {c.count}
                      </span>
                    </Link>
                  );
                })}
              </nav>
              <div className="px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Análisis independientes · Precios en Amazon
                </p>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{cat.name}</h1>
                <p className="text-gray-500 text-sm mt-0.5">{cat.description}</p>
              </div>
            </div>

            {/* Mobile category pills */}
            <div className="flex gap-2 flex-wrap mb-5 md:hidden">
              {categoriesWithCount.map((c) => (
                <Link
                  key={c.slug}
                  href={`/tienda/${c.slug}`}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    c.slug === categoria
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-100 hover:bg-cyan-100 text-gray-700 hover:text-cyan-800"
                  }`}
                >
                  {c.icon} {c.name}
                </Link>
              ))}
            </div>

            {/* Product count bar */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{productList.length}</span>{" "}
                {productList.length === 1 ? "producto analizado" : "productos analizados"}
              </p>
            </div>

            {productList.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">No hay productos en esta categoría todavía.</p>
                <Link href="/tienda" className="text-cyan-700 font-semibold mt-4 inline-block">
                  Ver todas las categorías →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {productList.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-8 pl-3 border-l-2 border-gray-200">
              Enlace de afiliado Amazon Associates (cclaserdepi01-21). Recibimos una comisión sin coste adicional para ti.
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
