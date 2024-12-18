import React from "react";
import "../Styles/Info_veh.css";

const Info_veh = ({ vehiculo, onClose }) => {
  if (!vehiculo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          {vehiculo.mar_veh} {vehiculo.mod_veh}
        </h2>
        <div className="modal-info">
          <p>
            <strong>Tipo de Vehículo:</strong> {vehiculo.tip_veh}
          </p>
          <p>
            <strong>Transmisión:</strong> {vehiculo.tip_trans_veh}
          </p>
          <p>
            <strong>Combustible:</strong> {vehiculo.combustible}
          </p>
          <p>
            <strong>Número de ocupantes:</strong> {vehiculo.num_ocu_veh} personas
          </p>
          <p>
            <strong>Precio:</strong> ${vehiculo.precio_veh} / día
          </p>
        </div>
        <div className="modal-buttons">
          <button className="alquilar-button">ALQUILAR</button>
          <button className="close-button" onClick={onClose}>
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info_veh;
