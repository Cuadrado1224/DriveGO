import React, { useEffect, useState } from "react";
import "../Styles/Gestion_vehiculos.css";
import ModalGes from "../Pages_Admin/Registro_veh_adm";
const Gestion_vehiculos = () => {
  const [veh, setVeh] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleSessionClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleDeleteClick=(vehi)=>{
  if (window.confirm("¿Estás seguro de que deseas eliminar este vehiculo?")) {
    fetch("http://localhost/Api-DriverGo/Borrar_vehiculo.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mat_veh: vehi.mat_veh }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
        
          setVeh((prevUsers) => 
            prevUsers.filter((vehi) => vehi.mat_veh !== vehi)
          );
          alert(data.message);
          window.location.reload(); 
        } else {
          console.error("Error al eliminar:", data.message);
          alert("Error al eliminar el vehiculo");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar el vehiculo");
      });
  }

};

  useEffect(() => {
    fetch("http://localhost/Api-DriverGo/Ver_vehiculos.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          console.log("Vehículos recibidos:", data.veh);
          setVeh(data.veh);
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching vehiculos:", error));
  }, []);
  return (
    <div className="card_veh">
      <div className="car-head">
        <h2 className="car-tit">Gestión de vehiculos</h2>
        <button className="btn-ag" onClick={handleSessionClick}>
          <i className="fa-solid fa-plus"></i>Nuevo Vehiculo
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
              <th className="tab-head">Matricula</th>
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
                    <button className="btn-acti">
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button className="btn-acti"
                    onClick={()=>handleDeleteClick(vehi)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <ModalGes closeModal={closeModal} />}
    </div>
  );
};

export default Gestion_vehiculos;
