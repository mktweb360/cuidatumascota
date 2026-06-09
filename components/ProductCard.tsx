import Link from "next/link";
import { amazonLink } from "@/lib/amazon";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const stars = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {product.badge && (
        <div className="bg-cyan-600 text-white text-xs font-bold px-3 py-1 text-center">
          {product.badge}
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {product.isHealth && (
          <div className="bg-cyan-50 border border-cyan-100 rounded-lg px-3 py-2 text-xs text-cyan-800 mb-3">
            🩺 Consulta con tu veterinario antes de cambiar la alimentación o tratamiento.
          </div>
        )}
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 flex-1">{product.shortDescription}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-400 text-sm">{stars}</span>
          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString("es-ES")} reseñas)</span>
        </div>

        <div className="text-2xl font-extrabold text-cyan-700 mb-4">{product.price}</div>

        <div className="space-y-2">
          <a
            href={amazonLink(product.asin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-2.5 px-4 rounded-xl text-center transition-colors"
          >
            Ver en Amazon →
          </a>
          <Link
            href={`/tienda/${product.categorySlug}/${product.slug}`}
            className="block w-full border border-cyan-200 hover:border-cyan-400 text-cyan-700 font-semibold text-sm py-2 px-4 rounded-xl text-center transition-colors"
          >
            Ver análisis completo
          </Link>
        </div>
      </div>
    </div>
  );
}
