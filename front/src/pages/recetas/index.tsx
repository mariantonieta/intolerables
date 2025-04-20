import { useEffect, useState } from "react";
import RecetaCard from "../../components/cardreceta";
import Navigation from "../../containers/navigation";
import "./index.css";
import api from "../../services/axiosConfig"; // Asegúrate de usar tu cliente de axios configurado

interface Receta {
  id: number; // Asegúrate de que cada receta tenga un identificador único
  title: string;
  image: string;
  readyInMinutes: number;
  calories?: number;
  analyzedInstructions?: { steps: { step: string }[] }[];
  extendedIngredients?: { original: string }[];
  isFavorito?: boolean; // Para manejar el estado de favorito
}

export default function Recetas() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [busqueda, setBusqueda] = useState("");
  
  const buscarRecetas = async () => {
    const intolerancia = localStorage.getItem("intoleranciaSeleccionada");
    if (!intolerancia) return;

    try {
      const res = await api.get(`/api/recetas/buscar`, {
        params: {
          intolerancia,
          query: busqueda,
        },
      });
      console.log(res.data.results);
      const recetasConFavoritos = res.data.results.map((receta: Receta) => ({
        ...receta,
        isFavorito: false, // Inicializamos los favoritos en false
      }));
      setRecetas(recetasConFavoritos);
    } catch (err) {
      console.error("Error al buscar recetas:", err);
    }
  };

  useEffect(() => {
    const intolerancia = localStorage.getItem("intoleranciaSeleccionada");
    if (intolerancia) {
      api
        .get(`/api/recetas/buscar`, {
          params: { intolerancia },
        })
        .then((res) => {
          const recetasConFavoritos = res.data.results.map((receta: Receta) => ({
            ...receta,
            isFavorito: false,
          }));
          setRecetas(recetasConFavoritos);
        })
        .catch((err) => {
          console.error("Error al cargar recetas:", err);
        });
    }
  }, []);

  // Función para manejar el cambio de estado de favorito
  const toggleFavorito = async (id: number) => {
    setRecetas((prevRecetas) =>
      prevRecetas.map((receta) =>
        receta.id === id ? { ...receta, isFavorito: !receta.isFavorito } : receta
      )
    );

    try {
      const receta = recetas.find((receta) => receta.id === id);
      if (receta) {
        if (receta.isFavorito) {
          // Eliminar favorito
          await api.delete(`/api/favoritos-recetas/${id}`);
          console.log("Favorito eliminado");
        } else {
          // Guardar favorito
          await api.post("/api/favoritos-recetas", {
            receta: { id },
          });
          console.log("Favorito guardado");
        }
      }
    } catch (error) {
      console.error("Error al gestionar el favorito", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Encuentra tu safe place en Receta</h1>
        <div className="buscador-container">
          <input
            type="text"
            name="comida"
            id="comida"
            placeholder="¿Qué te apetece comer hoy?"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="buscar-btn" onClick={buscarRecetas}>
            🔍
          </button>
        </div>

        <div className="contenido">
          {recetas.map((receta) => (
            <RecetaCard
              key={receta.id}
              id={receta.id} // Asegúrate de pasar el ID
              nombre={receta.title}
              imagen={receta.image}
              tiempo={receta.readyInMinutes}
              calorias={receta.calories || 100} // Si no hay calorías, poner valor por defecto
              rating={4} // Simulamos la puntuación
              ingredientes={
                receta.extendedIngredients && receta.extendedIngredients.length > 0
                  ? receta.extendedIngredients.map((i) => i.original)
                  : ["No hay ingredientes disponibles"]
              }
              preparacion={
                receta.analyzedInstructions && receta.analyzedInstructions.length > 0
                  ? receta.analyzedInstructions[0].steps.map((s) => s.step)
                  : ["Sin pasos disponibles"]
              }
              isFavorito={receta.isFavorito || false} // Usamos el estado de favorito
              onToggleFavorito={() => toggleFavorito(receta.id)} // Pasamos la función para cambiar el estado de favorito
            />
          ))}
        </div>
      </div>
    </>
  );
}
