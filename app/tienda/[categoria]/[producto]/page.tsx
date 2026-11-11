import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, products, getProductBySlug, getProductsByCategory, amazonLink } from "@/data/products";
import { getPostBySlug } from "@/data/posts";
import ProductCard from "@/components/ProductCard";
import VetDisclaimer from "@/components/VetDisclaimer";
import { productTitle, productTitleUnique, relatedInCategory, publicDescription } from "@/lib/seo";
import { CATEGORIA_GUIA } from "@/lib/categoria-guia";
import { isFeaturedProduct } from "@/lib/indexable";

export async function generateStaticParams() {
  return products.map((p) => ({ categoria: p.categorySlug, producto: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string; producto: string }> }): Promise<Metadata> {
  const { producto } = await params;
  const product = getProductBySlug(producto);
  if (!product) return {};
  return {
    title: { absolute: productTitleUnique(product, products, "guía de compra") },
    robots: isFeaturedProduct(product.slug) ? { index: true, follow: true } : { index: false, follow: true },
    description: product.shortDescription,
    alternates: {
      canonical: `https://www.cuidatumascota.es/tienda/${product.categorySlug}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — Ficha y opciones de compra`,
      description: product.shortDescription,
      images: [{ url: product.image ? `https://www.cuidatumascota.es${product.image}` : `https://www.cuidatumascota.es/images/products/${product.categorySlug}.jpg` }],
    },
  };
}


export default async function ProductoPage({ params }: { params: Promise<{ categoria: string; producto: string }> }) {
  const { categoria, producto } = await params;
  const product = getProductBySlug(producto);
  const cat = categories.find((c) => c.slug === categoria);
  if (!product || !cat) notFound();
  if (product.unavailable) redirect(`/tienda/${product.categorySlug}`);

  const related = relatedInCategory(getProductsByCategory(categoria), producto, 3);
  const relatedGuides = (product.relatedPosts ?? []).map((s) => getPostBySlug(s)).filter(Boolean);

  const analisis = publicDescription(product.fullDescription);
  const guia = CATEGORIA_GUIA[categoria];
  const especificaciones = Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`).join("; ");
  const clavesComparativa = Object.keys(product.specs).slice(0, 3);
  // Preguntas propias de la ficha, construidas con los datos reales del producto y de su categoría.
  const faqs = [
    { q: `¿Qué características tiene ${product.name}?`, a: especificaciones ? `Según los datos del fabricante: ${especificaciones}.` : "Consulta la ficha del fabricante." },
    { q: `¿Qué inconvenientes tiene ${product.name}?`, a: product.cons.length ? `${product.cons.join(". ")}.` : "Consulta la ficha del fabricante." },
    ...(guia ? [guia.faq[0]] : []),
    { q: "¿Con qué otros productos se puede comparar?", a: related.length ? `En la categoría ${cat.name} tienes también ${related.map((r) => r.name).join(", ")}; más abajo los comparamos.` : "Consulta el resto de la categoría." },
  ];


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
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const topSpecs = Object.entries(product.specs).slice(0, 4);

  return (
    <>
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
                src={product.image ?? `/images/products/${product.categorySlug}.jpg`}
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
          </div>

          {/* Ficha del producto */}
          <div className="flex flex-col">

            {/* Categoría + label */}
            <div className="flex items-center gap-2 mb-3">
              <Link href={`/tienda/${cat.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-full hover:bg-cyan-100 transition-colors">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            </div>

            {/* Nombre */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>


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
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Precio actual</p>
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
                Comprar ahora →
              </a>

              {/* CTA secundaria */}
              <Link
                href={`/tienda/${cat.slug}`}
                className="flex items-center justify-center gap-1.5 w-full border border-gray-200 hover:border-cyan-300 text-gray-600 hover:text-cyan-700 font-semibold text-sm py-3 px-6 rounded-xl transition-colors bg-white"
              >
                Ver más productos de {cat.name}
              </Link>
            </div>


            {/* Affiliate notice */}
            <p className="text-xs text-gray-400 mt-4 pl-3 border-l-2 border-gray-200">
              Enlace de afiliado. Si compras a través de nuestro enlace recibimos una pequeña comisión sin coste adicional para ti.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECCIÓN: Pros & Cons
        ══════════════════════════════════════════ */}
        {analisis && (
          <section className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Qué ofrece este producto</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{analisis}</p>
            <p className="text-xs text-gray-400 mt-2">Resumen basado en la información del fabricante. No hemos probado personalmente el producto.</p>
          </section>
        )}

        {guia && (
          <section className="mb-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-6">
            <h2 className="text-base font-extrabold text-cyan-900 mb-3">Cómo elegir en {cat.name}</h2>
            <div className="space-y-3 mb-4">
              {guia.criterios.map((c) => (
                <div key={c.titulo}>
                  <h3 className="text-sm font-bold text-cyan-900">{c.titulo}</h3>
                  <p className="text-sm text-cyan-900 leading-relaxed">{c.texto}</p>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-cyan-900 uppercase tracking-wide mb-2">Antes de comprar, comprueba</p>
            <ul className="space-y-1.5">
              {guia.antesDeComprar.map((t, i) => (
                <li key={i} className="text-sm text-cyan-900 flex gap-2"><span className="shrink-0 font-bold">→</span>{t}</li>
              ))}
            </ul>
          </section>
        )}

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
            {faqs.map(({ q, a }) => (
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
        {related.length > 0 && clavesComparativa.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Comparado con otras opciones de la categoría</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Producto</th>
                    {clavesComparativa.map((k) => (<th key={k} className="px-4 py-3 capitalize">{k}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {[product, ...related].map((p) => (
                    <tr key={p.slug} className={p.slug === product.slug ? "bg-cyan-50 font-semibold" : "border-t border-gray-100"}>
                      <td className="px-4 py-3">
                        {p.slug === product.slug ? p.name : <Link href={`/tienda/${p.categorySlug}/${p.slug}`} className="text-cyan-700 hover:underline">{p.name}</Link>}
                      </td>
                      {clavesComparativa.map((k) => (<td key={k} className="px-4 py-3 text-gray-600">{p.specs[k] ?? "—"}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">Datos del fabricante. «—» indica que ese dato no figura en la ficha del otro producto.</p>
          </section>
        )}

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
          <p className="text-cyan-100 text-sm mb-4">Ver el precio actualizado y comprarlo directamente</p>
          <a
            href={amazonLink(product.asin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md"
          >
            🛒 Ir a la tienda →
          </a>
          <p className="text-cyan-200 text-xs mt-3">Enlace de afiliado · Sin coste adicional para ti</p>
        </div>

      </div>
    </>
  );
}
