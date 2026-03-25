import { FaBook } from 'react-icons/fa';

const Resources = () => {
  const resources = [
    {
      title: 'Guía de Contratos',
      description: 'Aprende a redactar contratos legales con esta guía práctica.',
      image: 'img/contracts-guide.jpg',
      link: '#',
    },
    {
      title: 'Derecho Penal Básico',
      description: 'Conceptos fundamentales del derecho penal para estudiantes.',
      image: 'img/basic-penal-law.jpg',
      link: '#',
    },
    {
      title: 'Plantillas de Documentos Legales',
      description: 'Descarga plantillas útiles para tus casos legales.',
      image: 'img/legal-templates.jpg',
      link: '#',
    },
  ];

  return (
    <section className="resources-section">
      <div className="section-header">
        <FaBook className="section-icon" />
        <h2 className="section-title">Recursos para Estudiantes y Abogados</h2>
      </div>
      <p className="section-description">Encuentra herramientas y guías útiles para tu desarrollo profesional en el ámbito legal.</p>
      <div className="resources-grid">
        {resources.map((item, index) => (
          <div key={index} className="resource-item">
            <div className="resource-image-container">
              <img src={item.image} alt={item.title} className="resource-image" />
            </div>
            <h3 className="resource-title">{item.title}</h3>
            <p className="resource-description">{item.description}</p>
            <a href={item.link} className="resource-link">Leer más</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resources;