import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, products, getProductBySlug, getProductsByCategory, amazonLink } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import VetDisclaimer from "@/components/VetDisclaimer";

export async function generateStaticParams() {
  return products.map((p) => ({ categoria: p.categorySlug, producto: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string; producto: string }> }): Promise<Metadata> {
  const { producto } = await params;
  const product = getProductBySlug(producto);
  if (!product) return {};
  return {
    title: `${product.name} — Análisis y opinión`,
    description: product.shortDescription,
  };
}

export default async function ProductoPage({ params }: { params: Promise<{ categoria: string; producto: string }> }) {
  const { categoria, producto } = await params;
  const product = getProductBySlug(producto);
  const cat = categories.find((c) => c.slug === categoria);
  if (!product || !cat) notFound();

  const stars = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));
  const related = getProductsByCategory(categoria).filter((p) => p.slug !== producto).slice(0, 2);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    offers: {
      "@type": "Offer",
      url: amazonLink(product.asin),
      priceCurrency: "EUR",
      price: product.price.replace("€", "").replace(",", "."),
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.cuidatumascota.es" },
      { "@type": "ListItem", position: 2, name: "Tienda", item: "https://www.cuidatumascota.es/tienda" },
      { "@type": "ListItem", position: 3, name: cat.name, item: `https://www.cuidatumascota.es/tienda/${cat.slug}` },
      { "@type": "ListItem", position: 4, name: product.name, item: `https://www.cuidatumascota.es/tienda/${cat.slug}/${product.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `¿Es seguro ${product.name} para mi mascota?`, acceptedAnswer: { "@type": "Answer", text: `${product.name} cumple con la normativa CE. Consulta siempre con tu veterinario antes de cambiar la alimentación o tratamiento de tu mascota.` } },
      { "@type": "Question", name: `¿Cuánto cuesta ${product.name}?`, acceptedAnswer: { "@type": "Answer", text: `El precio orientativo de ${product.name} es ${product.price} en Amazon.es. Los precios pueden variar según disponibilidad y ofertas.` } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <nav className="text-gray-400 text-sm mb-6 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-cyan-700">Inicio</Link>
          <span className="mx-1">›</span>
          <Link href="/tienda" className="hover:text-cyan-700">Tienda</Link>
          <span className="mx-1">›</span>
          <Link href={`/tienda/${cat.slug}`} className="hover:text-cyan-700">{cat.name}</Link>
          <span className="mx-1">›</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        {product.isHealth && <VetDisclaimer />}

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-cyan-50 rounded-2xl flex items-center justify-center p-12">
            <span className="text-8xl">{cat.icon}</span>
          </div>

          <div>
            {product.badge && (
              <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.shortDescription}</p>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-yellow-400">{stars}</span>
              <span className="font-bold text-gray-700">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString("es-ES")} reseñas)</span>
            </div>

            <div className="text-3xl font-extrabold text-cyan-700 mb-5">{product.price}</div>

            <a
              href={amazonLink(product.asin)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-4 px-6 rounded-xl text-lg transition-colors mb-2"
            >
              Comprar en Amazon →
            </a>
            <p className="text-xs text-gray-400 text-center">Precio puede variar. Enlace de afiliado.</p>
          </div>
        </div>

        <AffiliateDisclosure />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <h2 className="font-extrabold text-green-800 mb-3">✓ Puntos positivos</h2>
            <ul className="space-y-2">
              {product.pros.map((pro, i) => (
                <li key={i} className="text-green-700 text-sm flex gap-2">
                  <span className="shrink-0">✓</span>{pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <h2 className="font-extrabold text-red-800 mb-3">✗ A tener en cuenta</h2>
            <ul className="space-y-2">
              {product.cons.map((con, i) => (
                <li key={i} className="text-red-700 text-sm flex gap-2">
                  <span className="shrink-0">✗</span>{con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-extrabold text-gray-900 mb-4">Especificaciones</h2>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-3">
                <dt className="text-xs text-gray-400 font-semibold uppercase">{key}</dt>
                <dd className="font-bold text-gray-800 text-sm mt-1">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-extrabold text-gray-900 mb-5">Preguntas frecuentes</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">¿Es seguro {product.name} para mi mascota?</h3>
              <p className="text-gray-600 text-sm mt-1">{product.name} cumple con la normativa CE. Consulta siempre con tu veterinario antes de cambiar la alimentación o tratamiento.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">¿Cuánto cuesta {product.name}?</h3>
              <p className="text-gray-600 text-sm mt-1">El precio orientativo es {product.price} en Amazon.es. Los precios pueden variar según disponibilidad y ofertas activas.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">¿Dónde puedo comprar {product.name}?</h3>
              <p className="text-gray-600 text-sm mt-1">Puedes comprarlo directamente en Amazon.es a través de nuestro enlace. Amazon ofrece envío rápido y política de devoluciones sencilla.</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">También te puede interesar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
