import React, { useState } from "react";
import logo from "/Public/Logo.jpg";
import "../Estilos/Navbar.css";
import { Link } from "react-router-dom";
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
  {
   
    href: "/sesion",
    icon: "fa-solid fa-user",
  }
];
const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/home"); 

  const handleLinkClick = (href) => {
    setActiveLink(href); 
  };
  return (
    <header className="header">
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
             
                
      </nav>
    </header>
  );
};

export default Navbar;
