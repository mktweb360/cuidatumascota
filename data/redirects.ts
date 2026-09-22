// Redirecciones 301 de productos descatalogados (retirados de data/products.ts).
// Cada baja de producto sin sustituto exacto en el mismo ASIN debe registrarse aquí
// para no perder el equity SEO de la URL y no dejar a los usuarios en un 404.
// Formato: { source, destination } — permanent: true (301) se aplica en next.config.ts.
export interface ProductRedirect {
  source: string;
  destination: string;
  motivo: string;
}

export const productRedirects: ProductRedirect[] = [
  {
    source: "/tienda/accesorios-gatos/petfusion-cat-scratcher-lounge",
    destination: "/tienda/accesorios-gatos",
    motivo: "Descatalogado (06/09/2026, sesión de ampliación de catálogo). ASIN original B00KJ8DPRM confirmado inactivo en amazon.es (404). No se encontró sustituto exacto en stock (variante equivalente B01NC0A463 también sin disponibilidad al verificar) — redirige a la categoría.",
  },
  {
    source: "/tienda/accesorios-perros/cama-memory-foam-xl-perro",
    destination: "/tienda/accesorios-perros",
    motivo: "Descatalogado (06/09/2026). ASIN original B09FFDP46V confirmado inactivo en amazon.es (404). Sustituto candidato (PetFusion Memory Foam B00TQ47CPW) también sin disponibilidad en la talla/color de catálogo al verificar — redirige a la categoría.",
  },
  {
    source: "/tienda/alimentacion-gatos/royal-canin-indoor-adult-gato-4kg",
    destination: "/tienda/alimentacion-gatos",
    motivo: "Descatalogado (06/09/2026). ASIN original B003WSTHUG confirmado inactivo en amazon.es (404). No existe en amazon.es un Royal Canin Indoor Adult regular de 4kg vigente (solo la línea Indoor +7 senior, formulación distinta) — redirige a la categoría en vez de ofrecer un producto que no es equivalente.",
  },
  {
    source: "/tienda/salud-higiene/seresto-collar-antiparasitario-perro-grande",
    destination: "/tienda/salud-higiene",
    motivo: "Descatalogado (06/09/2026). ASIN original B00B8CG5SK confirmado inactivo en amazon.es (404). No se localizó una ficha de producto Seresto para perro grande con ASIN verificable en amazon.es al momento de la auditoría — redirige a la categoría.",
  },
  {
    source: "/tienda/salud-higiene/frontline-combo-perros-20-40kg-3p",
    destination: "/tienda/salud-higiene/frontline-plus-perros-grandes-6-pipetas",
    motivo: "Descatalogado (06/09/2026). ASIN original B078BP3LNR confirmado inactivo en amazon.es (404). Redirige al producto equivalente ya activo en catálogo (mismo uso: antiparasitario Frontline para perros grandes).",
  },
  {
    source: "/tienda/salud-higiene/frontline-homeguard-spray-antipulgas-hogar-500ml",
    destination: "/tienda/salud-higiene/petsly-spray-antipulgas-hogar-500ml",
    motivo: "Verificación en vivo (22/09/2026): el producto original 'Frontline Homeguard' nunca existió en Amazon.es bajo esa marca/nombre (0 resultados para 'Frontline Homeguard' en Amazon.es, marca Frontline sin línea 'Homeguard'). Sustituido por producto verificado y equivalente en categoría, formato (500ml) y función (spray antipulgas ambiental para el hogar): Petsly Spray Antipulgas Hogar 500ml, ASIN B08ZLCBGG9.",
  },
  {
    source: "/tienda/alimentacion-gatos/applaws-taquitos-pollo-snacks-gato-30g",
    destination: "/tienda/alimentacion-gatos/applaws-freeze-dried-pollo-snacks-gato-12x10g",
    motivo: "Verificación en vivo (22/09/2026): el producto original 'Applaws Taquitos de Pollo 100% Natural Snacks para Gatos 30g' no existe en Amazon.es (revisadas todas las variantes de la línea de snacks Applaws: atún, caballa, salmón, puré de pollo — ninguna es 'taquitos de pollo 30g'). Sustituido por producto real equivalente: Applaws Freeze Dried Pechuga de Pollo, pack 12x10g, ASIN B0D1CT7WYZ.",
  },
  {
    source: "/tienda/alimentacion-perros/applaws-taquitos-pollo-perro-natural-90g",
    destination: "/tienda/alimentacion-perros/snackomio-tiras-pechuga-pollo-perro-500g",
    motivo: "Verificación en vivo (22/09/2026): 'Applaws Taquitos de Pollo Snacks para Perros 90g' no existe — Applaws no vende snacks secos para perro en Amazon.es, solo comida húmeda. Sustituido por SnackOMio Tiras de Pechuga de Pollo 500g, ASIN B08Y8TDVTB (marca distinta, mismo tipo de producto: snack de pollo natural sin cereales).",
  },
];
