import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pantallas/Home";
import Lugares from "./Pantallas/Lugares";
import Alquiler from "./Pantallas/Alquiler";
import Contactos from "./Pantallas/Contactos";
import Inicio from "./Pantallas/Inicio_de_sesion";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/lugares" element={<Lugares/>} />
        <Route path="/alquiler" element={<Alquiler/>} />
        <Route path="/contactos" element={<Contactos/>} />
        <Route path="/sesion" element={<Inicio/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;