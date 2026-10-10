"use client";

import { useEffect } from "react";

import { isActiveSlot } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSenseAd({
  slot,
  format = "horizontal",
  responsive = true,
  className = "",
}: {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}) {
  const active = isActiveSlot(slot);

  useEffect(() => {
    if (!active) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className={`flex justify-center max-h-[280px] overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6063067965030118"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
