import RecetaCard from "../../components/cardreceta"
import Navigation from "../../containers/navigation"
import "./index.css"
export default function Recetas(){
    return (
        <>
        <Navigation/>
        <div className="container">
        <h1>Encuentra tu safe place en Restaurante</h1>
<div className="buscador-container">
        <input type="text" name="comida" id="comida"  placeholder="¿Qué te apetece comer hoy?" />
        <button className="buscar-btn">🔍</button>
      
</div>
<div className="contenido">
<RecetaCard
 nombre="Pasta China"
 imagen="./icons/gluten.svg"
 tiempo={25}
 calorias={95}
 rating={4}
 ingredientes={["Pasta de arroz", "Salsa de soja", "Verduras salteadas"]}
 preparacion={[
   "Hervir la pasta de arroz",
   "Saltear las verduras",
   "Agregar salsa de soja",
   "Mezclar y servir caliente",
 ]}
 />
 <RecetaCard
 nombre="Pasta China"
 imagen="./icons/gluten.svg"
 tiempo={25}
 calorias={95}
 rating={4}
 ingredientes={["Pasta de arroz", "Salsa de soja", "Verduras salteadas"]}
 preparacion={[
   "Hervir la pasta de arroz",
   "Saltear las verduras",
   "Agregar salsa de soja",
   "Mezclar y servir caliente",
 ]}
 /><RecetaCard
 nombre="Pasta China"
 imagen="./icons/gluten.svg"
 tiempo={25}
 calorias={95}
 rating={4}
 ingredientes={["Pasta de arroz", "Salsa de soja", "Verduras salteadas"]}
 preparacion={[
   "Hervir la pasta de arroz",
   "Saltear las verduras",
   "Agregar salsa de soja",
   "Mezclar y servir caliente",
 ]}
 /><RecetaCard
 nombre="Pasta China"
 imagen="./icons/gluten.svg"
 tiempo={25}
 calorias={95}
 rating={4}
 ingredientes={["Pasta de arroz", "Salsa de soja", "Verduras salteadas"]}
 preparacion={[
   "Hervir la pasta de arroz",
   "Saltear las verduras",
   "Agregar salsa de soja",
   "Mezclar y servir caliente",
 ]}
 />
 </div>
</div>
        </>
    )
}