import React, { useState } from "react";
import type { User } from "@supabase/supabase-js";

// Header component (navegación + auth)
// - Cambia los enlaces aquí si agregas nuevas secciones.
// - Usa las clases CSS de `index.css` para personalizar estilo y responsividad.
interface HeaderProps {
  user: User | null;
  isLoading: boolean;
  onSignOut: () => Promise<void>;
  onSendMagicLink: (email: string) => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ user, isLoading, onSignOut, onSendMagicLink }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError("Ingrese un email válido.");
      return;
    }

    try {
      await onSendMagicLink(email);
      setMessage("Revisá tu email: ya te enviamos un enlace mágico para iniciar sesión.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("No se pudo iniciar sesión. Intentá de nuevo.");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-title">Rojas</span>
        <span className="logo-subtitle">& Asociados</span>
      </div>

      <nav className="nav-links">
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <div className="auth">
        {user ? (
          <>
            <span className="auth-user">{user.email}</span>
            <button className="btn btn-secondary" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowLogin((v) => !v)}
              disabled={isLoading}
            >
              {isLoading ? "Cargando…" : "Iniciar sesión"}
            </button>
            {showLogin && (
              <form className="auth-form" onSubmit={handleSubmit}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  className="auth-input"
                />
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? "Enviando…" : "Enviar enlace"}
                </button>
                {message && <p className="auth-info">{message}</p>}
                {error && <p className="auth-error">{error}</p>}
              </form>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
