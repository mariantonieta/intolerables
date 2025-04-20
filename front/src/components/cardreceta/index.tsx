import { useState } from "react";
import "./index.css";
import ModalReceta from "../modal-receta";
import api from "../../services/axiosConfig";
interface RecetaCardProps {
  id: number; // ✅ Necesitamos el ID para comunicar con el backend
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
  id,
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
  const [favorito, setFavorito] = useState(isFavorito);

  const openModal = () => {
    setIsOpen(true);
  }; const toggleFavorito = async () => {
    const nuevoEstado = !favorito;
    setFavorito(nuevoEstado);
  
    try {
      const token = localStorage.getItem("jwtToken"); // Obtener el token de autenticación desde localStorage
  
      if (!token) {
        alert("Debes iniciar sesión para guardar favoritos.");
        return; // Si no hay token, no podemos proceder
      }
  
      if (nuevoEstado) {
        // ✅ GUARDAR FAVORITO con axios
        const res = await api.post(
          "/api/favoritos-recetas",
          {
            receta: { id },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en los encabezados
            },
          }
        );
  
        if (res.status !== 201) throw new Error("Error al guardar favorito");
        console.log("Favorito guardado");
      } else {
        // ❌ ELIMINAR FAVORITO con axios
        const res = await api.delete(`/api/favoritos-recetas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // También aquí enviamos el token
          },
        });
  
        if (res.status !== 200) throw new Error("Error al eliminar favorito");
        console.log("Favorito eliminado");
      }
    } catch (error) {
      console.error(error);
      // 🔄 Deshacer el cambio visual si hubo error
      setFavorito(!nuevoEstado);
    }
  
    if (onToggleFavorito) {
      onToggleFavorito();
    }
  };
  
  return (
    <div className="recipe-card">
      <div className="recipe-card-img">
        <img src={imagen} alt={nombre} />
      </div>

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

        <div className="recipe-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "star active" : "star"}>
              ★
            </span>
          ))}
        </div>

        {/* ❤️ Botón de favorito */}
        <button
          className={`favorito-btn ${favorito ? "activo" : ""}`}
          onClick={toggleFavorito}
        >
          {favorito ? "❤️" : "🤍"}
        </button>

        {/* 👀 Botón ver más */}
        <button className="recipe-btn" onClick={openModal}>
          VER
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
