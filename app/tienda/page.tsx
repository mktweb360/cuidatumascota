import Link from "next/link";
import type { Metadata } from "next";
import { categories, getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Tienda — Productos para perros y gatos",
  description: "Catálogo completo de productos para mascotas: alimentación, salud, accesorios, camas y transportines para perros y gatos.",
};

export default function TiendaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-cyan-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Tienda</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Tienda para mascotas</h1>
      <p className="text-gray-500 mb-10">Los productos mejor valorados para el bienestar de tu perro o gato, analizados y recomendados con criterios veterinarios.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catProducts = getProductsByCategory(cat.slug);
          return (
            <Link
              key={cat.slug}
              href={`/tienda/${cat.slug}`}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-cyan-200 transition-all"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h2 className="font-extrabold text-gray-900 text-lg mb-1">{cat.name}</h2>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{cat.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-cyan-600 font-semibold">{catProducts.length} productos</span>
                <span className="text-gray-400">{cat.priceRange}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
