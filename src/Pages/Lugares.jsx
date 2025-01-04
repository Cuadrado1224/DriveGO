import React from 'react'
import { useNavigate } from 'react-router-dom';
import  "../Styles/Lugares.css";
const Oficinas =[
  { Ciudad: 'Quito', imagen:'/quito.jpg', 
    direccion: 'Aeropuerto Internacional Mariscal Sucre',
    Contactos: 'Call center: (593) 22541683'
  },
  { Ciudad: 'Guayaquil', imagen:'/guayaquil.png', 
    direccion: 'Aeropuerto Internacional Jose Joaquin de Olmedo',
    Contactos: 'Call center: (593) 48620819'
  },
  { Ciudad: 'Cuenca Aeropuerto', imagen:'/cuenca.png', 
    direccion: 'Aeropuerto Mariscal la Mar',
    Contactos: 'Call center: (593) 75390635'
  },
  { Ciudad: 'Ambato Centro-Av.Cevallos y Unidad Nacional', 
    imagen:'/ambato.jpg', 
    direccion: 'Av.Cevallos diagonal Av.Unidad Nacional',
    Contactos: 'Call center: (593) 0939821964'
  },
]

const Lugares = () =>{ 
  const navigate= useNavigate()
  return (
    <div className='lugares-container'>
      {Oficinas.map((oficina, index) =>(
        <div className='lugaresCard' key={index}>
          <h3>{oficina.Ciudad}</h3>
          <img src={oficina.imagen} alt={`Vista de ${location.city}`}/>
          <p>{oficina.direccion}</p>
          <p>{oficina.Contactos}</p>
          <button onClick={() => navigate(`/lugares/${oficina.Ciudad}`)}> Más Información </button>
        </div>
      ))}
    </div>
  ) 
}

export default Lugares
