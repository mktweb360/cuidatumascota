import { amazonLink } from "@/lib/amazon";

export interface Product {
  slug: string;
  name: string;
  asin: string;
  price: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  badge?: string;
  categorySlug: string;
  isHealth?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  priceRange: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: "alimentacion-perros",
    name: "Alimentación para perros",
    icon: "🐕",
    priceRange: "19€ — 89€",
    description: "Los mejores piensos y alimentos para perros, desde opciones económicas hasta premium sin cereales.",
  },
  {
    slug: "alimentacion-gatos",
    name: "Alimentación para gatos",
    icon: "🐈",
    priceRange: "15€ — 69€",
    description: "Piensos y alimentación húmeda para gatos adultos, cachorros y gatos con necesidades especiales.",
  },
  {
    slug: "accesorios-perros",
    name: "Accesorios para perros",
    icon: "🦮",
    priceRange: "15€ — 79€",
    description: "Juguetes, arneses, correas y todo lo que necesita tu perro para una vida activa y feliz.",
  },
  {
    slug: "salud-higiene",
    name: "Salud e higiene",
    icon: "💊",
    priceRange: "9€ — 49€",
    description: "Antiparasitarios, champús dermatológicos e higiene dental para mantener a tu mascota sana.",
  },
  {
    slug: "camas-transportines",
    name: "Camas y transportines",
    icon: "🛏️",
    priceRange: "25€ — 99€",
    description: "Camas ortopédicas, camas cueva para gatos y transportines homologados para viajes seguros.",
  },
];

export const products: Product[] = [
  // ALIMENTACION PERROS
  {
    slug: "royal-canin-medium-adult-15kg",
    name: "Royal Canin Medium Adult 15kg",
    asin: "B074W7D3KJ",
    price: "€64,99",
    rating: 4.7,
    reviewCount: 8765,
    shortDescription: "Pienso premium para perros medianos de 1 a 7 años. Formulado para mantener el peso ideal y la salud digestiva.",
    pros: ["Fórmula específica para razas medianas", "Excelente digestibilidad", "Apoyado por veterinarios", "Alta palatabilidad"],
    cons: ["Precio más elevado que marcas blancas", "Bolsa no resellable"],
    specs: { Peso: "15 kg", Raza: "Mediana (11-25 kg)", Edad: "1-7 años", Proteína: "25%" },
    badge: "Más recomendado",
    categorySlug: "alimentacion-perros",
    isHealth: true,
  },
  {
    slug: "orijen-original-dog-food-11-4kg",
    name: "Orijen Original Dog 11.4kg",
    asin: "B07CQGQM3P",
    price: "€89,99",
    rating: 4.8,
    reviewCount: 3241,
    shortDescription: "Pienso premium sin cereales con 85% ingredientes animales. El más valorado por dueños exigentes.",
    pros: ["85% ingredientes animales", "Sin cereales ni patata", "Ingredientes frescos regionales", "Sin conservantes artificiales"],
    cons: ["Precio muy elevado", "Puede ser muy rico para perros sedentarios"],
    specs: { Proteína: "38%", Grasa: "18%", "Sin cereales": "Sí", "Ingredientes animales": "85%" },
    badge: "Premium",
    categorySlug: "alimentacion-perros",
    isHealth: true,
  },
  {
    slug: "pedigree-adult-complete-15kg",
    name: "Pedigree Adult Complete 15kg",
    asin: "B001DQKUV6",
    price: "€24,99",
    rating: 4.3,
    reviewCount: 15432,
    shortDescription: "El pienso más vendido en España. Nutrición completa a precio accesible.",
    pros: ["Precio muy asequible", "Amplia disponibilidad", "Buena palatabilidad", "Vitaminas y minerales incluidos"],
    cons: ["Contiene cereales como primer ingrediente", "No apto para perros con alergias"],
    specs: { Peso: "15 kg", Proteína: "22%", Tipo: "Seco completo" },
    badge: "Mejor precio",
    categorySlug: "alimentacion-perros",
    isHealth: true,
  },
  // ALIMENTACION GATOS
  {
    slug: "hills-science-plan-adult-cat-10kg",
    name: "Hills Science Plan Adult Cat 10kg",
    asin: "B000BG2J3Q",
    price: "€54,99",
    rating: 4.6,
    reviewCount: 5432,
    shortDescription: "Pienso veterinario para gatos adultos. Formulado con pollo para mantener la salud urinaria.",
    pros: ["Apoyado por veterinarios", "Protege salud urinaria", "Alta digestibilidad", "Omega 3 y 6 incluidos"],
    cons: ["Precio elevado", "Algunos gatos tardan en adaptarse"],
    specs: { Peso: "10 kg", Proteína: "33%", "Salud urinaria": "Sí", "Omega 3+6": "Incluidos" },
    badge: "Recomendado por veterinarios",
    categorySlug: "alimentacion-gatos",
    isHealth: true,
  },
  {
    slug: "whiskas-adult-salmon-10kg",
    name: "Whiskas Adult Salmon 10kg",
    asin: "B00AHZXZPU",
    price: "€22,99",
    rating: 4.4,
    reviewCount: 12543,
    shortDescription: "Pienso con salmón para gatos adultos. La marca más reconocida en alimentación felina.",
    pros: ["Sabor a salmón muy apetecible", "Precio asequible", "Taurina incluida", "Fácil de encontrar"],
    cons: ["Ingredientes no premium", "Contiene colorantes"],
    specs: { Peso: "10 kg", Sabor: "Salmón", Taurina: "Incluida" },
    badge: "Más vendido",
    categorySlug: "alimentacion-gatos",
    isHealth: true,
  },
  {
    slug: "royal-canin-indoor-adult-cat-4kg",
    name: "Royal Canin Indoor Adult 4kg",
    asin: "B07MQDKQ9D",
    price: "€29,99",
    rating: 4.7,
    reviewCount: 4321,
    shortDescription: "Formulado específicamente para gatos de interior. Controla el olor de las heces y reduce las bolas de pelo.",
    pros: ["Específico para gatos de interior", "Reduce olor heces", "Control bolas de pelo", "Alta palatabilidad"],
    cons: ["Solo 4kg de tamaño"],
    specs: { Peso: "4 kg", Para: "Gatos interior", "Bolas de pelo": "Control activo" },
    badge: "Mejor para gatos de interior",
    categorySlug: "alimentacion-gatos",
    isHealth: true,
  },
  // ACCESORIOS PERROS
  {
    slug: "kong-classic-perro-grande",
    name: "Kong Classic Juguete Rellenable Grande",
    asin: "B07BFKPDXC",
    price: "€14,99",
    rating: 4.8,
    reviewCount: 25432,
    shortDescription: "El juguete para perros más vendido del mundo. Estimulación mental y física duradera.",
    pros: ["Ultra resistente (natural rubber)", "Estimulación mental", "Apto para lavavajillas", "Múltiples tamaños"],
    cons: ["Puede ser frustrante para perros impacientes", "El relleno no incluido"],
    specs: { Material: "Caucho natural", Tamaño: "Grande (>16kg)", Lavavajillas: "Sí" },
    badge: "Más vendido del mundo",
    categorySlug: "accesorios-perros",
  },
  {
    slug: "ruffwear-arnes-front-range",
    name: "Ruffwear Front Range Arnés Perro",
    asin: "B08KJ4H7PR",
    price: "€49,99",
    rating: 4.7,
    reviewCount: 8765,
    shortDescription: "El arnés para perros más valorado. 4 puntos de ajuste, dos anillas de correa, diseño ergonómico.",
    pros: ["4 puntos de ajuste precisos", "Anilla frontal y dorsal", "Muy cómodo para uso diario", "Calidad premium"],
    cons: ["Precio elevado", "Puede ser cálido en verano"],
    specs: { Ajuste: "4 puntos", Anillas: "Frontal + dorsal", Material: "Nylon acolchado" },
    badge: "Mejor calidad",
    categorySlug: "accesorios-perros",
  },
  {
    slug: "cama-perro-memory-foam-xxl",
    name: "Cama para Perros Memory Foam XL",
    asin: "B09FFDP46V",
    price: "€59,99",
    rating: 4.5,
    reviewCount: 3241,
    shortDescription: "Cama ortopédica de memory foam para perros grandes. Ideal para perros mayores o con artritis.",
    pros: ["Memory foam ortopédico", "Funda lavable a máquina", "Ideal para articulaciones", "Antideslizante"],
    cons: ["Puede aplanar con el tiempo", "Solo lavado en fría"],
    specs: { Tamaño: "XL (100x70cm)", Material: "Memory foam", Funda: "Lavable a 30°" },
    badge: "Mejor ortopédica",
    categorySlug: "accesorios-perros",
    isHealth: true,
  },
  // SALUD E HIGIENE
  {
    slug: "frontline-combo-perro-3-pipetas",
    name: "Frontline Combo Perro 3 Pipetas",
    asin: "B07PXMJM9Q",
    price: "€24,99",
    rating: 4.6,
    reviewCount: 18765,
    shortDescription: "El antiparasitario más utilizado en España. Protección contra pulgas, garrapatas y piojos.",
    pros: ["Protección 4 semanas pulgas", "Elimina garrapatas en 48h", "Fácil aplicación", "Marca veterinaria de referencia"],
    cons: ["Requiere aplicación mensual", "Precio acumulativo"],
    specs: { Aplicación: "Mensual", Protección: "Pulgas + Garrapatas + Piojos", Presentación: "3 pipetas" },
    badge: "Más usado",
    categorySlug: "salud-higiene",
    isHealth: true,
  },
  {
    slug: "shampoo-perro-hipoalergenico-veterinario",
    name: "Virbac Sebocalm Champú Hipoalergénico 250ml",
    asin: "B08Z9J7QXL",
    price: "€12,99",
    rating: 4.5,
    reviewCount: 3241,
    shortDescription: "Champú dermatológico para perros con piel sensible. Formulado por laboratorio veterinario.",
    pros: ["Sin colorantes ni perfumes", "Apto piel sensible", "Laboratorio veterinario", "Hidratante"],
    cons: ["Precio algo elevado para 250ml"],
    specs: { Volumen: "250 ml", Tipo: "Hipoalergénico", pH: "Neutro" },
    badge: "Mejor piel sensible",
    categorySlug: "salud-higiene",
    isHealth: true,
  },
  {
    slug: "cepillo-dientes-perro-kit",
    name: "Kit Higiene Dental Perro TropiClean",
    asin: "B09NMQT4YX",
    price: "€14,99",
    rating: 4.4,
    reviewCount: 5432,
    shortDescription: "Kit completo de higiene dental: pasta, cepillo y gel. Reduce el sarro y el mal aliento.",
    pros: ["Kit completo incluido", "Sin flúor (seguro si ingieren)", "Sabor agradable para perros", "Reduce sarro 80%"],
    cons: ["Requiere paciencia para acostumbrar al perro"],
    specs: { Incluye: "Pasta + cepillo + gel", "Sin flúor": "Sí", Aplicaciones: "60+" },
    badge: "Mejor higiene dental",
    categorySlug: "salud-higiene",
    isHealth: true,
  },
  // CAMAS Y TRANSPORTINES
  {
    slug: "ferplast-atlas-10-transportin",
    name: "Ferplast Atlas 10 Transportín Gato/Perro pequeño",
    asin: "B07RIEGO123",
    price: "€34,99",
    rating: 4.5,
    reviewCount: 6543,
    shortDescription: "Transportín homologado IATA para vuelos. Para mascotas hasta 6kg.",
    pros: ["Homologado IATA", "Puerta delantera y lateral", "Ventilación superior e inferior", "Muy robusto"],
    cons: ["Solo para mascotas hasta 6kg", "Algo pesado vacío"],
    specs: { Capacidad: "Hasta 6 kg", Homologación: "IATA", Puertas: "2 (frontal + lateral)" },
    badge: "Más vendido",
    categorySlug: "camas-transportines",
  },
  {
    slug: "cama-gato-cueva-suave",
    name: "Bedsure Cama Cueva para Gatos",
    asin: "B08CESPED12",
    price: "€29,99",
    rating: 4.6,
    reviewCount: 12543,
    shortDescription: "Cama cueva de felpa para gatos. La favorita de los gatos que buscan refugio y calor.",
    pros: ["Diseño cueva muy popular en gatos", "Felpa ultra suave", "Lavable a máquina", "Antideslizante"],
    cons: ["Puede recoger pelo con facilidad", "No apta para gatos muy grandes"],
    specs: { Material: "Felpa", Lavable: "Sí 30°", Tamaño: "45cm diámetro" },
    badge: "Favorita de gatos",
    categorySlug: "camas-transportines",
  },
  {
    slug: "trixie-cama-perro-ortopedica-xl",
    name: "Trixie Cama Ortopédica Perro XL",
    asin: "B08PERGOLA1",
    price: "€79,99",
    rating: 4.4,
    reviewCount: 2341,
    shortDescription: "Cama ortopédica con bordes elevados para perros grandes. Acolchada y lavable.",
    pros: ["Bordes elevados como almohada", "Relleno ortopédico", "Funda lavable", "Para perros grandes"],
    cons: ["Precio elevado", "Secado lento tras lavado"],
    specs: { Tamaño: "XL (120x80cm)", Tipo: "Ortopédica con bordes", Funda: "Lavable" },
    badge: "Mejor para razas grandes",
    categorySlug: "camas-transportines",
    isHealth: true,
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(count = 6): Product[] {
  return products.filter((p) => p.badge).slice(0, count);
}

export { amazonLink };
