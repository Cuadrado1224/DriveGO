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
        <div className="imagen-contain">
                <img
                  src={`http://localhost/DriveGo/Api_DriverGo/${vehiculo.img_veh}`}
                  alt={`${vehiculo.mar_veh} ${vehiculo.mod_veh}`}
                  className="vehiculo-img"
                  style={{
                    width: "420px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "/Public/Img_default.jpg";
                  }}
                />
              </div>
        <div className="modal-info">
          <p>
          <i className="fa-solid fa-car-side"> <strong>Tipo : {vehiculo.tip_veh}</strong>
          </i>
             
          </p>
          <p>
          <i className="fa-solid fa-calendar"> <strong>Año : {vehiculo.anio_veh}</strong> 
          </i>
          </p>
          <p>
          <i className="fa-solid fa-gear"><strong> Transmisión: {vehiculo.tip_trans_veh}</strong> 
          </i>
          </p>
          <p>
          <i className="fa-solid fa-gas-pump"> <strong>Combustible: {vehiculo.combustible}</strong> 
          </i>
          </p>
          <p>
          <i className="fa-solid fa-user"><strong>Capacidad:{vehiculo.num_ocu_veh} personas</strong> 
          </i>
          </p>
          <p>
          <i className="fa-solid fa-car-side"><strong> Puertas: {vehiculo.num_pue_veh} puertas</strong> 
          </i>
          </p>
          <p>
          <i className="fa-solid fa-dollar-sign"><strong> Tarifa: {vehiculo.precio_veh} / día</strong> 
          </i>
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
