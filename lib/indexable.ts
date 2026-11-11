// Fichas de producto que se mantienen indexables (14/11/2026).
// Criterio: las más citadas por las guías del blog (relatedProducts). El resto de fichas siguen
// accesibles para el usuario, pero con noindex,follow y fuera del sitemap: Google AdSense evalúa
// el sitio completo y las fichas plantilla de afiliado restaban valor al conjunto.
export const FEATURED_PRODUCT_SLUGS = new Set<string>([
  "kong-classic-xl-caucho",
  "catit-flower-fountain",
  "orijen-original-dog-11kg",
  "royal-canin-indoor-adult",
  "beaphar-fiprex-perro",
  "royal-canin-adult-maxi",
  "hills-science-plan-adult",
  "petfusion-arbol-rascador",
  "bedsure-cama-cueva-gato-40cm",
  "frontline-combo-gato",
  "bedsure-cama-antistress-invierno-50cm",
  "ruffwear-front-range-arnes-2024",
  "bedsure-sofa-cama-ortopedica-perro-grande",
  "petsafe-easy-walk-arnes-antitirones",
  "rabbitgoo-arnes-perro-antitirones-l",
]);

export const isFeaturedProduct = (slug: string) => FEATURED_PRODUCT_SLUGS.has(slug);
