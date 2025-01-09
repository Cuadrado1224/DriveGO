import React, { useState } from "react";
import "../Styles/Mod_reserva.css";

const ReservaModal = ({ vehiculo, userInfo, onClose }) => {
  const [form, setForm] = useState({
    cedula: "",
    telefono: "",
    direccion: "",
    fechaInicio: "",
    fechaFin: "",
    vaAConducir: "",
    aceptaTerminos: false,
    conductor: {
      cedula: "",
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
    },
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleConductorChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      conductor: {
        ...prevForm.conductor,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (form.vaAConducir === "no" && !form.aceptaTerminos) {
      alert("Debe aceptar los términos y condiciones.");
      return;
    }

    const data = {
      cedulaUsuario: form.cedula,
      nombreUsuario: userInfo.nombre, 
      matriculaVehiculo: vehiculo.matricula, 
      fechaReserva: form.fechaInicio,
      fechaDevolucion: form.fechaFin,
    };

    try {
      const response = await fetch("http://localhost/DriveGo/Api_DriverGo/reserva.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(result.success);
        alert("Reserva realizada con éxito.");
        onClose();
      } else {
        setError(result.error || "Error al procesar la reserva.");
      }
    } catch (err) {
      setError("Error de red o servidor.");
    }
  };

  return (
    <div className="modal-reser">
      <div className="modal-contenido">
        <h2>Reservar Vehículo</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="for-group">
          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
          />
        </div>
        <div className="for-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="for-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="for-group">
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
          />
        </div>
        <div className="for-group">
          <label>Fecha de Fin:</label>
          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
          />
        </div>
        <div className="for-group">
          <label>¿Usted va a conducir?</label>
          <select
            name="vaAConducir"
            value={form.vaAConducir}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        {form.vaAConducir === "no" && (
          <>
            <div className="for-group">
              <label>Cédula del Conductor:</label>
              <input
                type="text"
                name="cedula"
                value={form.conductor.cedula}
                onChange={handleConductorChange}
              />
            </div>
            <div className="for-group">
              <label>Nombre del Conductor:</label>
              <input
                type="text"
                name="nombre"
                value={form.conductor.nombre}
                onChange={handleConductorChange}
              />
            </div>
            <div className="for-group">
              <label>Apellido del Conductor:</label>
              <input
                type="text"
                name="apellido"
                value={form.conductor.apellido}
                onChange={handleConductorChange}
              />
            </div>
            <div className="for-group">
              <label>Teléfono del Conductor:</label>
              <input
                type="text"
                name="telefono"
                value={form.conductor.telefono}
                onChange={handleConductorChange}
              />
            </div>
            <div className="for-group">
              <label>Dirección del Conductor:</label>
              <input
                type="text"
                name="direccion"
                value={form.conductor.direccion}
                onChange={handleConductorChange}
              />
            </div>
            <div className="for-group">
              <label>
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={form.aceptaTerminos}
                  onChange={handleChange}
                />
                Acepto los términos y condiciones
              </label>
            </div>
          </>
        )}
        <button className="submit-but" onClick={handleSubmit}>
          Confirmar Reserva
        </button>
        <button className="close-but" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ReservaModal;
