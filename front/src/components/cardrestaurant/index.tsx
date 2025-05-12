  import { useTranslation } from "react-i18next";
import "./index.css";
  import { FaHeart, FaRegHeart } from 'react-icons/fa';

  //Card del restaurante para mostrar y luego con un map renderizarlas todas

  interface RestauranteCardProps {
    id: number;
    nombre: string;
    direccion: string;
    categoria: string;
    imagen: string;
    isFavorito?: boolean;
    url: string | null;
    onToggleFavorito?: () => void;
  }

  export default function RestauranteCard({
    nombre,
    direccion,
    categoria,
    url,
    imagen,
    isFavorito = false,
    onToggleFavorito,
  }: RestauranteCardProps) {
    const handleVerMas = () => {
      if (url) {
        window.open(url, "_blank");
      }
    };
const {t} = useTranslation()
    return (
      <div className="tarjeta">
        <div className="tarjeta-titulo">{nombre}</div>
        <img className="tarjeta-imagen" src={imagen} alt={`Foto de ${nombre}`} />
        <div className="tarjeta-contenido">
          <p className="tarjeta-descripcion">
            <strong>{t("address_restaurant")}</strong> {direccion}
          </p>
          <p className="tarjeta-categoria">
            <strong>{t("category_restaurant")}</strong> {categoria}
          </p>
          {url && (
            <button className="ver-mas-btn" onClick={handleVerMas}>
              {t("see_more_yelp")}
            </button>
          )}

    
<button className="favorito-icon" onClick={onToggleFavorito}>
  {isFavorito ? <FaHeart /> : <FaRegHeart />}
</button>
        </div>
      </div>
    );
  }
