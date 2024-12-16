import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Alquiler.css";
import Categorias from "../Components/Categorias";

const Alquiler = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [filteredVehiculos, setFilteredVehiculos] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(25);
  const [maxPrice, setMaxPrice] = useState(250);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost/DriveGo/Api_DriverGo/mostrar_veh.php"
        );
        if (response.data.status) {
          setVehiculos(response.data.data);
          setFilteredVehiculos(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error al cargar los vehículos:", err);
        setError(
          "Error al cargar los vehículos. Por favor, intente nuevamente."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  useEffect(() => {
    let filtered = vehiculos;

    // Filtrar por categoría
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((vehiculo) =>
        selectedCategories.includes(vehiculo.tip_veh.toUpperCase())
      );
    }

    // Filtrar por marca
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((vehiculo) =>
        selectedBrands.includes(vehiculo.mar_veh.toUpperCase())
      );
    }

    // Filtrar por rango de precios
    filtered = filtered.filter(
      (vehiculo) =>
        vehiculo.precio_veh >= minPrice && vehiculo.precio_veh <= maxPrice
    );

    setFilteredVehiculos(filtered);
  }, [selectedCategories, selectedBrands, minPrice, maxPrice, vehiculos]);

  const handleCategoryChange = (updatedCategories) => {
    const selected = updatedCategories
      .filter((categoria) => categoria.checked)
      .map((categoria) => categoria.label.toUpperCase());
    setSelectedCategories(selected);
  };

  const handleBrandChange = (updatedBrands) => {
    const selected = updatedBrands
      .filter((brand) => brand.checked)
      .map((brand) => brand.label.toUpperCase());
    setSelectedBrands(selected);
  };

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Cargando vehículos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="alquiler-container">
      <Categorias
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
        onPriceChange={handlePriceChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      <div className="vehiculos-container">
        {filteredVehiculos.length === 0 ? (
          <p>No hay vehículos disponibles</p>
        ) : (
          filteredVehiculos.map((vehiculo, index) => (
            <div key={index} className="vehiculo-card">
              {/* El resto del código para mostrar los vehículos */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alquiler;