import React from "react";
import logo from "/Public/Logo.jpg";
import "./Navbar.css"
const Navbar = () => {
  return (
    <header className="header">
      <a href="/" className="logo">
        <img src={logo} alt="Logo de la empresa" />
      </a>
      <nav className="navbar">
          <a href="/" className="nav-item " active-color="white">
            Home
          </a>
          <a href="/" className="nav-item" active-color="white">
            Lugares
          </a>
          <a href="/" className="nav-item" active-color="white">
            Alquiler
          </a>
          <a href="/" className="nav-item" active-color="white">
            Contactos
          </a>
          
          <a href="/">
            <i className="fa-solid fa-magnifying-glass"></i>
          </a>
          <a href="/">
            <i className="fa-solid fa-user"></i>
          </a>
      </nav>
    </header>
  );
};

export default Navbar;
