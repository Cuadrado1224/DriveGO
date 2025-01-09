import React from 'react';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import "../Styles/Contactos.css";  // Importación regular de CSS

const Contactos = () => {
  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <img
          src="/BannerCon.png"
          alt="Banner"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Contáctanos</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Introduction Text */}
        <div className="intro-section">
          <h2 className="main-title">Reservas Ecuador</h2>
          <h3 className="subtitle">
            Tu viaje, tu estilo. ¡Encuentra el auto perfecto para ti!
          </h3>
          <p className="description">
            Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros
            a través de nuestras redes sociales o envíanos un correo electrónico.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="cards-grid">
          {/* Phone Card */}
          <div className="contact-card">
            <div className="card-content">
              <div className="icon-wrapper icon-wrapper-blue">
                <Phone className="icon" />
              </div>
              <div>
                <h4 className="card-title">Llámanos</h4>
                <p className="card-text">+593 987975666</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="contact-card">
            <div className="card-content">
              <div className="icon-wrapper icon-wrapper-green">
                <Mail className="icon" />
              </div>
              <div>
                <h4 className="card-title">Email</h4>
                <p className="card-text">proyectodrivego@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="contact-card">
            <div className="card-content">
              <div className="icon-wrapper icon-wrapper-purple">
                <MapPin className="icon" />
              </div>
              <div>
                <h4 className="card-title">Ubicación Matriz</h4>
                <p className="card-text">Universidad Tecnica de Ambato</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactos;