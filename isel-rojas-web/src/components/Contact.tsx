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
    <section id="contacto" className="section">
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Contacto</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="border p-2"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="border p-2"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mensaje"
            className="border p-2"
            required
          />
          <button className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Enviando…" : "Enviar"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-green-300">¡Mensaje enviado! Te responderemos pronto.</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-300">Ocurrió un error: {error}</p>
        )}

        {user && (
          <p className="mt-2 text-sm text-gray-400">
            Enviando como <strong>{user.email}</strong> (ID: <code>{user.id}</code>)
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;
