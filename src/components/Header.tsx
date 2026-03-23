import React, { useState } from "react";
import type { User } from "@supabase/supabase-js";

// Header component (navegación + auth)
// - Cambia los enlaces aquí si agregas nuevas secciones.
// - Usa las clases CSS de `index.css` para personalizar estilo y responsividad.
interface HeaderProps {
  user: User | null; // Información del usuario autenticado
  onSignOut: () => Promise<void>; // Función para cerrar sesión
}

const Header: React.FC<HeaderProps> = ({ user, onSignOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
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
            <span className="auth-user">{user.email}</span>
            <button className="btn btn-secondary" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </>
        ) : null}
      </div>

      <nav
        className={`nav-links nav-right ${menuOpen ? "open" : ""}`}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
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
