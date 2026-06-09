import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, getPostBySlug } from "@/data/posts";
import { getProductBySlug } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import VetDisclaimer from "@/components/VetDisclaimer";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

interface ArticleSection {
  heading?: string;
  text?: string;
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  faqs?: { q: string; a: string }[];
}

const articleContent: Record<string, ArticleSection[]> = {
  "mejor-pienso-perro-2025": [
    { text: "Elegir el pienso correcto para tu perro es una de las decisiones más importantes que tomarás como dueño. La alimentación impacta directamente en la salud, el peso, el pelaje y la longevidad de tu perro. Con cientos de opciones en el mercado, esta guía te ayudará a elegir con criterio." },
    { heading: "¿Qué hace que un pienso sea de calidad?", text: "La calidad de un pienso se determina principalmente por sus ingredientes. Un buen pienso debe tener proteína animal identificada como primer ingrediente, alta digestibilidad y estar formulado específicamente para el tamaño y etapa de vida del perro." },
    { list: ["Proteína animal identificada en primer lugar (pollo, cordero, salmón, pato)", "Sin 'harinas de carne' genéricas no especificadas", "Sin colorantes, aromatizantes ni conservantes artificiales (BHA, BHT, etoxiquina)", "Nivel de proteína adecuado: mínimo 22% para adultos, 28% para cachorros", "Digestibilidad alta: menos deposiciones = mejor absorción"] },
    { heading: "Diferencias entre pienso económico, gama media y premium", text: "La diferencia de precio entre un pienso básico y uno premium no es solo marketing. Los piensos premium usan ingredientes de mayor calidad, con mayor digestibilidad y menos rellenos." },
    { table: { headers: ["Gama", "Ingredientes", "Digestibilidad", "Precio/kg", "Ejemplo"], rows: [["Básica", "Cereales como primer ingrediente", "~65%", "~1,5€/kg", "Pedigree"], ["Media", "Mix cereales y proteína animal", "~75%", "~3€/kg", "Purina Pro Plan"], ["Premium", "Proteína animal >30%, sin cereales", "~85%+", "~6€/kg", "Orijen, Acana"]] } },
    { heading: "Recomendaciones por tamaño de perro", text: "Las necesidades nutricionales varían según el tamaño del perro. Las razas grandes necesitan fórmulas que protejan las articulaciones; las pequeñas tienen metabolismos más rápidos." },
    { list: ["Razas pequeñas (<10kg): pienso con croquetas pequeñas y mayor densidad calórica", "Razas medianas (10-25kg): fórmula equilibrada como Royal Canin Medium", "Razas grandes (>25kg): condroitina y glucosamina para articulaciones", "Cachorros: mayor proteína y calcio para el desarrollo óseo", "Senior (>7 años): menor grasa, mayor fibra, apoyo articular"] },
    { heading: "Los mejores piensos para perros en 2025", text: "Después de analizar ingredientes, digestibilidad y valoraciones verificadas, estos son nuestros favoritos:" },
    { faqs: [{ q: "¿Cuántas veces al día debo dar de comer a mi perro?", a: "Los perros adultos deben comer 2 veces al día. Los cachorros menores de 6 meses, 3-4 veces. Los perros senior también se benefician de 2 tomas moderadas. Consulta con tu veterinario la cantidad exacta según el peso de tu perro." }, { q: "¿Puedo mezclar pienso seco con comida húmeda?", a: "Sí, combinar pienso seco con comida húmeda mejora la palatabilidad y la hidratación. La proporción más común es 70% seco + 30% húmedo. Ajusta la cantidad total para no sobrepasar las calorías diarias recomendadas." }, { q: "¿Cómo sé si el pienso le sienta bien a mi perro?", a: "Las señales de que un pienso asienta bien incluyen: heces firmes y de tamaño normal, pelaje brillante, nivel de energía adecuado, ausencia de gases excesivos. Si ves deposiciones blandas, gases o pérdida de pelo, consulta con tu veterinario." }, { q: "¿Los piensos sin cereales son mejores?", a: "No necesariamente para todos los perros. Los piensos grain-free son beneficiosos para perros con intolerancias o alergias a cereales. Para la mayoría de perros sanos, un pienso de calidad media con cereales de calidad es perfectamente adecuado. Consulta con tu veterinario." }, { q: "¿Cuánto tiempo puede durar un saco de pienso abierto?", a: "Un saco de pienso abierto dura entre 4-6 semanas en óptimas condiciones. Guárdalo en recipiente hermético, en lugar fresco y seco. Los aceites del pienso se oxidan con el tiempo, reduciendo el valor nutricional y el sabor." }] },
  ],

  "pienso-gato-adulto-comparativa": [
    { text: "Los gatos son carnívoros obligados: su organismo está diseñado para obtener todos los nutrientes de fuentes animales. A diferencia de los perros, los gatos no pueden sintetizar ciertos aminoácidos esenciales como la taurina, que deben obtener de la dieta. Elegir bien el pienso es esencial para su salud a largo plazo." },
    { heading: "Necesidades nutricionales específicas del gato", list: ["Taurina: imprescindible, su déficit causa ceguera y problemas cardíacos", "Arginina: esencial para la eliminación de amoniaco (no puede sintetizarse)", "Vitamina A preformada: los gatos no convierten el betacaroteno en vitamina A", "Ácido araquidónico: ácido graso esencial que no pueden sintetizar", "Alta proteína animal: mínimo 30%, preferiblemente 35-40%"] },
    { heading: "Pienso seco vs. alimentación húmeda para gatos", text: "Esta es la gran pregunta. Los veterinarios especializados en nutrición felina coinciden en que la mejor opción es combinar ambos. Los gatos no sienten la sed con la misma intensidad que los perros, lo que hace que la hidratación sea un factor de riesgo para su salud urinaria." },
    { table: { headers: ["Tipo", "Ventajas", "Inconvenientes", "Hidratación"], rows: [["Pienso seco", "Económico, limpia dientes, conservación fácil", "Baja humedad (10%), riesgo urinario", "Baja"], ["Alimentación húmeda", "Alta humedad (80%), más palatabilidad", "Más costosa, debe consumirse el mismo día", "Alta"], ["Combinación", "Lo mejor de ambos mundos", "Requiere calcular raciones", "Media-alta"]] } },
    { heading: "Especial: gatos de interior vs. exterior", text: "Los gatos de interior tienen un gasto energético menor y mayor riesgo de obesidad y bolas de pelo. Existen fórmulas específicas como Royal Canin Indoor que reducen el contenido calórico y ayudan a eliminar las bolas de pelo." },
    { heading: "Los mejores piensos para gatos adultos en 2025", text: "Nuestra selección tras analizar ingredientes, aceptación por los gatos y valoraciones veterinarias:" },
    { faqs: [{ q: "¿Cuánto debe comer un gato adulto al día?", a: "Un gato adulto de talla media (4-5kg) necesita aproximadamente 60-70g de pienso seco al día, dividido en 2-3 tomas. Consulta siempre las indicaciones del fabricante y ajusta según el peso ideal de tu gato con tu veterinario." }, { q: "¿Por qué mi gato bebe tan poca agua?", a: "Los gatos tienen una sed natural baja porque evolucionaron en zonas áridas donde obtenían la mayor parte del agua de las presas. Por eso es fundamental ofrecerles alimentación húmeda o asegurar fuentes de agua frescas. Las fuentes de agua para gatos estimulan el consumo." }, { q: "¿Cuándo debo cambiar el pienso de cachorro a adulto?", a: "El pienso de cachorro debe cambiarse a adulto cuando el gato alcanza la madurez, generalmente entre los 12 y 18 meses de edad. Las razas grandes pueden tardar hasta 24 meses. Consulta con tu veterinario el momento adecuado." }, { q: "¿El pienso Hills es realmente veterinario?", a: "Hills Science Plan es una marca con respaldo científico y amplia aceptación veterinaria. Sus fórmulas están diseñadas con criterios nutricionales específicos. No es obligatorio, pero es una opción de alta calidad especialmente para gatos con necesidades específicas de salud urinaria o digestiva." }, { q: "¿Cómo introduzco un nuevo pienso sin que mi gato lo rechace?", a: "La transición debe ser gradual en 7-10 días: empieza mezclando 25% del nuevo pienso con 75% del antiguo, y aumenta progresivamente. Si el gato rechaza completamente el nuevo pienso, prueba calentarlo ligeramente (temperatura corporal) para potenciar el aroma." }] },
  ],

  "antiparasitarios-perros-guia": [
    { text: "Los parásitos externos e internos son una amenaza real para la salud de tu perro y también para la tuya y la de tu familia. Las pulgas, garrapatas y parásitos intestinales no son solo una molestia: pueden transmitir enfermedades graves. La prevención regular es la mejor estrategia." },
    { heading: "Tipos de parásitos y sus riesgos", list: ["Pulgas: causan dermatitis alérgica, anemia en cachorros y transmiten tenia", "Garrapatas: vectores de Lyme, ehrlichia y otras enfermedades graves", "Parásitos intestinales (lombrices, giardia): diarrea, pérdida de peso, riesgo zoonótico", "Sarna: altamente contagiosa, causa picor intenso y alopecia", "Filaria cardíaca (dirofilaria): mortal si no se trata, transmitida por mosquitos"] },
    { heading: "Calendario de desparasitación recomendado", text: "El calendario varía según el estilo de vida del perro, la zona geográfica y la época del año. Consulta siempre con tu veterinario para personalizar el plan de tu mascota." },
    { table: { headers: ["Tipo", "Frecuencia", "Producto más usado", "Observaciones"], rows: [["Antiparasitario externo", "Mensual (pipeta) o trimestral (collar)", "Frontline Combo, Seresto", "Todo el año en zonas cálidas"], ["Desparasitación interna", "Cada 3 meses en adultos", "Milbemax, Drontal", "Mensual en cachorros hasta 6 meses"], ["Filaria", "Mensual durante época mosquitos", "Heartgard, Nexgard Spectra", "Especialmente en zonas húmedas"]] } },
    { heading: "Frontline Combo: el más utilizado en España", text: "Frontline Combo es el antiparasitario externo de referencia en España. Su combinación de fipronil + S-metopreno elimina pulgas, garrapatas y piojos. Se aplica mensualmente en la piel entre los omóplatos." },
    { heading: "¿Pipeta, collar o comprimido?", list: ["Pipeta (ej. Frontline): cómoda, eficaz, no mojar al perro 48h tras aplicación", "Collar antiparasitario (ej. Seresto): 8 meses de protección, sin necesidad de recordar la aplicación mensual", "Comprimido (ej. Nexgard): comodidad máxima, sin restricciones de baño", "Spray: útil para tratamientos puntuales o cachorro muy pequeño"] },
    { faqs: [{ q: "¿Cuándo debo empezar a desparasitar a mi cachorro?", a: "La desparasitación interna debe comenzar a las 2 semanas de vida con el veterinario y repetirse cada 2 semanas hasta los 3 meses, luego mensualmente hasta los 6 meses, y cada 3 meses en adelante. La externa se inicia a partir de las 8 semanas de vida. Consulta con tu veterinario." }, { q: "¿Son seguros los antiparasitarios para perros con enfermedades?", a: "Algunos principios activos antiparasitarios están contraindicados en perros con ciertas enfermedades o en hembras gestantes. Consulta siempre con tu veterinario antes de aplicar cualquier antiparasitario, especialmente si tu perro tiene enfermedades previas." }, { q: "¿Frontline Combo protege también de las garrapatas?", a: "Sí. Frontline Combo mata las pulgas en 24 horas y las garrapatas en 48 horas. No previene que las garrapatas se adhieran, pero las elimina antes de que puedan transmitir enfermedades (que suele ocurrir a partir de las 24-48h de adhesión)." }, { q: "¿Puedo bañar a mi perro después de aplicar la pipeta?", a: "Debes esperar al menos 48 horas después de aplicar la pipeta antiparasitaria antes de bañar a tu perro. El baño puede reducir la eficacia del producto si se realiza demasiado pronto. Con los collares antiparasitarios, el baño ocasional es compatible." }, { q: "¿Los antiparasitarios para perros son peligrosos para los gatos?", a: "Sí, algunos antiparasitarios para perros son MORTALES para los gatos, especialmente los que contienen permetrina. Nunca apliques productos para perros en gatos ni dejes que un gato contacte con un perro recién tratado. Usa siempre productos específicos para cada especie." }] },
  ],

  "juguetes-estimulacion-mental-perros": [
    { text: "Un perro aburrido es un perro destructivo. La estimulación mental es tan importante como el ejercicio físico, especialmente para razas de trabajo como Border Collies, Labradores o German Shepherds. Los juguetes de enriquecimiento cognitivo pueden transformar el comportamiento de tu perro." },
    { heading: "¿Por qué es tan importante la estimulación mental?", list: ["Reduce comportamientos destructivos (masticar muebles, excavar)", "Alivia la ansiedad por separación", "Cansa más que el ejercicio físico en menos tiempo", "Desarrolla la capacidad de resolución de problemas", "Fortalece el vínculo perro-dueño", "Retrasa el deterioro cognitivo en perros senior"] },
    { heading: "El Kong Classic: el rey del enriquecimiento", text: "El Kong Classic es sin duda el juguete para perros más vendido y valorado del mundo. Su secreto es simple: es indestructible, versátil y se puede rellenar con infinidad de alimentos. Congélalo relleno de mantequilla de cacahuete (sin xilitol), croquetas o yogur natural para sesiones de 20-30 minutos de estimulación intensa." },
    { heading: "Ideas de relleno para el Kong", list: ["Mantequilla de cacahuete natural (SIN xilitol)", "Yogur natural sin azúcar + arándanos", "Croquetas mezcladas con caldo de pollo sin sal", "Queso fresco batido + zanahoria rallada", "Boniato cocido + pollo desmenuzado"], },
    { heading: "Otros juguetes para estimulación mental", list: ["Puzzles de nivel 1-3: cajas con compartimentos y tapas deslizantes", "Juguetes de olfato: alfombras snuffle y escondites de premios", "Juguetes de masticación duradera: huesos de nylon, cueros de vaca", "Juguetes interactivos de dispensación: el alimento sale al mover el juguete", "Arnés Ruffwear para senderismo: el ejercicio variado también estimula mentalmente"] },
    { faqs: [{ q: "¿Con qué frecuencia debo usar el Kong con mi perro?", a: "Puedes usar el Kong diariamente. Es especialmente útil cuando sales de casa para reducir la ansiedad por separación. Un Kong congelado puede entretener a un perro durante 20-30 minutos. Varía los rellenos para mantener el interés." }, { q: "¿Qué tamaño de Kong debo elegir?", a: "El tamaño correcto depende del peso del perro: XS para menos de 4kg, S para 4-9kg, M para 9-16kg, L para 16-29kg, XL para más de 30kg. Elige siempre el tamaño superior si estás en duda, ya que uno demasiado pequeño puede suponer riesgo de atragantamiento." }, { q: "¿Los puzzles para perros son adecuados para todas las razas?", a: "Sí, aunque el nivel de dificultad debe adaptarse. Las razas de trabajo (Border Collie, Malinois, Husky) necesitan puzzles de nivel 3-4. Las razas braquicéfalas (Bulldog, Pug) pueden frustrarse con puzzles muy complejos. Empieza siempre por el nivel más sencillo." }, { q: "¿A qué edad puedo empezar a dar juguetes de enriquecimiento a mi cachorro?", a: "Desde las 8 semanas puedes introducir juguetes sencillos de enriquecimiento. El Kong existe en talla cachorro. Evita rellenos muy calóricos hasta los 6 meses y nunca uses xilitol (presente en algunas mantequillas de cacahuete industriales)." }, { q: "Mi perro pierde interés rápidamente en los juguetes. ¿Qué hago?", a: "La clave es la rotación: ofrece solo 2-3 juguetes a la vez y rota cada semana. La novedad mantiene el interés. También puedes impregnar los juguetes con el olor del veterinario o de otros perros para estimular el olfato." }] },
  ],

  "higiene-dental-perros-gatos": [
    { text: "Según los estudios veterinarios, el 80% de los perros y el 70% de los gatos mayores de 3 años presentan algún grado de enfermedad periodontal. La acumulación de sarro no es solo un problema estético: puede causar dolor crónico, pérdida de dientes y bacteriemia (bacterias en sangre que afectan al corazón y riñones)." },
    { heading: "Señales de que tu mascota tiene problemas dentales", list: ["Mal aliento persistente (halitosis)", "Sarro visible (depósitos amarillos o marrones en los dientes)", "Encías rojas, inflamadas o sangrantes", "Dificultad para comer o masticar", "Babeo excesivo o babeo con sangre", "Rascado de la boca con las patas"] },
    { heading: "Cómo limpiar los dientes a tu perro paso a paso", text: "La limpieza dental es posible si la introduces gradualmente desde cachorro. Con paciencia, la mayoría de los perros llegan a tolerarla bien." },
    { list: ["Semana 1-2: toca los labios y dientes con el dedo, recompensa siempre", "Semana 3: añade pasta dental para perros (sabor pollo o menta suave)", "Semana 4: introduce el cepillo, empieza por los dientes delanteros", "Frecuencia ideal: mínimo 3 veces por semana, diario si es posible", "Nunca uses pasta de dientes para humanos: el flúor es tóxico para mascotas"] },
    { heading: "Alternativas al cepillado para gatos", text: "Los gatos suelen tolerar peor el cepillado. Existen alternativas eficaces:" },
    { list: ["Geles dentales de aplicación con el dedo (Virbac CET Oral Gel)", "Snacks dentales: Greenies, Dentastix (reducen sarro hasta 80%)", "Juguetes de cuerda que frotan los dientes al masticar", "Aditivos para el agua con enzimas antibacterianas", "Pienso de textura crujiente diseñado para reducir el sarro"] },
    { faqs: [{ q: "¿Con qué frecuencia debo limpiar los dientes de mi perro?", a: "Lo ideal es limpiarlos diariamente. Tres veces por semana es el mínimo para tener un impacto real en la prevención del sarro. Con menos frecuencia, los beneficios son limitados. Complementa con snacks dentales y juguetes de masticación." }, { q: "¿Puedo usar pasta de dientes para humanos en mi perro?", a: "No, nunca. Las pastas de dientes para humanos contienen flúor, que es tóxico para perros y gatos si se ingieren. Usa siempre pasta dental específica para mascotas, que es comestible y viene en sabores atractivos como pollo o ternera." }, { q: "¿Los Dentastix realmente sirven de algo?", a: "Sí, los estudios muestran que los snacks dentales como Dentastix reducen la formación de sarro hasta un 80% cuando se usan diariamente. No son sustitutos del cepillado, pero son un complemento eficaz, especialmente para dueños con dificultades para cepillar a su mascota." }, { q: "¿Cuándo necesita una limpieza dental profesional mi mascota?", a: "Si observas sarro visible, mal aliento persistente o signos de inflamación de encías, consulta con tu veterinario. La limpieza dental profesional se realiza bajo anestesia y es el único método para eliminar el sarro ya formado. La frecuencia varía según cada animal." }, { q: "¿A partir de qué edad debo preocuparme por la higiene dental?", a: "Desde cachorro. Los dientes de leche no necesitan limpieza, pero es el momento ideal para acostumbrar al animal al cepillado. El cambio de dientes ocurre entre los 3-7 meses. A partir de los 2 años ya puede empezar a acumularse sarro si no hay higiene preventiva." }] },
  ],

  "transportin-viaje-mascotas": [
    { text: "Viajar con tu mascota requiere un transportín adecuado. Es obligatorio para el transporte en avión, recomendable en coche (por seguridad y normativa) y esencial para el bienestar del animal durante los desplazamientos. Elegir bien el transportín puede marcar la diferencia entre un viaje estresante y uno tranquilo." },
    { heading: "Normativa para viajar con mascotas en avión", text: "Si planeas viajar en avión con tu mascota, el transportín debe cumplir la normativa IATA (International Air Transport Association). Los principales requisitos son:" },
    { list: ["El animal debe poder estar de pie, girar y tumbarse cómodamente", "El transportín debe ser rígido o semi-rígido (no solo tela)", "Ventilación en todos los laterales", "Cierre de seguridad que no pueda abrirse accidentalmente", "Mínimo 2 puntos de agua y comida accesibles desde fuera", "Etiqueta con datos del propietario y del animal"] },
    { heading: "Tipos de transportines", table: { headers: ["Tipo", "Material", "Adecuado para", "Precio medio"], rows: [["Rígido (plástico)", "Policarbonato duro", "Avión, coche, vet", "25-60€"], ["Semirígido", "Marco + tela reforzada", "Coche, transporte público", "30-70€"], ["Bolso de tela", "Tela con estructura", "Mascotas pequeñas, transporte público", "20-50€"], ["Mochila ventilada", "Tela + ventanas de malla", "Senderismo, ciudad", "40-80€"]] } },
    { heading: "Cómo habituar a tu mascota al transportín", text: "La clave para que el viaje sea tranquilo es que el transportín no sea algo asociado con el estrés del veterinario. Introdúcelo semanas antes como espacio cotidiano:" },
    { list: ["Coloca el transportín abierto en casa como lugar de descanso", "Introduce premios dentro para que tu mascota entre voluntariamente", "Progresivamente cierra la puerta por períodos cortos con el animal dentro", "Haz viajes cortos en coche antes del viaje real", "Una prenda con tu olor dentro del transportín reduce la ansiedad"] },
    { faqs: [{ q: "¿Es obligatorio el transportín en el coche?", a: "La DGT establece que los animales deben ir correctamente sujetos o separados del conductor para no interferir en la conducción. El transportín correctamente sujeto con el cinturón es una de las opciones válidas. Viajar sin sujeción puede suponer multa." }, { q: "¿Qué tamaño de transportín necesita mi gato?", a: "El transportín debe medir al menos 1,5 veces la longitud del gato (de morro a base de la cola) en longitud, y al menos la altura del gato de pie en altura. Para un gato de talla media (4-5kg), un transportín de 50x35x35cm suele ser adecuado." }, { q: "¿Puedo usar el transportín Ferplast Atlas en cabina de avión?", a: "Depende de las dimensiones del animal y de los requisitos de cada aerolínea. Las medidas máximas para cabina suelen ser 55x40x20cm y el peso total (animal + transportín) de máximo 8-10kg según la aerolínea. Consulta siempre con tu aerolínea antes de volar." }, { q: "¿Debo dar calmantes a mi mascota para viajar?", a: "Los calmantes naturales (como Zylkene o Feliway) pueden ayudar a reducir el estrés en viajes. Los ansiolíticos veterinarios requieren prescripción y solo deben usarse bajo indicación veterinaria. No administres medicamentos para humanos a tu mascota." }, { q: "¿Cuánto tiempo puede estar una mascota en un transportín?", a: "En condiciones normales, una mascota adulta sana puede estar en un transportín durante 4-6 horas sin grandes problemas si el espacio es adecuado y hay agua disponible. Para viajes más largos, programa paradas para hidratación y paseos." }] },
  ],

  "cama-ortopedica-perros-mayores": [
    { text: "Los perros mayores a partir de los 7-8 años (antes en razas grandes) experimentan cambios articulares similares a los humanos. La artrosis, la displasia de cadera y los problemas de columna son muy comunes en perros senior. Una cama ortopédica de calidad puede mejorar significativamente su calidad de vida." },
    { heading: "Señales de que tu perro necesita una cama ortopédica", list: ["Dificultad para levantarse después de dormir (rigidez matinal)", "Cojera o paso inseguro, especialmente en frío", "Evita subir escaleras o saltar que antes hacía sin problema", "Lame o muerde sus articulaciones", "Cambio de carácter o irritabilidad (señal de dolor crónico)", "Diagnosis veterinaria de artrosis, displasia o espondilosis"] },
    { heading: "¿Qué hace especial a una cama ortopédica?", text: "Una cama ortopédica de calidad tiene un relleno que distribuye el peso uniformemente, eliminando los puntos de presión en articulaciones. El material más eficaz es el memory foam (espuma viscoelástica), el mismo que se usa en colchones ortopédicos para humanos." },
    { table: { headers: ["Material", "Confort ortopédico", "Durabilidad", "Precio"], rows: [["Memory Foam", "Excelente", "Alta", "€€€"], ["Espuma HR (alta densidad)", "Bueno", "Alta", "€€"], ["Relleno de microbolas", "Moderado", "Media", "€"], ["Algodón/poliéster", "Bajo", "Media-baja", "€"]] } },
    { heading: "Consideraciones para razas grandes", text: "Los perros de razas grandes como el Labrador, Pastor Alemán, San Bernardo o Rottweiler tienen mayor predisposición a la displasia y la artrosis. Para ellos, la cama XL con bordes elevados como la Trixie Cama Ortopédica es especialmente recomendable." },
    { list: ["El tamaño importa: el perro debe poder estirarse completamente", "Los bordes elevados sirven como apoyo para la cabeza y alivian el cuello", "Base antideslizante para que el perro no resbale al levantarse", "Altura del suelo: no demasiado alta para perros con movilidad reducida", "Funda lavable para mantener higiene (los perros mayores pueden tener incontinencia)"] },
    { faqs: [{ q: "¿A qué edad debo cambiar a una cama ortopédica?", a: "Como guía general: razas pequeñas a partir de los 10-12 años, medianas desde los 8-9 años, grandes desde los 6-7 años. Si tu perro muestra señales de rigidez o dolor articular, no esperes: el cambio puede mejorar su calidad de vida inmediatamente. Consulta con tu veterinario." }, { q: "¿El memory foam retiene el calor? ¿Es malo para el verano?", a: "El memory foam puede retener algo de calor. Para el verano, existen camas ortopédicas con memory foam ventilado o funda de tejido fresco. Otra opción es combinar la cama ortopédica con una esterilla refrescante en verano." }, { q: "¿Cuánto tiempo dura una cama ortopédica de calidad?", a: "Una cama ortopédica de memory foam de calidad (como las de PetFusion o LoungeFly) puede durar 5-10 años con el mantenimiento adecuado. El memory foam de baja densidad se aplana en 1-2 años. Invierte en calidad: es más económico a largo plazo." }, { q: "¿Puedo usar una cama ortopédica para humanos para mi perro?", a: "Técnicamente sí, pero las camas ortopédicas para mascotas están diseñadas con materiales resistentes a mordiscos, impermeables y lavables. Además, tienen la altura y forma adecuadas para el acceso de un perro con movilidad reducida." }, { q: "Además de la cama, ¿qué más puedo hacer para ayudar a mi perro mayor?", a: "Además de una buena cama, consulta con tu veterinario sobre suplementos de condroitina y glucosamina, fisioterapia canina, hidroterapia y ajuste de la dieta. El ejercicio moderado regular (paseos cortos y frecuentes) es mejor que un ejercicio intenso esporádico." }] },
  ],

  "alimentacion-natural-perros-barf": [
    { text: "La dieta BARF (Biologically Appropriate Raw Food o Bones and Raw Food) es un modelo de alimentación basado en carnes crudas, huesos carnosos, vísceras y vegetales. Sus defensores argumentan que se acerca más a la dieta natural del lobo, antecesor del perro doméstico. Pero tiene tanto defensores como detractores en la comunidad veterinaria." },
    { heading: "¿Qué incluye una dieta BARF completa?", list: ["Carne muscular cruda (60-70%): pollo, pavo, ternera, conejo", "Huesos carnosos (15-20%): alitas, cuellos, carcasas de pollo", "Vísceras (10-15%): hígado, riñón, corazón", "Verduras y frutas (5-10%): zanahoria, calabacín, manzana, espinacas", "Suplementos: aceite de salmón, alga kelp, cáscara de huevo molida"] },
    { heading: "Ventajas documentadas de la dieta BARF", list: ["Mejor condición del pelaje (más brillante y suave)", "Menor producción de heces (mejor digestibilidad)", "Aliento más fresco (ausencia de almidón fermentado)", "Dientes más limpios por la masticación de huesos carnosos", "Mayor palatabilidad: los perros suelen comer con más entusiasmo"] },
    { heading: "Riesgos y consideraciones importantes", text: "La dieta BARF tiene riesgos reales que debes conocer antes de empezar. Una dieta mal formulada puede causar deficiencias nutricionales graves." },
    { list: ["Contaminación bacteriana: Salmonella, Listeria, E. coli (riesgo también para humanos)", "Desequilibrio nutricional si no está bien formulada por un nutricionista veterinario", "Huesos cocidos PROHIBIDOS: se astillan y pueden perforar el digestivo", "Parásitos en carnes no controladas: compra siempre carne de consumo humano", "No apto para perros inmunodeprimidos, cachorros muy pequeños o gestantes sin supervisión"] },
    { heading: "Alternativas intermedias para empezar", text: "Si quieres mejorar la alimentación de tu perro sin los riesgos del BARF puro, considera piensos de alta gama sin cereales como Orijen, que replican la filosofía BARF con seguridad nutricional garantizada." },
    { faqs: [{ q: "¿Es el BARF mejor que el pienso premium?", a: "No hay consenso científico. Una dieta BARF bien formulada puede ser excelente. Pero un pienso premium de calidad (como Orijen u Acana) garantiza el equilibrio nutricional sin los riesgos de la dieta cruda. Consulta con un veterinario nutricionista antes de decidir." }, { q: "¿Puedo combinar BARF con pienso en la misma comida?", a: "No es recomendable mezclar ambos en la misma toma, ya que tienen velocidades de digestión diferentes. Puedes alternar: pienso por la mañana y BARF por la noche, con al menos 6-8 horas de separación." }, { q: "¿Cómo empiezo la transición a BARF?", a: "Empieza con una única fuente proteica (pollo), ofrece pequeñas cantidades al principio y observa la tolerancia digestiva. La transición completa puede llevar 2-4 semanas. Introduce cada nuevo ingrediente de forma individual para identificar posibles intolerancias." }, { q: "¿El BARF funciona para todos los perros?", a: "La mayoría de perros adultos sanos toleran bien el BARF. Es especialmente beneficioso para perros con alergias alimentarias a ingredientes de pienso. Sin embargo, no es adecuado sin supervisión para cachorros en crecimiento, gestantes, lactantes o perros con enfermedades renales o hepáticas." }, { q: "¿Cuánto cuesta alimentar a un perro con BARF?", a: "El coste varía enormemente según el tamaño del perro y los ingredientes. Para un perro de 25kg, el coste oscila entre 60-120€ mensuales. Es comparable o superior a un pienso premium, pero algunos propietarios lo compensan con la reducción de visitas veterinarias por problemas digestivos." }] },
  ],
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = articleContent[slug] ?? [];
  const relatedProducts = post.relatedProducts.map((s) => getProductBySlug(s)).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "CuidaTuMascota.es" },
    publisher: { "@type": "Organization", name: "CuidaTuMascota.es", url: "https://www.cuidatumascota.es" },
  };

  const faqItems = content.flatMap((s) => s.faqs ?? []);
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <nav className="text-gray-400 text-sm mb-6">
          <Link href="/" className="hover:text-cyan-700">Inicio</Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-cyan-700">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700 line-clamp-1">{post.title}</span>
        </nav>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-wide">{post.category}</span>
          {post.isHealth && <span className="text-sm">🩺</span>}
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3 leading-tight">{post.title}</h1>
        <p className="text-gray-500 text-lg mb-4">{post.excerpt}</p>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
          <span>📅 {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span>⏱ {post.readTime} min de lectura</span>
        </div>

        {post.isHealth && <VetDisclaimer />}
        <AffiliateDisclosure />

        <div className="space-y-6">
          {content.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-xl font-extrabold text-gray-900 mt-8 mb-3">{section.heading}</h2>
              )}
              {section.text && <p className="text-gray-700 leading-relaxed">{section.text}</p>}
              {section.list && (
                <ul className="space-y-2 mt-3">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex gap-2 text-gray-700">
                      <span className="text-cyan-500 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="overflow-x-auto mt-4 mb-4">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-cyan-50">
                        {section.table.headers.map((h) => (
                          <th key={h} className="text-left px-3 py-2 border border-cyan-100 font-bold text-gray-800">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-3 py-2 border border-gray-100 text-gray-700">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.faqs && (
                <div className="mt-8 space-y-4">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-4">Preguntas frecuentes</h2>
                  {section.faqs.map((faq, fi) => (
                    <div key={fi} className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Productos recomendados en este artículo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProducts.map((p) => p && <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
