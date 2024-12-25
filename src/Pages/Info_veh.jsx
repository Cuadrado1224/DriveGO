import React, { useState, useEffect } from "react";
import "../Styles/Info_veh.css";
import ModalLogin from "./Login";
import ModalReserva from "./Reserva_mod";

const Info_veh = ({ vehiculo, onClose }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const handleReservar = () => {
    if (!userInfo) {
      setShowLoginModal(true);
    } else {
      setShowReservaModal(true);
    }
  };

  const closeLoginModal = () => setShowLoginModal(false);
  const closeReservaModal = () => setShowReservaModal(false);

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
          <button className="alquilar-button" onClick={handleReservar}>
            RESERVAR
          </button>
          <button className="close-button" onClick={onClose}>
            CERRAR
          </button>
        </div>
      </div>

      {showLoginModal && <ModalLogin closeModal={closeLoginModal} />}
      {showReservaModal && (
        <ModalReserva
          vehiculo={vehiculo}
          userInfo={userInfo}
          onClose={closeReservaModal}
        />
      )}
    </div>
  );
};

export default Info_veh;
