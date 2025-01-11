import React, { useState, useEffect } from "react";
import { BACK_URL } from "../config.js";
import "../Styles/Devolucion.css";

const Devolucion = () => {
  const [reservas, setReservas] = useState([]);
  const [idReserva, setIdReserva] = useState("");
  const [estadoVehiculo, setEstadoVehiculo] = useState("");
  const [descripcionDevolucion, setDescripcionDevolucion] = useState("");
  const [tarifaAdicional, setTarifaAdicional] = useState(0); 
  const [tarifaAdicionalVisible, setTarifaAdicionalVisible] = useState(false); 

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch(BACK_URL+"/getReservas.php");
        const data = await response.json();
        if (data.success) {
          setReservas(data.data);
        } else {
          alert("Error al cargar las reservas.");
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!estadoVehiculo || !descripcionDevolucion) {
      alert("Por favor, complete todos los campos");
      return;
    }
  
    const data = {
      idReserva,
      estadoVehiculo,
      descripcionDevolucion,
      tarifaAdicional: tarifaAdicionalVisible ? tarifaAdicional : 0, 
    };
  
    try {
      const response = await fetch(BACK_URL+"/devolucion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
  
      const result = await response.json();
  
      if (result.success) {
        alert(result.success || "Devolución registrada exitosamente.");
  
        const fetchReservas = async () => {
          try {
            const response = await fetch(BACK_URL+"/getReservas.php");
            const data = await response.json();
            if (data.success) {
              setReservas(data.data);
            } else {
              alert("Error al cargar las reservas.");
            }
          } catch (error) {
            console.error("Error al obtener las reservas:", error);
          }
        };
  
        fetchReservas();
  
        setIdReserva("");
        setEstadoVehiculo("");
        setDescripcionDevolucion("");
        setTarifaAdicional(0);
        setTarifaAdicionalVisible(false);
  
      } else {
        alert(result.error || "Error al registrar la devolución.");
      }
    } catch (error) {
      console.error("Error en la devolución", error);
      alert("Error en la devolución");
    }
  };

  return (
    <div>
      <h2>Registrar Devolución</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reserva:</label>
          <select
            value={idReserva}
            onChange={(e) => setIdReserva(e.target.value)}
            required
          >
            <option value="" disabled>Seleccione una reserva</option>
            {reservas.map((reserva) => (
              <option key={reserva.id_res} value={reserva.id_res}>
                {reserva.ced_usu_res} - {reserva.nom_usu_res} - {reserva.mar_veh} {reserva.mod_veh}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Estado del Vehículo:</label>
          <select
            value={estadoVehiculo}
            onChange={(e) => setEstadoVehiculo(e.target.value)}
            required
            style={{ color: estadoVehiculo === "" ? "gray" : "black" }}
          >
            <option value="" disabled style={{ color: "gray" }}>Seleccione una opción</option>
            <option value="NUEVO">NUEVO</option>
            <option value="DESCOMPUESTO">DESCOMPUESTO</option>
          </select>
        </div>
        <div>
          <label>Descripción de la Devolución:</label>
          <textarea
            value={descripcionDevolucion}
            onChange={(e) => setDescripcionDevolucion(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>¿Agregar Tarifa Adicional?</label>
          <input
            type="checkbox"
            checked={tarifaAdicionalVisible}
            onChange={() => setTarifaAdicionalVisible(!tarifaAdicionalVisible)}
          />
        </div>
        {tarifaAdicionalVisible && (
          <div>
            <label>Tarifa Adicional:</label>
            <input
              type="number"
              step="0.01"
              value={tarifaAdicional}
              onChange={(e) => setTarifaAdicional(parseFloat(e.target.value))}
              required
              min="0"
            />
          </div>
        )}
        <button type="submit">Registrar Devolución</button>
      </form>
    </div>
  );
};

export default Devolucion;