"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams({
      subject: `Contacto CuidaTuMascota: ${data.get("asunto") as string}`,
      body: `Nombre: ${data.get("nombre") as string}\nEmail: ${data.get("email") as string}\n\nMensaje:\n${data.get("mensaje") as string}`,
    });
    window.location.href = `mailto:info@mktweb360.com?${params.toString()}`;
    setSubmitted(true);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-gray-400 text-sm mb-6">
        <Link href="/" className="hover:text-cyan-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Contacto</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contacto</h1>
      <p className="text-gray-500 mb-8">¿Tienes preguntas sobre un producto o el cuidado de tu mascota? Escríbenos.</p>

      {submitted ? (
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 text-center">
          <div className="text-3xl mb-3">✓</div>
          <h2 className="font-bold text-cyan-800 text-lg mb-2">¡Mensaje enviado!</h2>
          <p className="text-cyan-700 text-sm">Tu cliente de correo se ha abierto. Te responderemos por email desde info@mktweb360.com.</p>
          <Link href="/" className="mt-4 inline-block text-cyan-700 font-semibold text-sm">← Volver al inicio</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
            <input type="text" id="nombre" name="nombre" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Tu nombre" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
            <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="tu@email.com" />
          </div>
          <div>
            <label htmlFor="asunto" className="block text-sm font-semibold text-gray-700 mb-1">Asunto *</label>
            <select id="asunto" name="asunto" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white">
              <option value="">Selecciona un asunto</option>
              <option value="Consulta sobre producto">Consulta sobre un producto</option>
              <option value="Duda sobre una guía">Duda sobre una guía o un análisis</option>
              <option value="Error en el sitio">Error en el sitio web</option>
              <option value="Colaboración">Colaboración o publicidad</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-1">Mensaje *</label>
            <textarea id="mensaje" name="mensaje" required rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" placeholder="Escribe tu mensaje..." />
          </div>
          <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-3 text-xs text-cyan-800">
            🩺 Para consultas médicas sobre tu mascota, contacta siempre directamente con tu veterinario.
          </div>
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Enviar mensaje
          </button>
          <p className="text-xs text-gray-400 text-center">Se abrirá tu cliente de correo para enviar a <strong>info@mktweb360.com</strong></p>
        </form>
      )}
      <section className="mt-12 space-y-8 text-gray-700 text-sm leading-relaxed">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">Para qué puedes escribirnos</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Dudas sobre una guía o un análisis:</strong> si algo de un artículo del <Link href="/blog" className="text-cyan-700 hover:underline">blog</Link> no queda claro o quieres que ampliemos un tema, cuéntanos qué parte y en qué artículo.</li>
            <li><strong>Sugerencias de productos:</strong> si echas en falta un producto o una categoría en la <Link href="/tienda" className="text-cyan-700 hover:underline">tienda</Link>, dinos cuál y para qué mascota lo usarías.</li>
            <li><strong>Errores detectados:</strong> un dato desactualizado, un enlace que no funciona o un producto que ya no se vende en Amazon.es. Indícanos la página para revisarla.</li>
            <li><strong>Colaboraciones o publicidad:</strong> propuestas relacionadas con el cuidado de perros y gatos.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">Lo que no hacemos</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>No vendemos directamente.</strong> CuidaTuMascota.es no tiene tienda propia: los productos que analizamos se compran en Amazon.es, que gestiona el pago, el envío, las devoluciones y la garantía. Para cualquier incidencia con un pedido, contacta con Amazon.</li>
            <li><strong>No respondemos consultas veterinarias.</strong> No somos veterinarios y no podemos diagnosticar ni recomendar tratamientos para un caso concreto. Si tu perro o tu gato tiene síntomas, acude a tu veterinario o, si es urgente, a un servicio de urgencias veterinarias.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">Cómo elegimos y actualizamos los productos</h2>
          <p>Antes de recomendar un producto comparamos ingredientes, composición, certificaciones y fuentes veterinarias, y revisamos que siga disponible en Amazon.es; cuando deja de venderse, lo marcamos como no disponible. No aceptamos pagos por recomendar productos. Te lo explicamos con detalle en <Link href="/sobre-nosotros" className="text-cyan-700 hover:underline">Sobre nosotros</Link>.</p>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">Quién está detrás</h2>
          <p>CuidaTuMascota.es es un proyecto de <strong>Mkt Web 360 SLU</strong> (CIF B87679304). Puedes escribirnos directamente a <strong>info@mktweb360.com</strong>. Los datos que nos envíes se tratan según la <Link href="/politica-de-privacidad" className="text-cyan-700 hover:underline">política de privacidad</Link>; el resto de datos del titular están en el <Link href="/aviso-legal" className="text-cyan-700 hover:underline">aviso legal</Link>.</p>
        </div>
      </section>
    </div>
  );
}
