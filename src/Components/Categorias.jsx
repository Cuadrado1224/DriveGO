import React, { useState } from 'react';
import '../Styles/Categorias.css';

const Categorias = ({ selectedCategories, onCategoryChange, selectedBrands, onBrandChange, minPrice, maxPrice, onPriceChange }) => {
  const [categorias, setCategorias] = useState([
    { label: 'ECONOMICO', checked: false },
    { label: '4X4', checked: false },
    { label: 'VEHICULO DE LUJO', checked: false },
    { label: 'FURGONETAS O VANS', checked: false },
    { label: 'DEPORTIVOS', checked: false },
    { label: 'FAMILIAR', checked: false },
  ]);

  const [brands, setBrands] = useState([
    { label: 'Toyota', checked: false },
    { label: 'Honda', checked: false },
    { label: 'Ford', checked: false },
    { label: 'Chevrolet', checked: false },
    { label: 'BMW', checked: false },
    { label: 'Mercedes-Benz', checked: false },
  ]);

  const handleCategoryChange = (index) => {
    const updatedCategorias = categorias.map((categoria, i) =>
      i === index ? { ...categoria, checked: !categoria.checked } : categoria
    );
    setCategorias(updatedCategorias);
    onCategoryChange(updatedCategorias);
  };

  const handleBrandChange = (index) => {
    const updatedBrands = brands.map((brand, i) =>
      i === index ? { ...brand, checked: !brand.checked } : brand
    );
    setBrands(updatedBrands);
    onBrandChange(updatedBrands);
  };

  const handlePriceChange = (min, max) => {
    onPriceChange(min, max);
  };

  return (
    <aside className="categorias-sidebar">
      <div className="categorias-container">
        <h2>CATEGORIAS</h2>
        <div className="categorias-list">
          {categorias.map((categoria, index) => (
            <div key={index} className="categoria-item">
              <span>{categoria.label}</span>
              <input
                type="checkbox"
                checked={categoria.checked}
                onChange={() => handleCategoryChange(index)}
              />
            </div>
          ))}
        </div>
        <h2>MARCAS</h2>
        <div className="categorias-list">
          {brands.map((brand, index) => (
            <div key={index} className="categoria-item">
              <span>{brand.label}</span>
              <input
                type="checkbox"
                checked={brand.checked}
                onChange={() => handleBrandChange(index)}
              />
            </div>
          ))}
        </div>
        <h2>PRECIO</h2>
        <div className="precio-slider">
          <input
            type="range"
            min="25"
            max="250"
            value={minPrice}
            onChange={(e) => handlePriceChange(e.target.value, maxPrice)}
          />
          <input
            type="range"
            min="25"
            max="250"
            value={maxPrice}
            onChange={(e) => handlePriceChange(minPrice, e.target.value)}
          />
          <div>
            <span>Mín: {minPrice}</span>
            <span>Máx: {maxPrice}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Categorias;