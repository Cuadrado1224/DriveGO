import React, { useState, useEffect } from "react";
import logo from "/Public/Logo-Drive2-01.png";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import Modal from "../Pages/Login";

const linksCliente = [
  { name: "Home", href: "/home" },
  { name: "Lugares", href: "/lugares" },
  { name: "Alquiler", href: "/alquiler" },
  { name: "Contactos", href: "/contactos" },
];

const linksAdmin = [
  { name: "Dashboard", href: "/administrador" },
  { name: "Usuarios", href: "/usuarios" },
  { name: "Reportes", href: "/reportes" },
  { name: "Configuración", href: "/configuracion" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/home");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
 
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  const handleSessionClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
   
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const handleLogout = () => {
  
    localStorage.removeItem("user");
    setUser(null);
    setActiveLink("/home");
  };

  return (
    <header className="header-nav">
      <a href="/" className="logo">
        <img src={logo} alt="Logo de la empresa" />
      </a>
      <nav className="navbar">
        {(user?.rol === "Administrador" ? linksAdmin : linksCliente).map((x) => (
          <Link
            key={x.href}
            to={x.href}
            className={`nav-item ${activeLink === x.href ? "active" : ""}`}
            onClick={() => handleLinkClick(x.href)}
          >
            {x.icon && <i className={x.icon}></i>}
            {x.name}
          </Link>
        ))}

        {user ? (
          <div className="user-session">
            <span className="user-greeting">Hola, {user.nombre}</span>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <button className="Button-head" onClick={handleSessionClick}>
            <i className="fa-solid fa-user"></i>
            <i>Iniciar Sesión</i>
          </button>
        )}
      </nav>
      {showModal && <Modal closeModal={closeModal} />}
    </header>
  );
};

export default Navbar;
