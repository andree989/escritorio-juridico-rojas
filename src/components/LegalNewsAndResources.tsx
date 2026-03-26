import "../styles.css";
import { FaNewspaper, FaGavel, FaBook, FaFileAlt, FaUserTie, FaBriefcase } from "react-icons/fa";

const LegalNewsAndResources = () => {
  console.log("LegalNewsAndResources component loaded");
  return (
    <section className="legal-news-resources-section">
      <h2 className="section-title">Noticias Jurídicas y Recursos</h2>
      <div className="combined-grid">
        <div className="combined-item">
          <FaNewspaper className="icon" />
          <h3 className="combined-title">Nueva Ley de Protección de Datos</h3>
          <p>Se ha aprobado una nueva ley que regula el uso de datos personales en Venezuela.</p>
          <a href="https://ciberseguridadvenezuela.com/leyes-proteccion-datos-venezuela/" target="_blank" rel="noopener noreferrer">
            Leer más
          </a>
        </div>
        <div className="combined-item">
          <FaGavel className="icon" />
          <h3 className="combined-title">Cambios en el Código Penal</h3>
          <p>Reformas importantes en el Código Penal entrarán en vigor el próximo mes.</p>
          <a href="#">Leer más</a>
        </div>
        <div className="combined-item">
          <FaBook className="icon" />
          <h3 className="combined-title">Derechos Laborales en 2026</h3>
          <p>Conoce los nuevos derechos laborales que benefician a los trabajadores.</p>
          <a href="#">Leer más</a>
        </div>
        <div className="combined-item">
          <FaFileAlt className="icon" />
          <h3 className="combined-title">Guía de Contratos</h3>
          <p>Aprende a redactar contratos legales con esta guía práctica.</p>
          <a href="#">Leer más</a>
        </div>
        <div className="combined-item">
          <FaUserTie className="icon" />
          <h3 className="combined-title">Derecho Penal Básico</h3>
          <p>Conceptos fundamentales del derecho penal para estudiantes.</p>
          <a href="#">Leer más</a>
        </div>
        <div className="combined-item">
          <FaBriefcase className="icon" />
          <h3 className="combined-title">Plantillas de Documentos Legales</h3>
          <p>Descarga plantillas útiles para tus casos legales.</p>
          <a href="#">Leer más</a>
        </div>
      </div>
    </section>
  );
};

export default LegalNewsAndResources;