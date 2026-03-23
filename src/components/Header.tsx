import React, { useState } from "react";
import type { User } from "@supabase/supabase-js";

// Header component (navegación + auth)
// - Cambia los enlaces aquí si agregas nuevas secciones.
// - Usa las clases CSS de `index.css` para personalizar estilo y responsividad.
interface HeaderProps {
  user: User | null; // Información del usuario autenticado
  isLoading: boolean; // Indica si la autenticación está en proceso
  onSignOut: () => Promise<void>; // Función para cerrar sesión
  onSendMagicLink: (email: string) => Promise<void>; // Función para enviar un enlace mágico al email
}

const Header: React.FC<HeaderProps> = ({ user, isLoading, onSignOut, onSendMagicLink }) => {
  // Estado para mostrar u ocultar el formulario de inicio de sesión
  const [showLogin, setShowLogin] = useState(false);

  // Estado para almacenar el email ingresado por el usuario
  const [email, setEmail] = useState("");

  // Estado para mostrar mensajes de éxito o error
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Estado para controlar si el menú de navegación está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);

  // Maneja el envío del formulario de inicio de sesión
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

  // Abre el menú de navegación al posicionar el cursor sobre el botón de hamburguesa
  const handleMouseEnter = () => {
    setMenuOpen(true);
  };

  // Cierra el menú de navegación al mover el cursor fuera del botón o menú
  const handleMouseLeave = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        {/* Botón de menú de hamburguesa */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <span className="logo-title">Rojas</span>
        <span className="logo-subtitle">& Asociados</span>
      </div>

      <div className="auth">
        {user ? (
          <>
            {/* Muestra el email del usuario autenticado y un botón para cerrar sesión */}
            <span className="auth-user">{user.email}</span>
            <button className="btn btn-secondary" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </>
        ) : null}
      </div>

      {/* Menú de navegación */}
      <nav
        className={`nav-links nav-right ${menuOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
};

export default Header;
