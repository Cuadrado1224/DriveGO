import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Reserva.css";

registerLocale("es", es);

const Reserva = () => {
  const [cedulaUsuario, setCedulaUsuario] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [matriculaVehiculo, setMatriculaVehiculo] = useState("");
  const [vehiculos, setVehiculos] = useState([]); // Lista de vehículos
  const [fechaReserva, setFechaReserva] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");

  const manejoFecha = new Date();

  // Cargar los vehículos desde el backend
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch("http://localhost/DriveGo/Api_DriverGo/mostrar_veh.php");
        const data = await response.json();
        if (data.status) {
          setVehiculos(data.data); 
        } else {
          alert("No se pudieron cargar los vehículos: " + data.message);
        }
      } catch (error) {
        console.error("Error al cargar los vehículos:", error);
        alert("Error al conectar con el servidor para cargar los vehículos.");
      }
    };

    fetchVehiculos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !cedulaUsuario ||
      !nombreUsuario ||
      !matriculaVehiculo ||
      !fechaReserva ||
      !fechaDevolucion
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }
  
    const FechaReservaFormateada = format(new Date(fechaReserva), "yyyy-MM-dd");
    const FechaDevolucionFormateada = format(new Date(fechaDevolucion), "yyyy-MM-dd");
  
    const data = {
      cedulaUsuario,
      nombreUsuario,
      matriculaVehiculo,
      fechaReserva: FechaReservaFormateada,
      fechaDevolucion: FechaDevolucionFormateada,
    };
  
    try {
      const response = await fetch("http://localhost/DriveGo/Api_DriverGo/reserva.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // Asegurarse de que la respuesta es un JSON
  
      // Verificar si el servidor respondió con un error
      if (result.error) {
        alert("Error al realizar la reserva: " + result.error); // Mostrar el mensaje de error
      } else {
        alert("Reserva exitosa");
        console.log(result);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor para realizar la reserva.");
    }
};

  return (
    <div>
      <h2>Reserva de Vehículos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cédula del conductor:</label>
          <input
            type="text"
            id="cedulaUsuario"
            value={cedulaUsuario}
            onChange={(e) => setCedulaUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Nombre del conductor:</label>
          <input
            type="text"
            id="nombreUsuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Vehículo:</label>
          <select
            id="vehiculo"
            value={matriculaVehiculo}
            onChange={(e) => setMatriculaVehiculo(e.target.value)}
          >
            <option value="">Seleccione un vehículo</option>
            {vehiculos.map((vehiculo) => (
              <option key={vehiculo.mat_veh} value={vehiculo.mat_veh}>
                {`${vehiculo.mat_veh} - ${vehiculo.mar_veh} ${vehiculo.mod_veh} (${vehiculo.anio_veh})`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha de Reserva:</label>
          <DatePicker
            selected={fechaReserva}
            onChange={(fecha) => setFechaReserva(fecha)}
            minDate={manejoFecha}
            required
            placeholderText="Selecciona una fecha"
            locale={es}
          />
        </div>
        <div>
          <label>Fecha de Devolución:</label>
          <DatePicker
            selected={fechaDevolucion}
            onChange={(fecha) => setFechaDevolucion(fecha)}
            minDate={fechaReserva || manejoFecha}
            placeholderText="Selecciona una fecha"
            locale={es}
            required
          />
        </div>
        <button type="submit">Reservar Vehículo</button>
      </form>
    </div>
  );
};

export default Reserva;