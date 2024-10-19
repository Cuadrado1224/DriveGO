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
        nombre_usuario, 
        contrasena,
      });

      if (response.data.success) {
        alert("Inicio de sesión exitoso");
        alert(response.data.rol);
        console.log(response.data.message);
        closeModal(); 
      } else {
        alert(response.data.message); 
      }
    } catch (error) {
      console.error("Error al conectar con el backend", error);
      alert("Hubo un problema al conectar con el servidor"); 
    }
  };

  return (
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
            <Link to="/register" onClick={closeModal}>Registrate</Link> {/* Agregado el onClick */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;