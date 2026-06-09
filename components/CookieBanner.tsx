"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const CONSENT_KEY = "cuidatumascota_consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setAccepted(true);
    } else if (!stored) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setAccepted(true);
    setShow(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setShow(false);
  }

  return (
    <>
      {accepted && (
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6063067965030118"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}

      {show && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-gray-900 border-t-2 border-cyan-500 shadow-2xl">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-gray-200 flex-1">
              Usamos cookies para personalizar anuncios (Google AdSense) y mejorar tu experiencia. Solo las activamos con tu permiso.{" "}
              <Link href="/politica-de-cookies" className="underline text-cyan-400 hover:text-cyan-300">Más info</Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button onClick={reject} className="px-4 py-2 text-sm rounded-lg border border-gray-500 text-gray-300 hover:border-gray-300 transition-colors">
                Rechazar
              </button>
              <button onClick={accept} className="px-4 py-2 text-sm rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors">
                Aceptar cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
