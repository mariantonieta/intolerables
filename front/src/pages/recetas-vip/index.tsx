import { useEffect, useState } from "react";
import RecetaCard from "../../components/cardreceta";
import api from "../../services/axiosConfig";
import ModalAlerta from "../../components/modal-alerta";
import "../recetas/index.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
interface Receta {
  id: number;
  title: string;
  image: string;
  readyInMiuntes: number;
  calories?: number;
  summary: string;
  pasosPreparacion?: { descripcion: string }[];
  recetaIngredientes?: {
    cantidad: number;
    nombre: string;
  }[];
}

export default function RecetasComunidad() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [favoritosIds, setFavoritosIds] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const {t} = useTranslation()

  // Función para cargar recetas
  useEffect(() => {
    const obtenerRecetas = async () => {
     const idiomaDestino = i18next.language;  
      setIsLoading(true);
      try {
        const token = localStorage.getItem("jwtToken"); // Obtén el token
        const res = await api.get("/api/recetas/todas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },  
           params: {
          idiomaDestino, // Enviar el idioma al backend
        },
        });
        console.log("Recetas obtenidas:", res.data);
        setRecetas(res.data as Receta[]);
      } catch (err) {
        setMensajeError(`Error al cargar recetas: ${err}`);
        setModalError(true);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerRecetas();
  }, [t]);

  const recetasFiltradas =
    busqueda.trim() === ""
      ? recetas
      : recetas.filter((receta) =>
          receta.title?.toLowerCase()?.includes(busqueda.toLowerCase())
        );
  console.log(recetasFiltradas);

  const toggleFavorito = async (id: number) => {
    const token = localStorage.getItem("jwtToken");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) {
      setMensajeError(t("errorNoAutenticado"));
      setModalError(true);
      return;
    }

    const receta = recetas.find((r) => r.id === id);
    if (!receta) return;

    const yaEsFavorito = favoritosIds.includes(id);

    try {
      if (yaEsFavorito) {
        await api.delete(`/api/favoritos-recetas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritosIds((prev) => prev.filter((fid) => fid !== id));
      } else {
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
      setMensajeError(`${t("errorActualizarFavoritos")} ${error}`);
      setModalError(true);
    }
  };

  return (
    <>
    <div className="page">
      <div className="container">
        <h1>{t("titleCommunity")}</h1>
        <div className="buscador-container">
          <input
            type="text"
            placeholder={t("placeholderBusqueda")}
            id="receta"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="card-container">
          {isLoading ? (
            <p>{t("cargandoRecetas")}</p>
          ) : recetasFiltradas.length > 0 ? (
            recetasFiltradas.map((receta) => (
              <RecetaCard
                key={receta.id}
                id={receta.id}
                nombre={receta.title}
                imagen={receta.image}
                tiempo={receta.readyInMiuntes}
                calorias={receta.calories || 100}
                rating={5} 
                ingredientes={
                  receta.recetaIngredientes &&
                  receta.recetaIngredientes.length > 0
                    ? receta.recetaIngredientes.map((i) => ({
                        cantidad: `${i.cantidad}`.trim(),
                        nombre: i.nombre ?? t("ingredienteDesconocido"),
                      }))
                    : [{ cantidad: "0", nombre: t("sinIngredientes")  }]
                }
                preparacion={
                  receta.pasosPreparacion?.length
                    ? receta.pasosPreparacion.map((p) => ({
                        numeroPaso: 1, 
                        descripcion: p.descripcion,
                      }))
                    : [{ numeroPaso: 1, descripcion:  t("sinPasosDisponibles")  }]
                }
                isFavorito={favoritosIds.includes(receta.id)}
                onToggleFavorito={() => toggleFavorito(receta.id)}
              />
            ))
          ) : (
            <p>{t("noEncontradas")}</p>
          )}
        </div>
      </div>

      <ModalAlerta
        open={modalError}
        onClose={() => setModalError(false)}
        mensaje={mensajeError}
      />
    </div>
    </>
  );
}
