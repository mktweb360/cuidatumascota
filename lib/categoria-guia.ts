// Criterios de elección por categoría (11/11/2026). Texto editorial propio, sin precios, valoraciones ni
// cifras sin fuente. En salud y alimentación se remite al veterinario: este sitio no sustituye su criterio.

export interface CategoriaGuia {
  /** Criterios para elegir: título y un párrafo. */
  criterios: { titulo: string; texto: string }[];
  /** Comprobaciones breves antes de comprar. */
  antesDeComprar: string[];
  /** Preguntas propias de la categoría (se suman a las de la ficha). */
  faq: { q: string; a: string }[];
}

export const CATEGORIA_GUIA: Record<string, CategoriaGuia> = {
  "alimentacion-perros": {
    criterios: [
      { titulo: "Ajusta el pienso a la etapa y al tamaño", texto: "Cachorro, adulto y senior tienen necesidades distintas, y el tamaño de la raza condiciona tanto el tamaño de la croqueta como el aporte de energía. Elige una fórmula pensada para la etapa y el rango de peso de tu perro, no la más cara por defecto." },
      { titulo: "Lee la composición, no solo el envase", texto: "La lista de ingredientes va ordenada de mayor a menor peso. Comprueba cuál es la fuente de proteína principal y si el fabricante indica el porcentaje de proteína y grasa en el análisis garantizado." },
      { titulo: "Cambia de pienso de forma gradual", texto: "Un cambio brusco suele provocar molestias digestivas. La pauta habitual es mezclar el pienso nuevo con el antiguo durante una semana o más, aumentando la proporción poco a poco." },
    ],
    antesDeComprar: ["Peso adulto aproximado y edad de tu perro", "Si tiene alergias, intolerancias o una dieta pautada por el veterinario", "Tamaño de croqueta y formato del saco que vas a consumir antes de que caduque", "Compara el precio por kilo, no el precio del saco"],
    faq: [{ q: "¿Un pienso sin cereales es mejor para mi perro?", a: "No necesariamente. Sin cereales no equivale a mejor: lo importante es que la fórmula sea completa y equilibrada para su etapa. Si dudas por una alergia o intolerancia, consúltalo con tu veterinario antes de cambiar." }],
  },
  "alimentacion-gatos": {
    criterios: [
      { titulo: "Su estilo de vida marca la fórmula", texto: "Un gato de interior, uno esterilizado o uno con mucha actividad no gastan lo mismo. Las fórmulas específicas ajustan calorías y fibra; elige la que corresponda a su situación real." },
      { titulo: "Pienso y comida húmeda cumplen funciones distintas", texto: "El pienso es cómodo y fácil de dosificar; la comida húmeda aporta más agua, algo relevante en gatos que beben poco. Muchas familias combinan ambas." },
      { titulo: "Dosifica según el peso, no según el apetito", texto: "Los gatos de interior ganan peso con facilidad. Sigue la tabla de raciones del envase como punto de partida y ajústala con el veterinario si tu gato sube o baja de peso." },
    ],
    antesDeComprar: ["Edad y si está esterilizado", "Si vive solo en interior o tiene acceso al exterior", "Que tenga siempre agua fresca disponible, con independencia del tipo de comida", "Consulta al veterinario si hay problemas urinarios o digestivos"],
    faq: [{ q: "¿Cada cuánto debo revisar la ración de mi gato?", a: "Cuando cambie su peso, su actividad o su situación (esterilización, cambio de casa). Un control periódico del peso en la clínica veterinaria ayuda a ajustar la ración." }],
  },
  "accesorios-perros": {
    criterios: [
      { titulo: "Mide antes de comprar", texto: "En arneses y collares la talla depende del contorno de pecho y cuello, no del peso ni de la raza. Mide a tu perro con una cinta y compara con la tabla del fabricante." },
      { titulo: "Diseño según el uso", texto: "Un arnés de paseo diario, uno antitirones o un juguete rellenable resuelven problemas distintos. Define primero qué quieres conseguir: comodidad, control en el paseo o entretenimiento." },
      { titulo: "Materiales y mantenimiento", texto: "Comprueba que el producto se pueda lavar y que las hebillas y costuras sean robustas. En juguetes, el material debe ser acorde a la fuerza de mordida de tu perro." },
    ],
    antesDeComprar: ["Contorno de cuello y pecho medidos", "Tamaño y fuerza de tu perro frente a la talla indicada", "Si necesitas reflectantes para paseos con poca luz", "Cómo se lava y qué dice el fabricante sobre su uso"],
    faq: [{ q: "¿Un arnés antitirones sustituye al adiestramiento?", a: "No. Puede ayudar a reducir los tirones, pero el hábito se corrige con constancia y refuerzo positivo. Si el problema es serio, conviene consultar a un educador canino." }],
  },
  "accesorios-gatos": {
    criterios: [
      { titulo: "Pensado para el comportamiento natural", texto: "Los gatos arañan, trepan y observan desde la altura. Un rascador estable o una fuente que mantenga agua en movimiento responden a conductas naturales, no a un capricho." },
      { titulo: "Estabilidad y espacio disponible", texto: "Un árbol rascador debe quedar firme y caber en el sitio donde lo vayas a poner; si se tambalea, el gato dejará de usarlo. Revisa medidas y peso máximo indicados." },
      { titulo: "Limpieza", texto: "En fuentes de agua, el mantenimiento es clave: filtros, bomba y depósito necesitan limpieza regular. Mira cómo se desmonta y cada cuánto hay que cambiar el filtro." },
    ],
    antesDeComprar: ["Medidas del hueco donde lo colocarás", "Edad y tamaño del gato", "Frecuencia de limpieza y coste de recambios", "Ruido de funcionamiento si es una fuente eléctrica"],
    faq: [{ q: "¿Mi gato usará el producto que compre?", a: "No se puede garantizar: cada gato tiene sus preferencias. Introduce el accesorio poco a poco, colócalo en una zona que ya frecuente y no lo fuerces." }],
  },
  "salud-higiene": {
    criterios: [
      { titulo: "Especie y peso: no son intercambiables", texto: "Un antiparasitario para perros puede ser peligroso para un gato. Usa siempre el producto indicado para la especie y el rango de peso de tu mascota, y lee el prospecto completo." },
      { titulo: "Qué parásitos cubre", texto: "No todos los productos actúan sobre pulgas, garrapatas y otros parásitos a la vez. Comprueba en la ficha del fabricante qué cubre y cada cuánto se aplica." },
      { titulo: "El veterinario decide el plan", texto: "La pauta de desparasitación depende de la zona, el estilo de vida y la salud del animal. Consúltala con tu veterinario antes de empezar o cambiar de producto." },
    ],
    antesDeComprar: ["Especie y peso exactos de tu mascota", "Edad mínima indicada por el fabricante", "Si convive con otros animales o con niños pequeños", "Dudas con tu veterinario antes de aplicarlo"],
    faq: [{ q: "¿Puedo usar el mismo producto para mi perro y mi gato?", a: "No debes hacerlo sin confirmarlo. Muchos productos son específicos de una especie y pueden ser tóxicos para la otra. Usa solo el indicado y consulta con el veterinario." }],
  },
  "camas-transportines": {
    criterios: [
      { titulo: "Tamaño según cómo duerme", texto: "Mide a tu mascota tumbada y estirada. Una cama demasiado justa resulta incómoda; una demasiado grande puede restar sensación de refugio, sobre todo en animales tímidos." },
      { titulo: "Soporte y estructura", texto: "En perros grandes, mayores o con molestias articulares, el grosor y el tipo de espuma importan. En gatos, los bordes altos o la forma de cueva dan sensación de protección." },
      { titulo: "Funda lavable", texto: "Las camas acumulan pelo y olores. Busca fundas extraíbles que se puedan lavar a máquina y comprueba las instrucciones de temperatura." },
    ],
    antesDeComprar: ["Medidas de tu mascota tumbada", "Si prefiere dormir enroscada, estirada o con apoyo para la cabeza", "Funda desenfundable y lavable", "Base antideslizante si el suelo es liso"],
    faq: [{ q: "¿Cómo sé si la cama es adecuada para un perro mayor?", a: "Busca buen soporte y bordes que no obliguen a saltar. Si tu perro tiene molestias articulares, consulta con el veterinario qué tipo de apoyo necesita." }],
  },
};
