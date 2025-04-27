import { useEffect, useState } from "react";
import RecetaCard from "../../components/cardreceta";
import Navigation from "../../containers/navigation";
import api from "../../services/axiosConfig";
import ModalAlerta from "../../components/modal-alerta";
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
    ingrediente: { nombre: string } | null;
  }[];
}

export default function RecetasComunidad() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [favoritosIds, setFavoritosIds] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  // Función para cargar recetas
  useEffect(() => {
    const obtenerRecetas = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/api/recetas");
        setRecetas(res.data as Receta[]);
      } catch (err) {
        setMensajeError(`Error al cargar recetas: ${err}`);
        setModalError(true); 
      } finally {
        setIsLoading(false);
      }
    };

    obtenerRecetas();
  }, []);

  const recetasFiltradas = recetas.filter((receta) =>
    receta.titulo.toLowerCase().includes(busqueda.toLowerCase())  );

  const toggleFavorito = async (id: number) => {
    const token = localStorage.getItem("jwtToken");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) {
      setMensajeError("Debes iniciar sesión para usar favoritos.");
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
      setMensajeError(`Error al actualizar favorito: ${error}`);
      setModalError(true); 
    }
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Encuentra tu safe place en Recetas de la Comunidad</h1>
        <div className="buscador-container">
          <input
            type="text"
            placeholder="Buscar receta de la comunidad..."
            id="receta"
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
                          i.ingrediente
                            ? `${i.cantidad} ${i.unidad} ${i.ingrediente.nombre}`
                            : "Ingrediente desconocido"
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

      <ModalAlerta
        open={modalError}
        onClose={() => setModalError(false)}
        mensaje={mensajeError}
      />
    </>
  );
}
