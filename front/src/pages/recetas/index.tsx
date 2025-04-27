import { useEffect, useState } from "react";
import RecetaCard from "../../components/cardreceta";
import Navigation from "../../containers/navigation";
import "./index.css";
import api from "../../services/axiosConfig";
import ModalFavoritos from "../../components/modal-favorito";
import ModalAlerta from "../../components/modal-alerta";

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
  receta?: {
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
  const [modalError, setModalError] = useState(false);
  const [mensajeError,setMensajeError] = useState("")

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
        const ids = data.map((fav) => fav.receta?.id).filter((id): id is number => id !== undefined);
        const formateados = data
          .filter((fav): fav is { receta: { id: number; title: string } } => fav.receta !== undefined)
          .map((fav) => ({
            id: fav.receta.id,
            nombreReceta: fav.receta.title,
          }));

        setFavoritos(ids);
        setFavoritosRecetasModal(formateados);
      } catch (error) {
      setMensajeError(`Error al cargar en favoritos ${error}`) 
      setModalError(true)
      } finally {
        setIsLoading(false);
      }
    };

    cargarFavoritos();
  }, []);

  const buscarRecetas = async () => {
    const intolerancia = localStorage.getItem("intoleranciaSeleccionada");
    if (!intolerancia || !busqueda) {
      setMensajeError("Por favor, escribe la receta que quieres buscar.");
      setModalError(true); 
      return;
    }

    try {
      const res = await api.get(`/api/recetas/buscar`, {
        params: { intolerancia, query: busqueda },
      });
     // console.log(res.data.results);
      setRecetas(res.data.results);
    } catch (error) {
      setMensajeError(`Error no se pudieron encontrar las recetas ${error}`) 
      setModalError(true);
    }
  };

  const guardarRecetaFavoritaDesdeSpoonacular = async (receta: Receta) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMensajeError("Debes iniciar sesión para guardar favoritos.");
      setModalError(true);
    }

    try {
      const payload = {
        title: receta.title,
        image: receta.image,
        readyInMinutes: receta.readyInMinutes,
        calories: receta.calories || 0,
        extendedIngredients: receta.extendedIngredients?.map((i) => ({
          name: i.original,
        })) || [],
        analyzedInstructions:
          receta.analyzedInstructions?.[0]?.steps.map((s) => ({
            step: s.step,
          })) || [],
      };

       await api.post("/api/favoritos-recetas/spoonacular", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    //  console.log("Receta guardada como favorita:", res.data);
    
      setFavoritos((prev) => [...prev, receta.id]);
      setFavoritosRecetasModal((prev) => [
        ...prev,
        { id: receta.id, nombreReceta: receta.title },
      ]);
    } catch (error) {
      setMensajeError(`Error al actualizar en favoritos ${error}`) 
      setModalError(true); 
    }
  };

  const toggleFavorito = async (id: number) => {
    const token = localStorage.getItem("jwtToken");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) {
      setMensajeError("Debes iniciar sesión para guardar favoritos.");
      setModalError(true);
      return
    }

    const receta = recetas.find((r) => r.id === id);
    if (!receta) return;

    const yaEsFavorito = favoritos.includes(id);

    try {
      if (yaEsFavorito) {
        await api.delete(`/api/favoritos-recetas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritos((prev) => prev.filter((fid) => fid !== id));
        setFavoritosRecetasModal((prev) =>
          prev.filter((fav) => fav.id !== id)
        );
      } else {
        await guardarRecetaFavoritaDesdeSpoonacular(receta);
      }
    } catch (error) {
      setMensajeError(`Error al actualizar en favoritos ${error}`) 
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
            id="receta"
            placeholder="¿Qué te apetece comer hoy?"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="buscar-btn" onClick={buscarRecetas}>
            🔍
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
      <ModalAlerta
      open={modalError}
      onClose={() => setModalError(false)}
      mensaje={mensajeError}
      />
    </>
  );
}
