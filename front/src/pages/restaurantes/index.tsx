import "./index.css";
import RestauranteCard from "../../components/cardrestaurant";
import Mapa from "../../components/map";
import Navigation from "../../containers/navigation";
import api from "../../services/axiosConfig";
import { useEffect, useState } from "react";
//Tipado como se esperan recibir los datos del backend
interface FavoritoRestaurante {
  restaurante: {
    id: number;
  };
}

interface Restaurante {
  id: number;
  nombre: string;
  direccion: string;
  categoria: string;
  imagen: string;
  url: string | null;
}
export default function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [termino, setTermino] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [intolerancia, setIntolerancia] = useState("");
  const [favoritosIds, setFavoritosIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //se busca la intolerancia seleccionada del usuario para poder realizar la busqueda
  useEffect(() => {
    const intoleranciaGuardada = localStorage.getItem(
      "intoleranciaSeleccionada"
    );
    if (intoleranciaGuardada) {
      setIntolerancia(intoleranciaGuardada);
    }
  }, []);

  // Cargar los favoritos al iniciar
  useEffect(() => {
    const cargarFavoritos = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const usuarioId = localStorage.getItem("usuarioId");
        console.log(usuarioId);
      }
      try {
        const response = await api.get("/api/favoritos-restaurantes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ids = (response.data as FavoritoRestaurante[]).map(
          (fav) => fav.restaurante?.id
        );
        setFavoritosIds(ids);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarFavoritos();
  }, []);
  //busqueda de restaurantes
  const buscarRestaurantes = async () => {
    if (!termino || !ubicacion) {
      alert("Por favor, introduce tanto la comida como la ubicación");
      return;
    }
    try {
      const response = await api.get("/api/restaurantes/buscar", {
        params: {
          intolerancia: intolerancia,
          ubicacion: ubicacion,
          comida: termino,
        },
      });
      setRestaurantes(response.data);
    } catch (error) {
      console.error("Error al buscar restaurantes:", error);
      alert("No se pudieron encontrar restaurantes");
    }
  };
  //agrega el restaurante de los favoritos
  const toggleFavorito = async (restauranteId: number) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");

      if (!usuarioId) {
        alert("No se encontró el ID del usuario.");
        return;
      }

      const yaEsFavorito = favoritosIds.includes(restauranteId);

      if (yaEsFavorito) {
        await api.delete(`/api/favoritos-restaurantes/${restauranteId}`);
        setFavoritosIds((prev) => prev.filter((id) => id !== restauranteId));
      } else {
        const favorito = {
          usuario: {
            id: parseInt(usuarioId),
          },
          restaurante: {
            id: restauranteId,
          },
        };
        //se agrega el favorito al modal de favoritos
        await api.post("/api/favoritos-restaurantes", favorito);
        setFavoritosIds((prev) => [...prev, restauranteId]);
      }
    } catch (error) {
      console.error("Error con los favoritos", error);
      alert("Hubo un problema con los favoritos.");
    }
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Encuentra tu safe place en Restaurante</h1>
        <div className="buscador-container">
          <input
            type="text"
            name="comida"
            id="comida"
            placeholder="¿Qué te apetece comer hoy?"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
          />
          <input
            type="text"
            name="ubicacion"
            id="ubicacion"
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
          <button className="buscar-btn" onClick={buscarRestaurantes}>
            🔍
          </button>
        </div>
        <div className="mapa-container">
          <div className="contenido">
            {isLoading ? (
              <p>Cargando favoritos...</p>
            ) : (
              restaurantes.map((restaurante) => (
                <RestauranteCard
                  key={
                    restaurante.id ?? `${restaurante.nombre}-${Math.random()}`
                  }
                  id={restaurante.id}
                  nombre={restaurante.nombre}
                  direccion={restaurante.direccion}
                  categoria={restaurante.categoria}
                  url={restaurante.url}
                  imagen={restaurante.imagen}
                  isFavorito={favoritosIds.includes(restaurante.id)}
                  onToggleFavorito={() => toggleFavorito(restaurante.id)}
                />
              ))
            )}
          </div>
          <Mapa />
        </div>
      </div>
    </>
  );
}
