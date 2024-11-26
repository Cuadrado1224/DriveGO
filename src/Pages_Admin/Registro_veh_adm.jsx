import React, { useEffect, useState } from "react";
import "../Styles/Registro_veh_adm.css";
import axios from "axios";

const Registro_veh_adm = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [mar_veh, setMar_veh] = useState("");
  const [mod_veh, setMod_veh] = useState("");
  const [tip_veh, setTip_veh] = useState("");
  const [anio_veh, setAnio_veh] = useState("");
  const [mat_veh, setMat_veh] = useState("");
  const [est_veh, setEst_veh] = useState("");
  const [tip_trans_veh, setTip_trans_veh] = useState("");
  const [kil_veh, setKil_veh] = useState("");
  const [num_ocu_veh, setNum_ocu_veh] = useState("");
  const [num_pue_veh, setNum_pue_veh] = useState("");
  const [img_veh,setImg_veh]=useState("");
  const [error, setError] = useState("");
  return (
    <div className="reg_veh">
      <div className="modal-veh">
        <div className="modal-cont-veh">
          <span className="close-button-reg" onClick={closeModal}>
            &times;
          </span>
          <h2>Nuevo vehículo</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="group-input">
            <div className="conten-input">
              <label>Marca</label>
              <input
                type="text"
                placeholder="Nombre del vehiculo"
                value={mar_veh}
                onChange={(e) => setMar_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Modelo</label>
              <input
                type="text"
                placeholder="Modelo del vehiculo"
                value={mod_veh}
                onChange={(e) => setMod_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Tipo de vehiculo</label>
              <select
                value={tip_veh}
                onChange={(e) => setTip_veh(e.target.value)}
              >
                <option value="">Seleccione tipo</option>
                <option value="4x4">4x4</option>
                <option value="familiar">Familiar</option>
              </select>
            </div>
            <div className="conten-input">
              <label>Año</label>
              <input
                type="text"
                placeholder="Año del vehiculo"
                value={anio_veh}
                onChange={(e) => setAnio_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Matricula</label>
              <input
                type="text"
                placeholder="Matricula del vehiculo"
                value={mat_veh}
                onChange={(e) => setMat_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Estado del vehiculo</label>
              <select
                value={est_veh}
                onChange={(e) => setEst_veh(e.target.value)}
              >
                <option value="">Seleccione el estado</option>
                <option value="Alquilado">Alquilado</option>
                <option value="Matenimiento">Mantenimiento</option>
                <option value="Fuera">Fuera de servicio</option>
              </select>
            </div>
            <div className="conten-input">
              <label>Transmisión del vehiculo</label>
              <select
                value={tip_trans_veh}
                onChange={(e) => setTip_trans_veh(e.target.value)}
              >
                <option value=""> Tipo de transmisión</option>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
              </select>
            </div>
            <div className="conten-input">
              <label>Kilometraje</label>
              <input
                type="text"
                placeholder="Kilometraje del vehiculo"
                value={kil_veh}
                onChange={(e) => setKil_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Ocupantes</label>
              <input
                type="text"
                placeholder="Numero de ocupantes"
                value={num_ocu_veh}
                onChange={(e) => setNum_ocu_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Numero de puertas</label>
              <input
                type="text"
                placeholder="Numero de puertas del vehiculos"
                value={num_pue_veh}
                onChange={(e) => setNum_pue_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Imagen del vehículo</label>
              <input
                type="file"
                placeholder="Ingrese la imagen del vehiculo"
                value={img_veh}
                onChange={(e) => setImg_veh(e.target.value)}
              />
            </div>
          </div>
          <div className="button-group">
          <button className="btn_gua" >Guardar Vehiculo</button>
            <button className="btn_can" onClick={closeModal}>Cancelar</button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro_veh_adm;
