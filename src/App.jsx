import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
<<<<<<< HEAD
import Home from "./Pantallas/Home";
import Lugares from "./Pantallas/Lugares";
import Alquiler from "./Pantallas/Alquiler";
import Contactos from "./Pantallas/Contactos";
import Administrador from "./Pantallas/Administrador";
=======
import Home from "./Pages/Home";
import Lugares from "./Pages/Lugares";
import Alquiler from "./Pages/Alquiler";
import Contactos from "./Pages/Contactos";
>>>>>>> 521ca2cc1a70e065c2491136c3095911ba985e7c


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
<<<<<<< HEAD
          <Route path="/administrador" element={<Administrador />} />
=======
>>>>>>> 521ca2cc1a70e065c2491136c3095911ba985e7c
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
