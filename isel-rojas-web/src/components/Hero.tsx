import React from "react";

// Hero section (portada)
// - Cambia el título o el texto para actualizar el mensaje principal.
// - El fondo se controla desde `src/index.css` (clase .hero).
// - El botón de llamada a la acción navega automáticamente a la sección de contacto.
const Hero: React.FC = () => {
  return (
    <section id="inicio" className="section hero">
      <div className="container">
        <h2 className="text-3xl font-bold">Defensa legal con excelencia</h2>
        <p className="mt-4">
          Asesoría integral para empresas y particulares, con enfoque en resultados y confianza.
        </p>
        <div className="hero-actions">
          <button className="cta" onClick={() => (window.location.hash = "#contacto")}>Contáctanos</button>
          <a className="cta-outline" href="#servicios">
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
