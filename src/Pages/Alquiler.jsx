import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Alquiler.css";
import Categorias from "../Components/Categorias";

const Alquiler = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [filteredVehiculos, setFilteredVehiculos] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost/Api-DriverGo/mostrar_veh.php"
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
    if (selectedCategories.length > 0) {
      const filtered = vehiculos.filter((vehiculo) =>
        selectedCategories.includes(vehiculo.tip_veh.toUpperCase())
      );
      setFilteredVehiculos(filtered);
    } else {
      setFilteredVehiculos(vehiculos);
    }
  }, [selectedCategories, vehiculos]);

  const handleCategoryChange = (updatedCategories) => {
    const selected = updatedCategories
      .filter((categoria) => categoria.checked)
      .map((categoria) => categoria.label.toUpperCase());
    setSelectedCategories(selected);
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
      <Categorias onCategoryChange={handleCategoryChange} />

      <div className="vehiculos-container">
        {filteredVehiculos.length === 0 ? (
          <p>No hay vehículos disponibles</p>
        ) : (
          filteredVehiculos.map((vehiculo, index) => (
            <div key={index} className="vehiculo-card">
              <div className="imagen-container">
                <img
                  src={`http://localhost/Api-DriverGo/${vehiculo.img_veh}`}
                  alt={`${vehiculo.mar_veh} ${vehiculo.mod_veh}`}
                  className="vehiculo-image"
                  style={{
                    width: "300px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "/Public/Img_default.jpg";
                  }}
                />
              </div>
              <div className="vehiculo-info">
                <h3>
                  {vehiculo.mar_veh} {vehiculo.mod_veh}
                </h3>
                <p>Tipo: {vehiculo.tip_veh}</p>
                <div className="vehiculo-details">
                  <p>Matrícula: {vehiculo.mat_veh}</p>
                </div>
                <div className="buton">
                  <button className="vehiculo-button">MAS INFORMACIÓN</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alquiler;
