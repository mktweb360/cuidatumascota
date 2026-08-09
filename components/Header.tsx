"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-cyan-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <svg viewBox="0 0 210 44" height="36" xmlns="http://www.w3.org/2000/svg" aria-label="CuidaTuMascota">
            <defs>
              <linearGradient id="ctm-g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee"/>
                <stop offset="100%" stopColor="#0891b2"/>
              </linearGradient>
            </defs>
            <rect x="0" y="2" width="40" height="40" rx="10" fill="url(#ctm-g)"/>
            <circle cx="13" cy="13" r="3.2" fill="white"/>
            <circle cx="27" cy="13" r="3.2" fill="white"/>
            <circle cx="8"  cy="21" r="2.6" fill="white"/>
            <circle cx="32" cy="21" r="2.6" fill="white"/>
            <ellipse cx="20" cy="29" rx="8" ry="6.5" fill="white"/>
            <text x="50" y="30" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" fontWeight="800" fontSize="19" fill="#0e7490">CuidaTuMascota</text>
            <text x="196" y="30" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" fontWeight="400" fontSize="12" fill="#94a3b8">.es</text>
          </svg>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link href="/tienda" className="text-gray-700 hover:text-cyan-700 transition-colors">Tienda</Link>
          <Link href="/blog" className="text-gray-700 hover:text-cyan-700 transition-colors">Blog</Link>
          <Link href="/sobre-nosotros" className="text-gray-700 hover:text-cyan-700 transition-colors">Sobre nosotros</Link>
          <Link href="/tienda" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
            Ver productos →
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-cyan-50"
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-cyan-100 px-4 py-4 space-y-3 text-sm font-semibold">
          <Link href="/tienda" className="block text-gray-700 hover:text-cyan-700" onClick={() => setOpen(false)}>Tienda</Link>
          <Link href="/blog" className="block text-gray-700 hover:text-cyan-700" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/sobre-nosotros" className="block text-gray-700 hover:text-cyan-700" onClick={() => setOpen(false)}>Sobre nosotros</Link>
          <Link href="/tienda" className="block bg-orange-500 text-white px-4 py-2 rounded-lg text-center" onClick={() => setOpen(false)}>Ver productos →</Link>
        </div>
      )}
    </header>
  );
}
