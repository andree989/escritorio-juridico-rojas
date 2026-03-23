import React from "react";

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="section hero">
      <div className="container">
        <span className="hero-badge">Escritorio Jurídico</span>
        <h1 className="hero-title">Defensa legal con<br /><em>excelencia</em></h1>
        <p className="hero-subtitle">
          Asesoría integral para empresas y particulares.<br />
          Resultados concretos, trato personalizado.
        </p>
        <div className="hero-actions">
          <button className="cta" onClick={() => (window.location.hash = "#contacto")}>
            Contáctanos ahora
          </button>
          <a className="cta-outline" href="#servicios">
            Ver servicios →
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>+15</strong><span>años de experiencia</span>
          </div>
          <div className="hero-stat">
            <strong>+500</strong><span>casos resueltos</span>
          </div>
          <div className="hero-stat">
            <strong>3</strong><span>áreas de práctica</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
