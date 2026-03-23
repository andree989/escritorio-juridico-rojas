import React from "react";

const values = [
  { icon: "🎯", title: "Orientados a resultados", desc: "Cada caso es único. Diseñamos estrategias legales concretas con un objetivo claro: ganar." },
  { icon: "🤝", title: "Trato personalizado", desc: "Conocemos a cada cliente por su nombre. Tu situación merece atención individual, no respuestas genéricas." },
  { icon: "🔒", title: "Confidencialidad total", desc: "La información que compartes con nosotros es completamente privada. Siempre." },
  { icon: "📅", title: "Disponibilidad", desc: "Respondemos con agilidad. Los problemas legales no esperan, y nosotros tampoco." },
];

const About: React.FC = () => {
  return (
    <section id="nosotros" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="section-label">Quiénes somos</p>
            <h2 className="section-title">Más de 15 años<br />defendiendo tus derechos</h2>
            <p className="about-body">
              En <strong> Rojas & Asociados</strong> combinamos experiencia, rigor jurídico
              y compromiso humano. Nuestro equipo de abogados especializados trabaja con una sola
              meta: proteger tus intereses con la mayor eficacia posible.
            </p>
            <p className="about-body">
              Desde nuestra fundación hemos acompañado a cientos de empresas y personas naturales
              en Venezuela, construyendo relaciones duraderas basadas en la confianza.
            </p>
            <a className="cta" href="#contacto">Habla con nosotros</a>
          </div>
          <div className="about-values">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <div>
                  <h4 className="value-title">{v.title}</h4>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
