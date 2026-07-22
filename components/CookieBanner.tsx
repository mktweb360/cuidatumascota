"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const CONSENT_KEY = "cuidatumascota_consent_v2";
const LEGACY_CONSENT_KEY = "cuidatumascota_consent";

type Consent = { advertising: boolean; analytics: boolean };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function pushConsentUpdate(consent: Consent) {
  const ads = consent.advertising ? "granted" : "denied";
  const analytics = consent.analytics ? "granted" : "denied";
  const payload = {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: analytics,
  };

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", payload);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["consent", "update", payload]);
  }
}

/** Lee el consentimiento guardado, migrando la clave antigua si existe. */
function readStoredConsent(): Consent | null {
  const legacy = localStorage.getItem(LEGACY_CONSENT_KEY);
  if (legacy) {
    localStorage.removeItem(LEGACY_CONSENT_KEY);
    if (!localStorage.getItem(CONSENT_KEY)) {
      const migrated: Consent =
        legacy === "accepted"
          ? { advertising: true, analytics: true }
          : { advertising: false, analytics: false };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(migrated));
      return migrated;
    }
  }

  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<Consent>;
    return {
      advertising: parsed.advertising === true,
      analytics: parsed.analytics === true,
    };
  } catch {
    localStorage.removeItem(CONSENT_KEY);
    return null;
  }
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = readStoredConsent();
    if (consent) {
      // Re-emitimos el update en cada carga: el default del <head> es "denied".
      pushConsentUpdate(consent);
      setAccepted(consent.advertising);
    } else {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    const reopen = () => setShow(true);
    window.addEventListener("openCookieBanner", reopen);
    return () => window.removeEventListener("openCookieBanner", reopen);
  }, []);

  function save(consent: Consent) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    pushConsentUpdate(consent);
    setAccepted(consent.advertising);
    setShow(false);
  }

  function accept() {
    save({ advertising: true, analytics: true });
  }

  function reject() {
    save({ advertising: false, analytics: false });
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
