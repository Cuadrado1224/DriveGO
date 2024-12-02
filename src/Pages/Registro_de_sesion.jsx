import React, { useState, useEffect } from "react";
import "../Styles/Registro_de_sesion.css";
import axios from "axios";
import { validarEntrada, validarCadena } from "../Controles/Controles";
import let_logo from "/Public/drive.png";

const Registro = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [nom_usu, setNom_usu] = useState("");
  const [cor_usu, setCor_usu] = useState("");
  const [cont1_usu, setCont1_usu] = useState("");
  const [cont2_usu, setCont2_usu] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!validarCadena(nom_usu, 3, 15)) {
      setError("El nombre de usuario debe contener entre 3 y 15 caracteres.");
      return;
    }
    if (!validarEntrada(nom_usu)) {
      setError("El nombre de usuario debe contener solo letras y numeros.");
      return;
    }
    if (!validarCadena(cont1_usu, 3, 15)) {
      setError("La contraseña debe contener entre 3 y 15 caracteres. ");
    }
    if (cont1_usu !== cont2_usu) {
      setError("Las contraseñas deben ser iguales");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost/Api-DriverGo/Crear_Usuario.php",
        {
          nom_usu,
          cont2_usu,
          cor_usu,
        }
      );

      if (response.data.status === true) {
        alert("Usuario registrado con exito");
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
    <>
      <div className="register">
        <div className="modal-reg">
          <div className="modal-cont">
            <span className="close-button-reg" onClick={closeModal}>
              &times;
            </span>
            <a href="/" className="let">
              <img src={let_logo} alt="Logo " />
            </a>
            <h2>Registrarse</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type="text"
              placeholder="Ingrese usuario"
              value={nom_usu}
              onChange={(e) => setNom_usu(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ingrese su correo"
              value={cor_usu}
              onChange={(e) => setCor_usu(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ingrese su contraseña"
              value={cont1_usu}
              onChange={(e) => setCont1_usu(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ingrese nuevamente su contraseña"
              value={cont2_usu}
              onChange={(e) => setCont2_usu(e.target.value)}
            />
            <button className="btn_reg_ses" onClick={handleLogin}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registro;
