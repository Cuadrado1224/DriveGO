import React, { useState, useEffect } from "react";
import "../Styles/Administrador.css";
import Ges_user from "./Gestion_usuarios";
import Ges_veh from "./Gestion_vehiculos";
import Report from "./Reportes";
import Tariff from "./Tarifas";

const Administrador = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const navbar = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "usuarios":
        return <Ges_user />;
      case "vehiculos":
        return <Ges_veh />;
      case "reportes":
        return <Report />;
      case "tarifas":
        return <Tariff />;
      default:
        return <Ges_user />;
    }
  };

  return (
    <div>
      <header className="header-admin">
        <button className="bar-ad" onClick={toggleMenu}>
          <i className={`fa-solid ${menuVisible ? "fa-times" : "fa-bars"}`}></i>
        </button>
        <h1>Sistema de Administración</h1>
        <nav className="nav-admin">
          <button onClick={() => setSelectedComponent("usuarios")}>
            <i className="fa-solid fa-user"></i>
          </button>
        </nav>
      </header>

      <div className={`menu-admin ${menuVisible ? "visible" : ""}`}>
        <div className="menu-cont">
          <ul>
            <li onClick={() => setSelectedComponent("usuarios")}>
              <button>
                <i className="fa-solid fa-users"></i>
                {menuVisible && <span>Gestión de Usuarios</span>}
              </button>
            </li>
            <li onClick={() => setSelectedComponent("vehiculos")}>
              <button>
                <i className="fa-solid fa-car-side"></i>
                {menuVisible && <span>Gestión de Vehículos</span>}
              </button>
            </li>
            <li onClick={() => setSelectedComponent("reportes")}>
              <button>
                <i className="fa-solid fa-chart-column"></i>
                {menuVisible && <span>Reportes</span>}
              </button>
            </li>
            <li onClick={() => setSelectedComponent("tarifas")}>
              <button>
                <i className="fa-solid fa-dollar-sign"></i>
                {menuVisible && <span>Tarifas</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <main className="admin-body">
        {renderSelectedComponent()}
      </main>
    </div>
  );
};

export default Administrador;
