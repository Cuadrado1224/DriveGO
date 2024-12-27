import React, { useEffect, useState } from "react";
import "../Styles/Registro_veh_adm.css";
import axios from "axios";

const Editar_veh_adm = ({ closeModal, vehiculoId }) => {
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
  const [chasis, setChasis] = useState("");
  const [comb_veh, setComb_veh] = useState("");
  const [img_veh, setImg_veh] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!vehiculoId) {
      setError("ID del vehículo no especificado.");
      return;
    }

    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/ProyectoMDS/DGv2.0/DriveGo/Api_DriverGo/Editar_veh.php?id=${vehiculoId}`
        );
        const data = response.data;
        if (data.error) {
          setError(data.error);
        } else {
          setMar_veh(data.MAR_VEH || "");
          setMod_veh(data.MOD_VEH || "No se pudo cargar");
          setTip_veh(data.TIP_VEH || "");
          setAnio_veh(data.ANIO_VEH || "");
          setMat_veh(data.MAT_VEH || "");
          setEst_veh(data.EST_VEH || "");
          setTip_trans_veh(data.TIP_TRANS_VEH || "");
          setKil_veh(data.KIL_VEH || "");
          setNum_ocu_veh(data.NUM_OCU_VEH || "");
          setNum_pue_veh(data.NUM_PUE_VEH || "");
          setChasis(data.CHASIS || "");
          setComb_veh(data.COMBUSTIBLE || "");
          setImg_veh(data.IMG_VEH || null);
        }
      } catch (err) {
        setError("Error al cargar los datos del vehículo.");
      }
    };

    fetchVehicleData();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [vehiculoId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Por favor, selecciona un archivo de imagen válido.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg_veh(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditVehi = async () => {
    if (
      !mar_veh ||
      !mod_veh ||
      !tip_veh ||
      !anio_veh ||
      !mat_veh ||
      !est_veh ||
      !kil_veh
    ) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("id", vehiculoId);
    formData.append("mar_veh", mar_veh);
    formData.append("mod_veh", mod_veh);
    formData.append("tip_veh", tip_veh);
    formData.append("anio_veh", anio_veh);
    formData.append("mat_veh", mat_veh);
    formData.append("est_veh", est_veh);
    formData.append("tip_trans_veh", tip_trans_veh);
    formData.append("kil_veh", kil_veh);
    formData.append("num_ocu_veh", num_ocu_veh);
    formData.append("num_pue_veh", num_pue_veh);
    formData.append("comb_veh", comb_veh);
    formData.append("chasis", chasis);
    if (img_veh) formData.append("img_veh", img_veh);

    try {
      const response = await axios.post(
        "http://localhost/ProyectoMDS/DGv2.0/DriveGo/Api_DriverGo/Editar_veh.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el vehículo.");
    }
  };

  const generarAnios = () => {
    const anios = [];
    const anioActual = new Date().getFullYear();
    for (let i = anioActual; i >= 2010; i--) {
      anios.push(i);
    }
    return anios;
  };

  return (
    <div className="reg_veh">
      <div className="modal-veh">
        <div className="modal-cont-veh">
          <span className="close-button-reg" onClick={closeModal}>
            &times;
          </span>
          <h2>Editar Vehículo</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="group-input">
            <div className="conten-input">
              <label>Marca</label>
              <select
                value={mar_veh || ""}
                onChange={(e) => setMar_veh(e.target.value)}
              >
                <option value="">Seleccione marca</option>
                <option value="BMW">BMW</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Ford">Ford</option>
                <option value="Toyota">Toyota</option>
              </select>
            </div>

            <div className="conten-input">
              <label>Modelo</label>
              <input
                type="text"
                placeholder="Modelo del vehículo"
                value={mod_veh || ""}
                onChange={(e) => setMod_veh(e.target.value)}
              />
            </div>

            <div className="conten-input">
              <label>Tipo</label>
              <select
                value={tip_veh || ""}
                onChange={(e) => setTip_veh(e.target.value)}
              >
                <option value="">Seleccione tipo</option>
                <option value="4x4">4x4</option>
                <option value="Sedán">Sedán</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div className="conten-input">
              <label>Año</label>
              <select
                value={anio_veh || ""}
                onChange={(e) => setAnio_veh(e.target.value)}
              >
                <option value="">Seleccione año</option>
                {generarAnios().map((anio) => (
                  <option key={anio} value={anio}>
                    {anio}
                  </option>
                ))}
              </select>
            </div>

            <div className="conten-input">
              <label>Matrícula</label>
              <input
                type="text"
                placeholder="Matrícula del vehículo"
                value={mat_veh || ""}
                onChange={(e) => setMat_veh(e.target.value)}
              />
            </div>

            <div className="conten-input">
              <label>Estado</label>
              <select
                value={est_veh || ""}
                onChange={(e) => setEst_veh(e.target.value)}
              >
                <option value="">Seleccione estado</option>
                <option value="Disponible">Disponible</option>
                <option value="Alquilado">Alquilado</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Fuera de servicio">Fuera de servicio</option>
              </select>
            </div>

            <div className="conten-input">
              <label>Transmisión</label>
              <select
                value={tip_trans_veh || ""}
                onChange={(e) => setTip_trans_veh(e.target.value)}
              >
                <option value="">Seleccione transmisión</option>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
              </select>
            </div>

            <div className="conten-input">
              <label>Kilometraje</label>
              <input
                type="text"
                placeholder="Kilometraje del vehículo"
                value={kil_veh || ""}
                onChange={(e) => setKil_veh(e.target.value)}
              />
            </div>

            <div className="conten-input">
              <label>Ocupantes</label>
              <input
                placeholder="Número de ocupantes"
                value={num_ocu_veh || ""}
                onChange={(e) => setNum_ocu_veh(e.target.value)}
              />
            </div>

            <div className="conten-input">
              <label>Numero de puertas</label>
              <select
                value={num_pue_veh || ""}
                onChange={(e) => setNum_pue_veh(e.target.value)}
              >
                <option value="">Numero de puertas</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="conten-input">
              <label>Combustible</label>
              <select
                value={comb_veh || ""}
                onChange={(e) => setComb_veh(e.target.value)}
              >
                <option value="">Seleccione combustible</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            <div className="conten-input">
              <label>Chasis</label>
              <input
                type="text"
                placeholder="Número de chasis"
                value={chasis || ""}
                onChange={(e) => setChasis(e.target.value)}
              />
            </div>

            <div className="conten-input">
              <label className="label-imagen">Seleccionar Imagen</label>
              <input
                type="file"
                id="input-imagen"
                className="input-imagen"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="input-imagen">Subir Imagen</label>
              {img_veh && (
                <div className="vista-previa">
                  <img
                    src={img_veh}
                    alt="Vista previa"
                    className="imagen-previa"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="button-group">
            <button className="btn_can" onClick={handleEditVehi}>
              Editar vehículo
            </button>
            <button className="btn_can" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editar_veh_adm;
