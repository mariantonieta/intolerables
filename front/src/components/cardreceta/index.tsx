import { useState } from "react";
import "./index.css";
import ModalReceta from "../modal-receta";

interface RecetaCardProps {
  id: number;
  nombre: string;
  imagen: string;
  tiempo: number;
  calorias: number;
  rating: number;
  ingredientes: string[];
  preparacion: string[];
  isFavorito?: boolean;
  onToggleFavorito?: () => void;
}

export default function RecetaCard({
  nombre,
  imagen,
  tiempo,
  calorias,
  rating,
  ingredientes,
  preparacion,
  isFavorito = false,
  onToggleFavorito,
}: RecetaCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="tarjeta">
      <div className="tarjeta-titulo">{nombre}</div>
      <img className="tarjeta-imagen" src={imagen} alt={`Foto de ${nombre}`} />

      <div className="tarjeta-contenido">
        <p className="tarjeta-descripcion">
          <strong>Tiempo:</strong> {tiempo} min
        </p>
        <p className="tarjeta-categoria">
          <strong>Calorías:</strong> {calorias} Kcal
        </p>
        <p className="tarjeta-categoria">
          <strong>Rating:</strong>{" "}
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "star active" : "star"}>
              ★
            </span>
          ))}
        </p>

        <button className="ver-mas-btn" onClick={openModal}>
          Ver receta completa
        </button>

        <button
          className={`favorito ${isFavorito ? "activo" : ""}`}
          onClick={onToggleFavorito}
        >
          {isFavorito ? "❤️" : "🤍"}
        </button>
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
  );
}
