import { useState } from "react";
import "./index.css"
import ModalReceta from "../modal-receta";
interface RecetaCardProps{
    nombre: string;
    imagen: string;
    tiempo: number;
    calorias:number;
    rating:number;
    ingredientes: string[];
    preparacion: string[];
}
export default function RecetaCard({
    nombre, imagen, tiempo, calorias, rating, ingredientes, preparacion
}: RecetaCardProps){
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () =>{
        setIsOpen(true)
    }
    
    return(
        <div className="recipe-card">
      {/* Imagen flotante */}
      <div className="recipe-card-img">
        <img src={imagen} alt={nombre} />
      </div>

      {/* Contenido */}
      <div className="recipe-card-content">
        <h3>{nombre}</h3>
        <div className="recipe-info">
          <div>
            <p className="bold">{tiempo}</p>
            <p>Min</p>
          </div>
          <span className="divider"></span>
          <div>
            <p className="bold">{calorias}</p>
            <p>Kcal</p>
          </div>
          <span className="divider"></span>
         
        </div>

        {/* Estrellas de rating */}
        <div className="recipe-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "star active" : "star"}>
              ★
            </span>
          ))}
        </div>

        {/* Botón */}
        <button className="recipe-btn" onClick={openModal}>VER</button>
      </div>
      <ModalReceta
     open={isOpen}
     onClose={() => setIsOpen(false)}
     title={nombre}
     image={imagen}
     tiempo={tiempo}
     calorias={calorias}
     ingredientes={ingredientes}
     preparacion={preparacion}
     />
      </div> 
    )
}