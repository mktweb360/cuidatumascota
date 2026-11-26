import sync from "@/data/amazon-sync.json";

// Datos de la Creators API de Amazon, generados por scripts/sync-amazon.mjs.
// Solo se usa la imagen oficial: precios, valoraciones y reseñas no se muestran (ver CLAUDE.md).
interface SyncEntry {
  status: "ok" | "sin-oferta" | "no-accesible";
  image?: string;
  checkedAt?: string;
}

const items = (sync as { items: Record<string, SyncEntry> }).items;

/** Imagen oficial de Amazon para el ASIN, si la sincronización la ha traído. */
export function syncedImage(asin: string): string | undefined {
  return items[asin]?.image;
}
