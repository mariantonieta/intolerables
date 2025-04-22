import { useEffect, useState } from "react";
import RecetaCard from "../../components/cardreceta";
import Navigation from "../../containers/navigation";
import api from "../../services/axiosConfig";
import "../recetas/index.css";

interface Receta {
  id: number;
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
}



export default function RecetasComunidad() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [favoritosIds, setFavoritosIds] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cargar recetas al iniciar
  useEffect(() => {
    const obtenerRecetas = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/api/recetas");
        setRecetas(res.data as Receta[]);
      } catch (err) {
        console.error("Error al cargar recetas:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    obtenerRecetas();
  }, []);
  

  const toggleFavorito = async (id: number) => {
    const token = localStorage.getItem("jwtToken");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) {
      alert("Debes iniciar sesión para usar favoritos.");
      return;
    }

    const yaEsFavorito = favoritosIds.includes(id);

    try {
      if (yaEsFavorito) {
        await api.delete(`/api/favoritos-recetas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritosIds((prev) => prev.filter((fid) => fid !== id));
      } else {
        console.log("Enviando a favoritos:", { receta: { id }, usuario: { id: parseInt(usuarioId) } });
        
        await api.post(
          "/api/favoritos-recetas",
          {
            receta: { id },
            usuario: { id: parseInt(usuarioId) },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavoritosIds((prev) => [...prev, id]);
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
    }
  };

  // Filtro básico por título
  const recetasFiltradas = recetas.filter((receta) =>
    receta.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Encuentra tu safe place en Recetas de la Comunidad</h1>
        <div className="buscador-container">
          <input
            type="text"
            placeholder="Buscar receta de la comunidad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="contenido">
          {isLoading ? (
            <p>Cargando recetas...</p>
          ) : recetasFiltradas.length > 0 ? (
            recetasFiltradas.map((receta) => (
              <RecetaCard
                key={receta.id}
                id={receta.id}
                nombre={receta.titulo}
                imagen={receta.imagen}
                tiempo={receta.duracionReceta}
                calorias={receta.calorias || 100}
                rating={5}
                ingredientes={
                  receta.ingredientes?.length
                    ? receta.ingredientes.map(
                        (i) =>
                          `${i.cantidad} ${i.unidad} ${i.ingrediente.nombre}`
                      )
                    : ["Sin ingredientes"]
                }
                preparacion={
                  receta.analyzedInstructions?.length
                    ? receta.analyzedInstructions.map((p) => p.descripcion)
                    : ["Sin pasos disponibles"]
                }
                isFavorito={favoritosIds.includes(receta.id)}
                onToggleFavorito={() => toggleFavorito(receta.id)}
              />
            ))
          ) : (
            <p>No se encontraron recetas.</p>
          )}
        </div>
      </div>
    </>
  );
}
