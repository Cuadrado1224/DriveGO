import React from "react";
import "../Styles/Modal_User.css";

const ModalUser = ({ closeModal, onLogout, onHistory, onChangePassword }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
        <h3>Opciones de Usuario</h3>
        <ul className="modal-options">
          <li>
            <button onClick={onHistory}>Historial</button>
          </li>
          <li>
            <button onClick={onChangePassword}>Cambiar Contraseña</button>
          </li>
          <li>
            <button onClick={onLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalUser;
