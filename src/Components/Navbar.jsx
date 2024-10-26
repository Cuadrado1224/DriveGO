import React, { useState } from "react";
import logo from "/Public/Logo.jpg";
import "../Styles/Navbar.css";
import { Link} from "react-router-dom";
import Modal from "../Pages/Login";
const links = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Lugares",
    href: "/lugares",
  },
  {
    name: "Alquiler",
    href: "/alquiler",
  },
  {
    name: "Contactos",
    href: "/contactos",
  },
  
];
const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/home");
  const [showModal, setShowModal] = useState(false); 

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  const handleSessionClick = () => {
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  return (
    <header className="header-nav">
      <a href="/" className="logo">
        <img src={logo} alt="Logo de la empresa" />
      </a>
      <nav className="navbar">
        {links.map((x) => (
         <Link key={x.href} to={x.href}  className={`nav-item ${activeLink === x.href ? "active" : ""}`}
         onClick={() => handleLinkClick(x.href)} >
         {x.icon && <i className={x.icon}></i>} 
         {x.name}
       </Link>
        ))}
             
          <button className="Button" onClick={handleSessionClick}>
          <i className="fa-solid fa-user"></i>
          <i>Iniciar Sesión</i>
        </button>
      </nav>
      {showModal && <Modal closeModal={closeModal} />}
    </header>
  );
};

export default Navbar;
