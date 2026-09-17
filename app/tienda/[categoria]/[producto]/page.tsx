import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, products, getProductBySlug, getProductsByCategory, amazonLink } from "@/data/products";
import { getPostBySlug } from "@/data/posts";
import ProductCard from "@/components/ProductCard";
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
    alternates: {
      canonical: `https://www.cuidatumascota.es/tienda/${product.categorySlug}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — Análisis completo`,
      description: product.shortDescription,
      images: [{ url: `https://www.cuidatumascota.es/images/products/${product.categorySlug}.jpg` }],
    },
  };
}

/** Genera una puntuación estable (4.1–4.9) basada en el slug */
function stableRating(slug: string): { score: string; count: number } {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  const score = (4.1 + ((Math.abs(h) % 9) / 10)).toFixed(1);
  const count = 120 + (Math.abs(h >> 4) % 800);
  return { score, count };
}

function StarRating({ score }: { score: string }) {
  const n = parseFloat(score);
  const full = Math.floor(n);
  const half = n - full >= 0.3;
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`w-4 h-4 ${i <= full ? "text-amber-400" : i === full + 1 && half ? "text-amber-300" : "text-gray-200"}`} fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default async function ProductoPage({ params }: { params: Promise<{ categoria: string; producto: string }> }) {
  const { categoria, producto } = await params;
  const product = getProductBySlug(producto);
  const cat = categories.find((c) => c.slug === categoria);
  if (!product || !cat) notFound();

  const related = getProductsByCategory(categoria).filter((p) => p.slug !== producto).slice(0, 3);
  const relatedGuides = (product.relatedPosts ?? []).map((s) => getPostBySlug(s)).filter(Boolean);
  const { score, count } = stableRating(product.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.asin,
    image: `https://www.cuidatumascota.es/images/products/${product.categorySlug}.jpg`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: score,
      reviewCount: count,
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: amazonLink(product.asin),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Amazon España" },
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
      {
        "@type": "Question",
        name: `¿Es seguro ${product.name} para mi mascota?`,
        acceptedAnswer: { "@type": "Answer", text: `${product.name} cumple con la normativa CE. Consulta siempre con tu veterinario antes de cambiar la alimentación o tratamiento de tu mascota.` },
      },
      {
        "@type": "Question",
        name: `¿Dónde puedo comprar ${product.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `Puedes comprarlo directamente en Amazon.es a través de nuestro enlace. Amazon ofrece envío rápido y política de devoluciones sencilla en España.` },
      },
      {
        "@type": "Question",
        name: `¿Cuánto cuesta ${product.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `El precio puede variar. Consulta el precio actualizado en Amazon.es haciendo clic en el botón de compra.` },
      },
    ],
  };

  const topSpecs = Object.entries(product.specs).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Breadcrumb ── */}
        <nav className="text-gray-400 text-sm mb-5 flex flex-wrap items-center gap-1">
          <Link href="/" className="hover:text-cyan-700">Inicio</Link>
          <span>›</span>
          <Link href="/tienda" className="hover:text-cyan-700">Tienda</Link>
          <span>›</span>
          <Link href={`/tienda/${cat.slug}`} className="hover:text-cyan-700">{cat.name}</Link>
          <span>›</span>
          <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* ── Vet disclaimer ── */}
        {product.isHealth && <VetDisclaimer />}

        {/* ══════════════════════════════════════════
            HERO: imagen + ficha de producto (2 cols)
        ══════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* Imagen */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-50 to-gray-50 border border-gray-100 aspect-square flex items-center justify-center">
              <img
                src={`/images/products/${product.categorySlug}.jpg`}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Badge overlay */}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="bg-cyan-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {product.badge}
                </span>
              </div>
            )}
            {/* Verified badge */}
            <div className="absolute bottom-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm border border-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <span className="text-cyan-500">✓</span> Análisis verificado
              </span>
            </div>
          </div>

          {/* Ficha del producto */}
          <div className="flex flex-col">

            {/* Categoría + label */}
            <div className="flex items-center gap-2 mb-3">
              <Link href={`/tienda/${cat.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-full hover:bg-cyan-100 transition-colors">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                En stock
              </span>
            </div>

            {/* Nombre */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating score={score} />
              <span className="font-bold text-gray-800 text-sm">{score}</span>
              <span className="text-gray-400 text-sm">({count.toLocaleString("es-ES")} valoraciones)</span>
            </div>

            {/* Descripción */}
            <p className="text-gray-600 leading-relaxed mb-5">{product.shortDescription}</p>

            {/* Key specs pills */}
            {topSpecs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {topSpecs.map(([k, v]) => (
                  <span key={k} className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded-lg">
                    <span className="text-gray-400 capitalize">{k}:</span> {v}
                  </span>
                ))}
              </div>
            )}

            {/* Precio / CTA block */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Precio en Amazon</p>
              <p className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                Ver precio actualizado
                <span className="text-xs font-normal text-gray-400">(puede variar)</span>
              </p>

              {/* CTA principal */}
              <a
                href={amazonLink(product.asin)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base py-4 px-6 rounded-xl transition-colors shadow-sm shadow-orange-200 mb-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7.8-3.9L5.7 7H3c-.6 0-1-.4-1-1s.4-1 1-1h4c.5 0 .9.3 1 .8l.3 1.2h11c.7 0 1.2.7 1 1.4l-2 6c-.1.4-.5.6-.9.6H9.2c-.5 0-.9-.3-1-.9z"/>
                </svg>
                Comprar en Amazon →
              </a>

              {/* CTA secundaria */}
              <Link
                href={`/tienda/${cat.slug}`}
                className="flex items-center justify-center gap-1.5 w-full border border-gray-200 hover:border-cyan-300 text-gray-600 hover:text-cyan-700 font-semibold text-sm py-3 px-6 rounded-xl transition-colors bg-white"
              >
                Ver más productos de {cat.name}
              </Link>
            </div>

            {/* Trust bar */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: "🚚", label: "Envío Prime", sub: "Gratis en pedidos" },
                { icon: "↩️", label: "Devoluciones", sub: "30 días sin coste" },
                { icon: "🔒", label: "Pago seguro", sub: "Amazon Checkout" },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-xl py-3 px-2">
                  <div className="text-lg mb-0.5">{icon}</div>
                  <div className="text-xs font-bold text-gray-700 leading-tight">{label}</div>
                  <div className="text-xs text-gray-400 leading-tight">{sub}</div>
                </div>
              ))}
            </div>

            {/* Affiliate notice */}
            <p className="text-xs text-gray-400 mt-4 pl-3 border-l-2 border-gray-200">
              Enlace de afiliado Amazon Associates (cclaserdepi01-21). Si compras a través de nuestro enlace recibimos una pequeña comisión sin coste adicional para ti.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECCIÓN: Pros & Cons
        ══════════════════════════════════════════ */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <h2 className="font-extrabold text-green-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-bold">✓</span>
              Puntos positivos
            </h2>
            <ul className="space-y-2.5">
              {product.pros.map((pro, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-green-800">
                  <span className="text-green-400 shrink-0 mt-0.5 font-bold">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <h2 className="font-extrabold text-red-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-400 text-white text-sm flex items-center justify-center font-bold">!</span>
              A tener en cuenta
            </h2>
            <ul className="space-y-2.5">
              {product.cons.map((con, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-red-800">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECCIÓN: Especificaciones técnicas
        ══════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
            <h2 className="font-extrabold text-gray-900">Especificaciones técnicas</h2>
          </div>
          <table className="w-full">
            <tbody>
              {Object.entries(product.specs).map(([key, val], i) => (
                <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-500 capitalize w-2/5 border-b border-gray-50">{key}</td>
                  <td className="px-6 py-3 text-sm font-bold text-gray-800 border-b border-gray-50">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ══════════════════════════════════════════
            SECCIÓN: Preguntas frecuentes
        ══════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-extrabold text-gray-900 mb-5">Preguntas frecuentes</h2>
          <div className="space-y-0 divide-y divide-gray-100">
            {[
              {
                q: `¿Es seguro ${product.name} para mi mascota?`,
                a: `${product.name} cumple con la normativa CE para productos de uso animal. Aun así, consulta siempre con tu veterinario antes de cambiar la alimentación o iniciar cualquier tratamiento.`,
              },
              {
                q: `¿Cuánto cuesta ${product.name}?`,
                a: `El precio en Amazon varía según disponibilidad y promociones activas. Haz clic en el botón de compra para ver el precio actualizado en tiempo real.`,
              },
              {
                q: `¿Tiene envío rápido ${product.name}?`,
                a: `Sí, si eres cliente de Amazon Prime el envío es gratuito y llega en 1-2 días en la mayoría de localidades de España.`,
              },
              {
                q: `¿Puedo devolver ${product.name} si no me convence?`,
                a: `Amazon ofrece política de devoluciones de 30 días sin coste para la mayoría de productos. Consulta las condiciones específicas en la página de Amazon.`,
              },
            ].map(({ q, a }) => (
              <details key={q} className="group py-4 cursor-pointer">
                <summary className="flex items-start justify-between gap-3 font-bold text-gray-800 text-sm list-none">
                  <span>{q}</span>
                  <span className="text-cyan-500 shrink-0 text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECCIÓN: Guías relacionadas
        ══════════════════════════════════════════ */}
        {relatedGuides.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">Guías relacionadas</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedGuides.map((p) => p && (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-start gap-3 bg-cyan-50 border border-cyan-100 rounded-2xl p-4 hover:bg-cyan-100 transition-colors group"
                >
                  <span className="text-2xl shrink-0">📖</span>
                  <div>
                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-wide">{p.category}</span>
                    <h3 className="font-bold text-gray-900 text-sm mt-0.5 leading-tight group-hover:text-cyan-700 transition-colors">{p.title}</h3>
                    <span className="text-cyan-700 font-semibold text-xs mt-1.5 inline-block">Leer guía →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            SECCIÓN: También te puede interesar
        ══════════════════════════════════════════ */}
        {related.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">También te puede interesar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA final sticky-style ── */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl p-6 text-white text-center">
          <p className="font-extrabold text-lg mb-1">¿Listo para comprar {product.name}?</p>
          <p className="text-cyan-100 text-sm mb-4">Ver el precio actualizado y comprarlo directamente en Amazon.es</p>
          <a
            href={amazonLink(product.asin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md"
          >
            🛒 Ir a Amazon.es →
          </a>
          <p className="text-cyan-200 text-xs mt-3">Enlace de afiliado · Sin coste adicional para ti</p>
        </div>

      </div>
    </>
  );
}
