import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import axios from "axios";
import Registro from "./Registro_de_sesion";
import Recuperar from "../Components/Recuperar_cont";
import CambiarContraseña from "./CambiarContraseña";
import let_logo from "/Public/drive.png";

const Login = ({ closeModal }) => {
  const [nombre_usuario, setUsername] = useState("");
  const [contrasena, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost/Api-DriverGo/login.php",
        {
          nombre_usuario,
          contrasena,
        }
      );

      if (response.data.status === true) {
        console.log(response.data);
        if (response.data.redirect === "si") {
          console.log("si abre");
          toggleChangePasswordModal();
        } else if (response.data.rol === "Cliente") {
          closeModal();
        } else if (response.data.rol === "Administrador") {
          console.log("Inicio de sesión como Administrador");
          closeModal();
          navigate("/administrador");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el backend", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const toggleChangePasswordModal = () => {
    setShowChangePasswordModal(!showChangePasswordModal);
  };

  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <a href="/" className="let">
            <img src={let_logo} alt="Logo" />
          </a>
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={nombre_usuario}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="cont" onClick={toggleForgotPasswordModal}>
            ¿Olvidaste la contraseña?
          </i>
          <div className="button-container">
            <button className="btn-in" onClick={handleLogin}>
              Iniciar Sesión
            </button>
            <div className="reg" onClick={toggleRegisterModal}>
              ¿No tienes cuenta? <span className="reg-link">Regístrate</span>
            </div>
          </div>
        </div>
      </div>
      {showForgotPasswordModal && (
        <Recuperar closeModal={toggleForgotPasswordModal} />
      )}
      {showRegisterModal && <Registro closeModal={toggleRegisterModal} />}
      {showChangePasswordModal && (
        <CambiarContraseña closeModal={toggleChangePasswordModal} />
      )}
    </>
  );
};

export default Login;
