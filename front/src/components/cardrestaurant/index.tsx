import "./index.css"

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
        <div className="tarjeta-titulo">{nombre}</div>
      <img className="tarjeta-imagen" src={imagen} alt={`Foto de ${nombre}`} />
      <div className="tarjeta-contenido">
        <p className="tarjeta-descripcion">{direccion}</p>
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