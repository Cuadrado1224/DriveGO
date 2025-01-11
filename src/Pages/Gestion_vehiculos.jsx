import React, { useEffect, useState } from "react";
import "../Styles/Gestion_vehiculos.css";
import ModalGes from "../Pages_Admin/Registro_veh_adm";
import ModalEdi from "../Pages_Admin/Edit_veh_adm";
import { BACK_URL } from "../config.js";

const GestionVehiculos = () => {
  const [veh, setVeh] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSessionClick = () => {
    setIsEditMode(false); 
    setSelectedVehicle(null); 
    setShowModal(true); 
  };

  const handleEditClick = (matricula) => {
    const vehicle = veh.find((vehi) => vehi.mat_veh === matricula); 
    if (vehicle) {
      setSelectedVehicle(vehicle); 
      setIsEditMode(true); 
      setShowModal(true); 
    } else {
      console.error("Vehículo no encontrado con matrícula:", matricula);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeleteClick = (vehi) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      fetch(BACK_URL+"/Borrar_vehiculo.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mat_veh: vehi.mat_veh }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setVeh((prevVeh) => prevVeh.filter((item) => item.mat_veh !== vehi.mat_veh)); 
            alert(data.message); 
          } else {
            console.error("Error al eliminar:", data.message);
            alert("Error al eliminar el vehículo.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error al eliminar el vehículo.");
        });
    }
  };

  useEffect(() => {
    fetch(BACK_URL+"/Api_DriverGo/Ver_vehiculos.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          console.log("Vehículos recibidos:", data.veh);
          setVeh(data.veh); 
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch((error) => console.error("Error al cargar los vehículos:", error));
  }, []);

  return (
    <div className="card_veh">
      <div className="car-head">
        <h2 className="car-tit">Gestión de vehículos</h2>
        <button className="btn-ag" onClick={handleSessionClick}>
          <i className="fa-solid fa-plus"></i> Nuevo Vehículo
        </button>
      </div>

      <div className="car-cont">
        <table className="tab-cont">
          <thead>
            <tr>
              <th className="tab-head">Marca</th>
              <th className="tab-head">Modelo</th>
              <th className="tab-head">Año</th>
              <th className="tab-head">Tipo</th>
              <th className="tab-head">Matrícula</th>
              <th className="tab-head">Estado</th>
              <th className="tab-head">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {veh.map((vehi) => (
              <tr key={vehi.mat_veh}>
                <td className="tab-cell">{vehi.mar_veh}</td>
                <td className="tab-cell">{vehi.mod_veh}</td>
                <td className="tab-cell">{vehi.anio_veh}</td>
                <td className="tab-cell">{vehi.tip_veh}</td>
                <td className="tab-cell">{vehi.mat_veh}</td>
                <td className="tab-cell">{vehi.est_veh}</td>
                <td className="table-cell">
                  <div className="btn-activs">
                    <button
                      className="btn-acti"
                      onClick={() => handleEditClick(vehi.mat_veh)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-acti"
                      onClick={() => handleDeleteClick(vehi)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        isEditMode ? (
          <ModalEdi closeModal={closeModal} vehiculoId={selectedVehicle?.mat_veh} />
        ) : (
          <ModalGes closeModal={closeModal} />
        )
      )}
    </div>
  );
};

export default GestionVehiculos;

