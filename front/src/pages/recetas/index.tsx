import { useEffect, useState } from "react";
import RecetaCard from "../../components/cardreceta"
import Navigation from "../../containers/navigation"
import "./index.css"
import axios from "axios";
interface Receta {
  title: string;
  image: string;
  readyInMinutes: number;
  calories?: number;
  analyzedInstructions?: { steps: { step: string }[] }[];
  extendedIngredients?: { original: string }[];
}

export default function Recetas(){
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [busqueda, setBusqueda] = useState("");
 
  const buscarRecetas = async () => {
    const intolerancia = localStorage.getItem("intoleranciaSeleccionada");
    if (!intolerancia) return;
  
    try {
      const res = await axios.get(`http://localhost:9000/api/recetas/buscar`, {
        params: {
          intolerancia,
          query: busqueda  
           },
      });
     console.log(res.data.results)
      setRecetas(res.data.results);
    } catch (err) {
      console.error("Error al buscar recetas:", err);
    }
  };
 
  useEffect(() => {
    const intolerancia = localStorage.getItem("intoleranciaSeleccionada");
    if (intolerancia) {
      axios
        .get(`http://localhost:9000/api/recetas/buscar?intolerancia=${intolerancia}`)
        .then((res) => {
          setRecetas(res.data.results); 
           })
        .catch((err) => {
          console.error("Error al cargar recetas:", err);
        });
    }
  }, []);
    return (
        <>
        <Navigation/>
        <div className="container">
        <h1>Encuentra tu safe place en Receta</h1>
<div className="buscador-container">
        <input type="text" name="comida" id="comida"  placeholder="¿Qué te apetece comer hoy?"
       value={busqueda}
       onChange={(e) => setBusqueda(e.target.value)}  />
        <button className="buscar-btn" onClick={buscarRecetas}>🔍</button>
      
</div>
<div className="contenido">
{recetas.map((receta, index) => (

            <RecetaCard
              key={index}
              nombre={receta.title}
              imagen={receta.image}
              tiempo={receta.readyInMinutes}
              calorias={receta.calories || 100} // si no hay, por defecto
              rating={4} // Puedes ajustarlo o simular
              ingredientes={
                receta.extendedIngredients && receta.extendedIngredients.length > 0
                  ? receta.extendedIngredients.map(i => i.original)
                  : ["No hay ingredientes disponibles"]
              }
              preparacion={
                receta.analyzedInstructions && receta.analyzedInstructions.length > 0
                  ? receta.analyzedInstructions[0].steps.map(s => s.step)
                  : ["Sin pasos disponibles"]
              }
            />
          ))}
          </div>     </div>
         
             </>
    )
}