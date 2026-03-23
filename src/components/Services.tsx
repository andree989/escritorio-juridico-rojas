import React from "react";

const services = [
  {
    icon: "⚖️",
    title: "Derecho Mercantil",
    desc: "Constitución de empresas, contratos comerciales, fusiones y adquisiciones. Protección legal para tu negocio en cada etapa.",
  },
  {
    icon: "🏛️",
    title: "Derecho Civil",
    desc: "Contratos, sucesiones, bienes inmuebles y responsabilidad civil. Soluciones claras para situaciones complejas.",
  },
  {
    icon: "👷",
    title: "Derecho Laboral",
    desc: "Relaciones laborales, despidos, contratos y litigios. Defensa efectiva tanto para empleados como empleadores.",
  },
  {
    icon: "🏢",
    title: "Derecho Corporativo",
    desc: "Gobierno corporativo, cumplimiento normativo y reestructuraciones. Tu empresa en manos expertas.",
  },
  {
    icon: "📋",
    title: "Consultoría Legal",
    desc: "Análisis preventivo, revisión de contratos y asesoría continua. Evita problemas antes de que ocurran.",
  },
  {
    icon: "🛡️",
    title: "Litigios & Arbitraje",
    desc: "Representación en tribunales y procesos arbitrales. Estrategia sólida orientada al resultado.",
  },
];

const Services: React.FC = () => {
  return (
    <section id="servicios" className="section services-section">
      <div className="container">
        <p className="section-label">Lo que hacemos</p>
        <h2 className="section-title">Áreas de práctica</h2>
        <p className="section-subtitle">
          Cobertura legal integral con especialistas en cada área del derecho.
        </p>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.title} className="service-card">
              <span className="service-icon">{s.icon}</span>
              <h3 className="service-name">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
