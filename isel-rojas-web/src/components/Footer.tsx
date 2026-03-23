import React from "react";

// Pie de página
// - Cambia este texto para actualizar información legal o derechos de autor.
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">© {new Date().getFullYear()} Isel Rojas & Asociados</div>
    </footer>
  );
};

export default Footer;
