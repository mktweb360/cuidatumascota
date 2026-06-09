import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog — Guías de salud y cuidado para mascotas",
  description: "Artículos, guías de compra y consejos de cuidado para perros y gatos. Todo en español.",
};

const allCategories = [...new Set(posts.map((p) => p.category))];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-cyan-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Blog</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Guías y análisis</h1>
      <p className="text-gray-500 mb-4">Artículos para ayudarte a cuidar mejor a tu mascota y elegir los mejores productos.</p>

      <div className="bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-3 text-sm text-cyan-800 mb-8">
        🩺 Los artículos marcados con 🩺 contienen contenido de salud. Consulta siempre con tu veterinario.
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <span className="bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full">Todos</span>
        {allCategories.map((cat) => (
          <span key={cat} className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wide">{post.category}</span>
              {post.isHealth && <span className="text-sm">🩺</span>}
            </div>
            <h2 className="font-extrabold text-gray-900 mt-1 mb-2 leading-tight hover:text-cyan-700 transition-colors">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>{post.readTime} min lectura</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
