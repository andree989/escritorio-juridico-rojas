import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo-title">Rojas & Asociados</span>
            <p className="footer-tagline">Asesoría jurídica de excelencia desde 2008.</p>
          </div>
          <div className="footer-links">
            <p className="footer-heading">Navegación</p>
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div className="footer-links">
            <p className="footer-heading">Áreas</p>
            <span>Derecho Mercantil</span>
            <span>Derecho Civil</span>
            <span>Derecho Laboral</span>
            <span>Litigios & Arbitraje</span>
          </div>
          <div className="footer-links">
            <p className="footer-heading">Contacto</p>
            <span>📍 Valencia, Venezuela</span>
            <span>📞 +58 (212) 000-0000</span>
            <span className="email">
              <span role="img" aria-label="email">
                ✉️
              </span>
              <span>contacto@rojasyasociados.com</span>
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Rojas & Asociados. Todos los derechos reservados.</p>
          <p className="footer-legal">Este sitio no constituye asesoría legal. Contáctenos para orientación personalizada.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
