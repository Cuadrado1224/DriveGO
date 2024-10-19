import React, { useState,useEffect } from "react";
import "../Estilos/Inicio_de_sesion.css";
import axios from 'axios';

const Inicio_de_sesion = ({ closeModal }) => {
  const [nombre_usuario, setUsername] = useState("");
  const [contrasena, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost/Api-DriverGo/login.php", {
        nombre_usuario,
        contrasena,
      });

      if (response.data.status === "success") {
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
          value={nombre_usuario}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Iniciar Sesión</button>
       
      </div>
    </div>
  );
};

export default Inicio_de_sesion;