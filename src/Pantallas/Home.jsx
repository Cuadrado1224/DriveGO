import React from 'react';
import  "../Estilos/Home.css";
import Banner from "../Components/Banner";
import imagen from "/Public/Logo.jpg";
const Home = () => {
  return (
    
    <div className='Home-contenedor'>
    <Banner/>
    <section className="section">
    <div className="oferta-1">
      <div className="oferta-img">
        <img src={imagen} alt="" />
      </div>
      <div className="oferta-txt">
        <h3>producto 1</h3>
        <p>calidad premium</p>
        <p className="precio">$200</p>
        <a href="/" className="btn-1">
          Información
        </a>
      </div>
    </div>
    <div className="oferta-2">
      <div className="oferta-img">
        <img src={imagen} alt="" />
      </div>
      <div className="oferta-txt">
        <h3>producto 1</h3>
        <p>calidad premium</p>
        <p className="precio">$200</p>
        <a href="/" className="btn-1">
          Información
        </a>
      </div>
      <div className="oferta-3">
        <div className="oferta-img">
          <img src={imagen} alt="" />
        </div>
        <div className="oferta-txt">
          <h3>producto 1</h3>
          <p>calidad premium</p>
          <p className="precio">$200</p>
          <a href="/" className="btn-1">
          Información
        </a>
        </div>
      </div>
    </div>
  </section>
  </div>
   
        
       
   
  )
}

export default Home