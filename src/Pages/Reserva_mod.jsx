import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Mod_reserva.css";
import { BACK_URL } from "../config.js";

registerLocale("es", es);

const ReservaModal = ({ vehiculo, onClose }) => {
  const [form, setForm] = useState({
    cedula: "",
    nombre: "",
    fechaInicio: null,
    fechaFin: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: date,
    }));
  };

  const calcularDias = () => {
    if (form.fechaInicio && form.fechaFin) {
      return Math.ceil((form.fechaFin - form.fechaInicio) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const validarFormulario = () => {
    if (!form.cedula || !form.nombre || !form.fechaInicio || !form.fechaFin || !vehiculo) {
      setError("Por favor, complete todos los campos.");
      return false;
    }

    const dias = calcularDias();
    if (dias < 1 || dias > 20) {
      setError("La reserva debe tener entre 1 y 20 días de diferencia.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const data = {
      cedulaUsuario: form.cedula,
      nombreUsuario: form.nombre,
      matriculaVehiculo: vehiculo.mat_veh,
      fechaReserva: form.fechaInicio.toISOString().split("T")[0],
      fechaDevolucion: form.fechaFin.toISOString().split("T")[0],
    };

    try {
      const response = await fetch(`${BACK_URL}/reserva.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess("Reserva realizada con éxito.");
        onClose();
      } else {
        setError(result.error || "Error al procesar la reserva.");
      }
    } catch {
      setError("Error de red o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-reser">
      <div className="modal-contenido">
        <h2>Reservar Vehículo</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="form-group">
          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Ingrese su cédula"
          />
        </div>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ingrese su nombre completo"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Fecha de Inicio:</label>
            <DatePicker
              selected={form.fechaInicio}
              onChange={(date) => handleDateChange(date, "fechaInicio")}
              minDate={new Date()}
              className="form-input"
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
              locale={es}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Fin:</label>
            <DatePicker
              selected={form.fechaFin}
              onChange={(date) => handleDateChange(date, "fechaFin")}
              minDate={form.fechaInicio || new Date()}
              className="form-input"
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
              locale={es}
              required
            />
          </div>
        </div>
        <div className="ve-detalles">
          <h3>{`${vehiculo.mar_veh} ${vehiculo.mod_veh}`}</h3>
          <p  className="v-detalles">Días seleccionados: {calcularDias()}</p>
          <p  className="v-detalles">Precio por día: ${vehiculo.precio_veh}</p>
          <p  className="v-detalles">
            Total: ${(vehiculo.precio_veh * calcularDias()).toFixed(2)}
          </p>
        </div>
        <button
          className={`submit-but ${isLoading ? "loading" : ""}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Procesando..." : "Confirmar Reserva"}
        </button>
        <button className="close-but" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ReservaModal;
