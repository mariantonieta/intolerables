import { useEffect, useState } from "react";
import RecetaCard from "../../components/cardreceta";
import Navigation from "../../containers/navigation";
import api from "../../services/axiosConfig"; // ← aquí usás tu config con token
import "../recetas/index.css";

interface Receta {
  id: number; // Agregar un ID para cada receta
  titulo: string;
  imagen: string;
  duracionReceta: number;
  calorias?: number;
  analyzedInstructions?: { descripcion: string }[];
  ingredientes?: {
    cantidad: number;
    unidad: string;
    ingrediente: { nombre: string };
  }[];
  isFavorito?: boolean; // Puedes agregar esta propiedad para almacenar si es favorito
}

export default function RecetasComunidad() {
  const [recetas, setRecetas] = useState<Receta[]>([]);

  useEffect(() => {
    const obtenerRecetas = async () => {
      try {
        const res = await api.get("/api/recetas"); // Asegúrate que exista esta ruta en el backend
        const recetasConFavoritos = res.data.map((receta: Receta) => ({
          ...receta,
          isFavorito: false, // Inicializamos todos los favoritos en false
        }));
        setRecetas(recetasConFavoritos);
      } catch (err) {
        console.error("Error al cargar recetas de la comunidad:", err);
      }
    };

    obtenerRecetas();
  }, []);

  // Función para manejar el cambio de estado de favorito
  const toggleFavorito = (id: number) => {
    setRecetas((prevRecetas) =>
      prevRecetas.map((receta) =>
        receta.id === id ? { ...receta, isFavorito: !receta.isFavorito } : receta
      )
    );
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Recetas de la Comunidad 👨‍👩‍👧‍👦</h1>
        <div className="contenido">
          {recetas.map((receta) => (
            <RecetaCard
              key={receta.id}
              id={receta.id} // Agregar el ID de la receta
              nombre={receta.titulo}
              imagen={receta.imagen}
              tiempo={receta.duracionReceta}
              calorias={receta.calorias || 100}
              rating={5}
              ingredientes={
                receta.ingredientes && receta.ingredientes.length > 0
                  ? receta.ingredientes.map(
                      (i) => `${i.cantidad} ${i.unidad} ${i.ingrediente.nombre}`
                    )
                  : ["Sin ingredientes"]
              }
              preparacion={
                receta.analyzedInstructions && receta.analyzedInstructions.length > 0
                  ? receta.analyzedInstructions.map((p) => p.descripcion)
                  : ["Sin pasos disponibles"]
              }
              isFavorito={receta.isFavorito || false} // Si la receta es favorita, pasa true
              onToggleFavorito={() => toggleFavorito(receta.id)} // Pasamos la función toggleFavorito
            />
          ))}
        </div>
      </div>
    </>
  );
}
