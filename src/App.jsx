import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Lugares from "./Pages/Lugares";
import Alquiler from "./Pages/Alquiler";
import Contactos from "./Pages/Contactos";
import Administrador from "./Pages/Administrador";
import VerificarCorreo from "./Pages/VerificarCorreo";
import Reserva from "./Pages_Emp/Reserva";
import Devolucion from "./Pages_Emp/Devolucion";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lugares" element={<Lugares />} />
          <Route path="/alquiler" element={<Alquiler />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/verificar" element={<VerificarCorreo />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/devolucion" element={<Devolucion/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
  
};

export default App;
