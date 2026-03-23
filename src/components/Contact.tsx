import React, { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface ContactProps {
  user: User | null;
}

// Sección Contacto
// - Envía datos a Supabase (tabla `contacts`).
// - Si estás logueado, se guarda además user_id.
const Contact: React.FC<ContactProps> = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const payload = {
      name,
      email,
      message,
      user_id: user?.id || null,
    };

    const { error: insertError } = await supabase.from("contacts").insert([payload]);

    if (insertError) {
      setError(insertError.message);
      setStatus("error");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contacto" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <p className="section-label">Estamos aquí</p>
            <h2 className="section-title">¿Necesitas asesoría legal?</h2>
            <p className="contact-body">
              Cuéntanos tu situación. Nuestro equipo revisará tu caso y te responderá
              en menos de 24 horas con una orientación inicial sin costo.
            </p>
            <ul className="contact-details">
              <li>📍 Valencia, Venezuela</li>
              <li>📞 +58 (212) 000-0000</li>
              <li>✉️ contacto@rojasyasociados.com</li>
              <li>🕐 Lun – Vie: 8:00 am – 6:00 pm</li>
            </ul>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <label className="form-label">
              Nombre completo
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. María González"
                required
              />
            </label>
            <label className="form-label">
              Correo electrónico
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                type="email"
                required
              />
            </label>
            <label className="form-label">
              ¿En qué podemos ayudarte?
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe brevemente tu situación legal…"
                rows={4}
                required
              />
            </label>
            <button className="btn btn-primary" disabled={status === "loading"}>
              {status === "loading" ? "Enviando…" : "Enviar consulta"}
            </button>
            {status === "success" && (
              <p className="form-success">✅ ¡Mensaje recibido! Te responderemos pronto.</p>
            )}
            {status === "error" && (
              <p className="form-error">❌ Ocurrió un error: {error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
