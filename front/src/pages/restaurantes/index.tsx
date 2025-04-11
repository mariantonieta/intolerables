import RestauranteCard from "../../components/cardrestaurant"
import Mapa from "../../components/map"
import Navigation from "../../containers/navigation"
import "./index.css"
//import gluten from "../../../public/icons/gluten.svg";
import axios from "axios"
import {  useEffect, useState } from "react";
interface Restaurante {
  id: number;
  nombre: string;
  direccion: string;
  categoria: string;
  latitud: number;
  longitud: number;
  imagen: string ;
  url: string | null;
}
/*const restaurantesEjemplo = [
    {
      id: 1,
      nombre: "La Tagliatella",
      direccion: "Calle Gran Vía, 45, Madrid",
      imagen: gluten,
    },
    {
      id: 2,
      nombre: "Goiko Grill",
      direccion: "Calle Princesa, 22, Madrid",
      imagen: gluten,
    },
    {
      id: 3,
      nombre: "Sushi Shop",
      direccion: "Calle Serrano, 15, Madrid",
      imagen: gluten
      
    }]*/

export default function Restaurantes(){
const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
const [termino, setTermino] = useState("");
const [ubicacion, setUbicacion] = useState("");
const [intolerancia, setIntolerancia] = useState("");  
useEffect(() =>{
  const intoleranciaGuardad = localStorage.getItem("intoleranciaSeleccionada")
  if(intoleranciaGuardad){
    setIntolerancia(intoleranciaGuardad);
  }
}, []);

const buscarRestaurantesPorIntolerancia = async () => {
  if (!intolerancia || !ubicacion) {
    alert("Faltan datos para buscar");
    return;
  }

  try {
    const response = await axios.get("http://localhost:9000/api/yelp/buscar-por-intolerancia", {
      params: {
        intolerancia: intolerancia,
        ubicacion: ubicacion,
      },
    });
    setRestaurantes(response.data);
  } catch (error) {
    console.error("Error buscando restaurantes por intolerancia:", error);
  }
};
  const buscarRestaurantes = async () => {
    if (!termino || !ubicacion) {
      alert("Por favor, introduce tanto la comida como la ubicación");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:9000/api/yelp/buscar", {
        params: {
          termino: termino,
          ubicacion: ubicacion,
        },
      });
      setRestaurantes(response.data);
    } catch (error) {
      console.error("Error al buscar restaurantes:", error);
      alert("No se pudieron encontrar restaurantes. Inténtalo de nuevo.");
    }
  };


  return (
        <>
        <Navigation/>
<div className="container">
        <h1>Encuentra tu safe place en Restaurante</h1>
<div className="buscador-container">
        <input type="text" name="comida" id="comida"  placeholder="¿Qué te apetece comer hoy?" 
        value={termino}
        onChange={(e) => setTermino(e.target.value)}/>
        <input
            type="text"
            name="ubicacion"
            id="ubicacion"
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        <button className="buscar-btn" onClick={buscarRestaurantes}  >🔍</button>
        <button className="buscar-btn" onClick={buscarRestaurantesPorIntolerancia}>
            Buscar por intolerancia
          </button>
        </div>
        <div className="mapa-container">
        <Mapa/>
       </div>
        <div className="contenido">
          {restaurantes.map((restaurante) => (
            <RestauranteCard
              key={restaurante.id}
              id={restaurante.id}
              nombre={restaurante.nombre}
              direccion={restaurante.direccion}
              categoria={restaurante.categoria} // Asegúrate de que este campo exista
              latitud={restaurante.latitud} // Asegúrate de que este campo exista
              longitud={restaurante.longitud} 
              url={restaurante.url}
              imagen={restaurante.imagen}
              />
          ))}
          </div>
        </div>
   
  

        
        </>
        
    )
}