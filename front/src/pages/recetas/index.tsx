import { useEffect, useState } from "react";
import RecetaCard from "../../components/cardreceta";
import Navigation from "../../containers/navigation";
import "./index.css";
import api from "../../services/axiosConfig";
import ModalFavoritos from "../../components/modal-favorito";

interface Receta {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  calories?: number;
  analyzedInstructions?: { steps: { step: string }[] }[];
  extendedIngredients?: { original: string }[];
}

interface FavoritoReceta {
  receta: {
    id: number;
    title: string;
  };
}

export default function Recetas() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [modalFavoritosOpen, setModalFavoritosOpen] = useState(false);
  const [favoritosRecetasModal, setFavoritosRecetasModal] = useState<
    { id: number; nombreReceta: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const cargarFavoritos = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;
  
      setIsLoading(true);
      try {
        const res = await api.get("/api/favoritos-recetas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = res.data as FavoritoReceta[];
        const ids = data.map((fav) => fav.receta?.id).filter((id) => id !== undefined);
        const formateados = data
          .filter((fav) => fav.receta)
          .map((fav) => ({
            id: fav.receta.id,
            nombreReceta: fav.receta.title,
          }));
  
        setFavoritos(ids);
        setFavoritosRecetasModal(formateados);
      } catch (error) {
        console.error("Error al cargar favoritos de recetas", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    cargarFavoritos();
  }, []);
  
  const buscarRecetas = async () => {
    const intolerancia = localStorage.getItem("intoleranciaSeleccionada");
    if (!intolerancia || !busqueda) {
      alert("Por favor, escribe qué querés buscar.");
      return;
    }

    try {
      const res = await api.get(`/api/recetas/buscar`, {
        params: { intolerancia, query: busqueda },
      });

      setRecetas(res.data.results);
    } catch (err) {
      console.error("Error al buscar recetas:", err);
      alert("No se pudieron encontrar recetas.");
    }
  };

  const toggleFavorito = async (id: number) => {
    const token = localStorage.getItem("jwtToken");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) {
      alert("Debes iniciar sesión para guardar favoritos.");
      return;
    }

    const yaEsFavorito = favoritos.includes(id);

    try {
      if (yaEsFavorito) {
        await api.delete(`/api/favoritos-recetas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritos((prev) => prev.filter((fid) => fid !== id));
        setFavoritosRecetasModal((prev) => prev.filter((fav) => fav.id !== id));
      } else {
      
        const token = localStorage.getItem("jwtToken");

        await api.post(
          "/api/favoritos-recetas",
          { receta: { id } },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const receta = recetas.find((r) => r.id === id);
        if (receta) {
          setFavoritos((prev) => [...prev, id]);
          setFavoritosRecetasModal((prev) => [
            ...prev,
            { id: receta.id, nombreReceta: receta.title },
          ]);
        }
      }
    } catch (error) {
      console.error("Error actualizar favorito:", error);
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
            placeholder="¿Qué te apetece comer hoy?"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="buscar-btn" onClick={buscarRecetas}>
            🔍
          </button>
          <button
            onClick={() => setModalFavoritosOpen(true)}
            className="btn-ver-favoritos"
          >
            Ver Favoritos ❤️
          </button>
        </div>

        <div className="mapa-container">
          <div className="contenido">
            {isLoading ? (
              <p>Cargando favoritos...</p>
            ) : (
              recetas.map((receta) => (
                <RecetaCard
                  key={receta.id}
                  id={receta.id}
                  nombre={receta.title}
                  imagen={receta.image}
                  tiempo={receta.readyInMinutes}
                  calorias={receta.calories || 100}
                  rating={4}
                  ingredientes={
                    receta.extendedIngredients?.map((i) => i.original) || [
                      "No hay ingredientes disponibles",
                    ]
                  }
                  preparacion={
                    receta.analyzedInstructions?.[0]?.steps.map((s) => s.step) ||
                    ["Sin pasos disponibles"]
                  }
                  isFavorito={favoritos.includes(receta.id)}
                  onToggleFavorito={() => toggleFavorito(receta.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <ModalFavoritos
        open={modalFavoritosOpen}
        onClose={() => setModalFavoritosOpen(false)}
        favoritosRecetas={favoritosRecetasModal}
        favoritosRestaurantes={[]}
      />
    </>
  );
}
