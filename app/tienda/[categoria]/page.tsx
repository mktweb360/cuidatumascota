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
    alternates: {
      canonical: `https://www.cuidatumascota.es/tienda/${categoria}`,
    },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-cyan-700">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/tienda" className="hover:text-cyan-700">Tienda</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{cat.name}</span>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-cyan-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">{cat.icon}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{cat.name}</h1>
          <p className="text-cyan-100 text-lg">{cat.description}</p>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-500 mb-8 text-sm">
            {productList.length} {productList.length === 1 ? "producto" : "productos"} en esta categoría
          </p>
          {productList.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No hay productos en esta categoría todavía.</p>
              <Link href="/tienda" className="text-cyan-700 font-semibold mt-4 inline-block">
                Ver todas las categorías →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
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
