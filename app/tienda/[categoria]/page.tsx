import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import VetDisclaimer from "@/components/VetDisclaimer";

export async function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params;
  const cat = categories.find((c) => c.slug === categoria);
  if (!cat) return {};
  return {
    title: `${cat.name} — Mejores productos`,
    description: cat.description,
  };
}

const healthCategories = new Set(["alimentacion-perros", "alimentacion-gatos", "salud-higiene"]);

const guideContent: Record<string, { intro: string; tips: string[] }> = {
  "alimentacion-perros": {
    intro: "La alimentación es la base de la salud de tu perro. Un pienso de calidad debe tener proteína animal como primer ingrediente, ser digestivo y estar adaptado a la edad, tamaño y actividad de tu perro. Consulta siempre con tu veterinario antes de cambiar de alimento.",
    tips: ["Busca proteína animal (pollo, cordero, salmón) como primer ingrediente", "Evita piensos con 'harinas de carne' no especificadas", "Adapta el pienso a la etapa de vida: cachorro, adulto, senior", "Haz la transición gradualmente en 7-10 días para evitar problemas digestivos", "Los piensos premium sin cereales son mejores para perros con alergias"],
  },
  "alimentacion-gatos": {
    intro: "Los gatos son carnívoros obligados y necesitan una dieta rica en proteína animal. Su sistema urinario es delicado, por lo que la hidratación y la calidad del pienso son fundamentales. Consulta con tu veterinario para adaptar la dieta a tu gato.",
    tips: ["Los gatos necesitan taurina: asegúrate de que el pienso la incluye", "Combina pienso seco con húmedo para mejorar la hidratación", "Los gatos de interior necesitan fórmulas específicas con menor contenido calórico", "Cambia de pienso gradualmente para evitar rechazo", "La salud urinaria es prioritaria: busca piensos con pH urinario controlado"],
  },
  "accesorios-perros": {
    intro: "Los accesorios correctos mejoran la calidad de vida de tu perro y facilitan tu día a día. Un buen arnés, juguetes estimulantes y accesorios de calidad marcan la diferencia en el bienestar animal.",
    tips: ["Elige un arnés en lugar de collar para evitar presión en el cuello", "Los juguetes Kong son ideales para perros que se quedan solos en casa", "El tamaño importa: adapta todos los accesorios al peso y tamaño de tu perro", "Los juguetes de caucho natural son más seguros y duraderos", "Renueva los juguetes cuando estén muy desgastados para evitar ingestión de trozos"],
  },
  "salud-higiene": {
    intro: "La higiene y la salud preventiva son esenciales para el bienestar de tu mascota. Los antiparasitarios, la higiene dental y el cuidado de la piel son pilares de una vida sana. Consulta siempre con tu veterinario para los tratamientos.",
    tips: ["Desparasita a tu mascota según el calendario veterinario recomendado", "La higiene dental previene el 80% de los problemas de salud bucal", "Usa siempre productos formulados específicamente para mascotas", "El champú para humanos daña el pH de la piel de perros y gatos", "Las revisiones veterinarias anuales son la mejor prevención"],
  },
  "camas-transportines": {
    intro: "Una buena cama y un transportín seguro son inversiones para el bienestar de toda la vida de tu mascota. Las camas ortopédicas son especialmente importantes para razas grandes y perros senior.",
    tips: ["Los perros mayores o con artritis necesitan camas con memory foam", "El transportín debe ser de al menos 1,5 veces el tamaño de tu mascota", "Homologación IATA imprescindible para viajar en avión con tu mascota", "Introduce el transportín en casa antes del viaje para que tu mascota lo acepte", "Lava las fundas regularmente para reducir bacterias y ácaros"],
  },
};

export default async function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const cat = categories.find((c) => c.slug === categoria);
  if (!cat) notFound();

  const catProducts = getProductsByCategory(categoria);
  const guide = guideContent[categoria];
  const isHealthCat = healthCategories.has(categoria);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <nav className="text-gray-400 text-sm mb-6">
          <Link href="/" className="hover:text-cyan-700">Inicio</Link>
          <span className="mx-2">›</span>
          <Link href="/tienda" className="hover:text-cyan-700">Tienda</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{cat.name}</span>
        </nav>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{cat.icon}</span>
            <h1 className="text-3xl font-extrabold text-gray-900">{cat.name}</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">{cat.description}</p>
        </div>

        {isHealthCat && <VetDisclaimer />}
        <AffiliateDisclosure />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {catProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {guide && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Guía de compra: {cat.name}</h2>
            <p className="text-gray-700 mb-5">{guide.intro}</p>
            <h3 className="font-bold text-gray-800 mb-3">Consejos clave:</h3>
            <ul className="space-y-2">
              {guide.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-gray-700 text-sm">
                  <span className="text-cyan-500 font-bold shrink-0">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
