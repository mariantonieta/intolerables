import { useState } from "react";
import "./index.css";
import ModalReceta from "../modal-receta";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Ingrediente {
cantidad: string;
nombre: string
  };

interface Paso {
  numeroPaso: number;
  descripcion: string;
}

interface RecetaCardProps {
  id: number;
  nombre: string;
  imagen: string;
  tiempo: number;
  calorias: number;
  rating: number;
  ingredientes: Ingrediente[];
  preparacion: Paso[];
  isFavorito?: boolean;
  onToggleFavorito?: () => void;
}

export default function RecetaCard({
  nombre,
  imagen,
  tiempo,
  calorias,
  ingredientes,
  preparacion,
  isFavorito = false,
  onToggleFavorito,
}: RecetaCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const ingredientesFormateados = ingredientes.map((ing) =>
    `${ing.cantidad} de ${ing.nombre}`
  );
  const pasosFormateados = preparacion
    .sort((a, b) => a.numeroPaso - b.numeroPaso)
    .map((paso) => `${paso.numeroPaso}. ${paso.descripcion}`);

  return (
    <>
      <div className="recipe-card">
        <div className="recipe-card-img">
          <img src={imagen} alt={`Foto de ${nombre}`} />
        </div>

        <div className="recipe-card-content">
          <h3>{nombre}</h3>

          <div className="recipe-info">
            <span><span className="bold">Tiempo:</span> {tiempo} min</span>
            <div className="divider" />
            <span><span className="bold">Calorías:</span> {calorias} kcal</span>
          </div>

          <button className="recipe-btn" onClick={openModal}>
            Ver receta completa
          </button>

          <button className="favorito-icon" onClick={onToggleFavorito}>
            {isFavorito ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      <ModalReceta
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={nombre}
        image={imagen}
        tiempo={tiempo}
        calorias={calorias}
        ingredientes={ingredientesFormateados}
        preparacion={pasosFormateados}
      />
    </>
  );
}
