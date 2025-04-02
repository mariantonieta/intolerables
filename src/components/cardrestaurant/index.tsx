// components/RestauranteCard.tsx
import React from "react";

interface RestauranteCardProps {
  nombre: string;
  direccion: string;
  imagen: string;
  isFavorito?: boolean;
  onToggleFavorito?: () => void;
}

export default function RestauranteCard({
  nombre,
  direccion,
  imagen,
  isFavorito = false,
  onToggleFavorito,
}: RestauranteCardProps) {
  return (
    <div className="tarjeta">
      <img src={imagen} alt={`Foto de ${nombre}`} />
      <div className="tarjeta-contenido">
        <h3>{nombre}</h3>
        <p>{direccion}</p>
        <button 
          className={`favorito ${isFavorito ? "activo" : ""}`}
          onClick={onToggleFavorito}
        >
          {isFavorito ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}