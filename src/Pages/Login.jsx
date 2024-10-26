<<<<<<< HEAD:src/Pantallas/Inicio_de_sesion.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Estilos/Inicio_de_sesion.css";
import axios from "axios";
import Registro from "./Registro_de_sesion";
import let_logo from "/Public/drive.png";

const Inicio_de_sesion = ({ closeModal }) => {
  const [nombre_usuario, setUsername] = useState("");
  const [contrasena, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
        if (response.data.rol === "Cliente") {
          closeModal();
        } else if (response.data.rol === "Adminr@gmail.com") {
          console.log("Inicio de sesión como Administrador");
          closeModal();
          navigate("/administrador");
        }
=======
import React, { useState,useEffect } from "react";
import "../Styles/Login.css";
import { Link} from "react-router-dom";
import axios from 'axios';

const Login = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:81/drivego-main/api/controllers/login.php", {
        username, // Usa username
      password, 
      });

      if (response.data.success) {
        alert("Inicio de sesión exitoso");
        alert(response.data.rol);
        console.log(response.data.message);
        closeModal(); 
>>>>>>> 521ca2cc1a70e065c2491136c3095911ba985e7c:src/Pages/Login.jsx
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

  return (
<<<<<<< HEAD:src/Pantallas/Inicio_de_sesion.jsx
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <a href="/" className="let">
            <img src={let_logo} alt="Logo " />
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
          <div className="button-reg">
            <button className="btn-in" onClick={handleLogin}>
              Iniciar Sesión
            </button>
            <button className="btn-reg" onClick={toggleRegisterModal}>
              Regístrate
            </button>
          </div>
=======
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Iniciar Sesión</button>
       
        <div className="toRegister">
          <span>
            ¿Aún no tienes una cuenta? 
            <Link to="/register" onClick={closeModal}>Registrate</Link> 
          </span>
>>>>>>> 521ca2cc1a70e065c2491136c3095911ba985e7c:src/Pages/Login.jsx
        </div>
      </div>
      {showRegisterModal && <Registro closeModal={toggleRegisterModal} />}
    </>
  );
};

<<<<<<< HEAD:src/Pantallas/Inicio_de_sesion.jsx
export default Inicio_de_sesion;
=======
export default Login;
>>>>>>> 521ca2cc1a70e065c2491136c3095911ba985e7c:src/Pages/Login.jsx
