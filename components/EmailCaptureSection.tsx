"use client";
import { useState } from "react";

export default function EmailCaptureSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Ha ocurrido un error. Inténtalo de nuevo.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Error de conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="bg-green-900 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-white mb-2">¡Ya casi está!</h3>
          <p className="text-white/70 text-base">
            Te hemos enviado un email de confirmación. Revisa tu bandeja (y el spam, por si acaso).
            Recibirás tu descarga en breve.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-green-900 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div>
            <div className="text-5xl mb-5">🐾</div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-300 mb-2">
              Descarga gratuita
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
              ¿Acabas de adoptar una mascota?
            </h2>
            <p className="text-xl font-semibold text-emerald-300 mb-4">
              Guía gratuita: Los 30 primeros días con tu animal
            </p>
            <p className="text-white/70 text-base mb-6">
              Todo lo que nadie te cuenta: alimentación, veterinario, socialización, primeras noches y señales de alerta. El mejor comienzo para una vida juntos.
            </p>
            <p className="text-white/40 text-sm">⭐ +3.100 familias ya la descargaron</p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/15">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/75 text-sm font-medium mb-1.5">
                  Tu nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="¿Cómo te llamas?"
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-white/75 text-sm font-medium mb-1.5">
                  Tu email <span className="text-white/50">(obligatorio)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm"
                />
              </div>
              {status === "error" && (
                <p className="text-red-300 text-sm">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-sm disabled:opacity-60"
              >
                {status === "loading" ? "Enviando…" : "Enviarme la guía gratis →"}
              </button>
              <p className="text-white/35 text-xs text-center leading-relaxed">
                Sin spam. Solo contenido útil relacionado con el blog.
                Puedes darte de baja en cualquier momento.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
