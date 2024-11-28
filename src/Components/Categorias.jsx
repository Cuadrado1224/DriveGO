
import React, { useState } from 'react';
import '../Styles/Categorias.css';

const Categorias = ({ selectedCategories, onCategoryChange }) => {
  const [categorias, setCategorias] = useState([
    { label: 'ECONOMICO', checked: false },
    { label: '4X4', checked: false },
    { label: 'VEHICULO DE LUJO', checked: false },
    { label: 'FURGONETAS O VANS', checked: false },
    { label: 'DEPORTIVOS', checked: false },
    { label: 'FAMILIAR', checked: false },
  ]);

  const handleCategoryChange = (index) => {
    const updatedCategorias = categorias.map((categoria, i) =>
      i === index ? { ...categoria, checked: !categoria.checked } : categoria
    );
    setCategorias(updatedCategorias);
    onCategoryChange(updatedCategorias);
  };

  return (
    <div className="categorias-container">
      <h2>CATEGORIAS</h2>
      <div className="categorias-list">
        {categorias.map((categoria, index) => (
          <div key={index} className="categoria-item">
            <input
              type="checkbox"
              checked={categoria.checked}
              onChange={() => handleCategoryChange(index)}
            />
            <span>{categoria.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;