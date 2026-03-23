import React from "react";

// Sección Servicios
// - Cambia el contenido dentro de `items` para ajustar los servicios mostrados.
// - El carrusel es horizontal y se adapta en móviles gracias al scroll nativo.
const Carousel: React.FC = () => {
  const items = ["Mercantil", "Civil", "Laboral"];

  return (
    <div className="flex overflow-x-auto gap-4 p-4">
      {items.map((item, i) => (
        <div key={i} className="min-w-[200px] bg-white shadow p-4">
          <h3 className="font-bold">{item}</h3>
          <p>Asesoría especializada en {item}</p>
        </div>
      ))}
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="servicios" className="section">
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Servicios</h2>
        <Carousel />
      </div>
    </section>
  );
};

export default Services;
