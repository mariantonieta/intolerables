import RestauranteCard from "../../components/cardrestaurant"
import Mapa from "../../components/map"
import Navigation from "../../containers/navigation"
import "./index.css"
const restaurantesEjemplo = [
    {
      id: 1,
      nombre: "La Tagliatella",
      direccion: "Calle Gran Vía, 45, Madrid",
      imagen: "https://source.unsplash.com/random/300x200/?restaurant,italian",
    },
    {
      id: 2,
      nombre: "Goiko Grill",
      direccion: "Calle Princesa, 22, Madrid",
      imagen: "https://source.unsplash.com/random/300x200/?burger,restaurant",
    },
    {
      id: 3,
      nombre: "Sushi Shop",
      direccion: "Calle Serrano, 15, Madrid",
      imagen: "https://source.unsplash.com/random/300x200/?sushi,restaurant",
    }]
export default function Restaurantes(){
    return (
        <>
        <Navigation/>
<div className="container">
        <h1>Encuentra tu safe place en Restaurante</h1>
<div className="buscador-container">
        <input type="text" name="comida" id="comida"  placeholder="¿Qué te apetece comer hoy?" />
        <input
            type="text"
            name="ubicacion"
            id="ubicacion"
            placeholder="Ubicación"
          />
        <button className="buscar-btn">🔍</button>
        </div>
        <div className="mapa-container">
        <Mapa/>
       </div>
        <div className="contenido">
          {restaurantesEjemplo.map((restaurante) => (
            <RestauranteCard
              key={restaurante.id}
              nombre={restaurante.nombre}
              direccion={restaurante.direccion}
              imagen={restaurante.imagen}
             />
          ))}
          </div>
        </div>
        
        </>
        
    )
}