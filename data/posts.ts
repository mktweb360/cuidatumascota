export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  relatedProducts: string[];
  isHealth?: boolean;
}

export const posts: Post[] = [
  {
    slug: "mejor-pienso-perro-2025",
    title: "El mejor pienso para perros en 2025 — Guía por razas y edad",
    excerpt: "Comparativa completa de los mejores piensos para perros en 2025. Analizamos ingredientes, digestibilidad y relación calidad-precio para que elijas con confianza.",
    category: "Nutrición",
    date: "2025-01-10",
    readTime: 10,
    relatedProducts: ["royal-canin-medium-adult-15kg", "orijen-original-dog-food-11-4kg"],
    isHealth: true,
  },
  {
    slug: "pienso-gato-adulto-comparativa",
    title: "Mejor pienso para gatos adultos 2025 — Comparativa completa",
    excerpt: "Guía de los mejores piensos para gatos adultos: desde opciones veterinarias hasta las más asequibles. Todo lo que necesitas saber para alimentar bien a tu gato.",
    category: "Nutrición",
    date: "2025-01-20",
    readTime: 9,
    relatedProducts: ["hills-science-plan-adult-cat-10kg", "royal-canin-indoor-adult-cat-4kg"],
    isHealth: true,
  },
  {
    slug: "antiparasitarios-perros-guia",
    title: "Antiparasitarios para perros: guía completa 2025",
    excerpt: "Todo lo que necesitas saber sobre antiparasitarios para perros: tipos, frecuencia de aplicación y las mejores opciones del mercado.",
    category: "Salud",
    date: "2025-02-01",
    readTime: 8,
    relatedProducts: ["frontline-combo-perro-3-pipetas"],
    isHealth: true,
  },
  {
    slug: "juguetes-estimulacion-mental-perros",
    title: "Los mejores juguetes para estimulación mental en perros",
    excerpt: "Un perro estimulado mentalmente es un perro feliz. Descubre los mejores juguetes interactivos para mantener a tu perro entretenido y cognitivamente activo.",
    category: "Accesorios",
    date: "2025-02-15",
    readTime: 7,
    relatedProducts: ["kong-classic-perro-grande", "ruffwear-arnes-front-range"],
  },
  {
    slug: "higiene-dental-perros-gatos",
    title: "Higiene dental en perros y gatos: por qué importa y cómo hacerlo",
    excerpt: "El 80% de los perros mayores de 3 años tienen problemas dentales. Guía práctica para limpiar los dientes de tu mascota y prevenir enfermedades periodontales.",
    category: "Salud",
    date: "2025-03-01",
    readTime: 8,
    relatedProducts: ["cepillo-dientes-perro-kit"],
    isHealth: true,
  },
  {
    slug: "transportin-viaje-mascotas",
    title: "Cómo elegir el transportín ideal para viajar con tu mascota",
    excerpt: "Guía completa para elegir el transportín perfecto: normativa IATA para vuelos, tamaños, materiales y las mejores opciones del mercado.",
    category: "Accesorios",
    date: "2025-03-15",
    readTime: 7,
    relatedProducts: ["ferplast-atlas-10-transportin"],
  },
  {
    slug: "cama-ortopedica-perros-mayores",
    title: "Camas ortopédicas para perros mayores: cuándo y cuál elegir",
    excerpt: "Los perros mayores o con artritis necesitan una cama especial. Descubre cuándo es necesaria una cama ortopédica y cuáles son las mejores opciones en 2025.",
    category: "Confort",
    date: "2025-04-01",
    readTime: 7,
    relatedProducts: ["cama-perro-memory-foam-xxl", "trixie-cama-perro-ortopedica-xl"],
    isHealth: true,
  },
  {
    slug: "alimentacion-natural-perros-barf",
    title: "Alimentación natural para perros: guía BARF para principiantes",
    excerpt: "La dieta BARF (Biologically Appropriate Raw Food) cada vez tiene más seguidores. Qué es, ventajas, riesgos y cómo empezar de forma segura.",
    category: "Nutrición",
    date: "2025-04-15",
    readTime: 10,
    relatedProducts: ["orijen-original-dog-food-11-4kg"],
    isHealth: true,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getLatestPosts(count = 6): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
}
