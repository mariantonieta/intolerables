import RestauranteCard from "../../components/cardrestaurant";
import Mapa from "../../components/map";
import Navigation from "../../containers/navigation";
import "./index.css";
import api from "../../services/axiosConfig";
import axios from "axios";
import { useEffect, useState } from "react";
interface RestaurantesProps {
  onOpenFavoritos: () => void;
}
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
export default function Restaurantes({ onOpenFavoritos }: RestaurantesProps) {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [termino, setTermino] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [intolerancia, setIntolerancia] = useState("");
  const [favoritosIds, setFavoritosIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga

  useEffect(() => {
    const intoleranciaGuardada = localStorage.getItem("intoleranciaSeleccionada");
    if (intoleranciaGuardada) {
      setIntolerancia(intoleranciaGuardada);
    }
  }, []);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const cargarFavoritos = async () => {
      setIsLoading(true); // Iniciar carga de favoritos
      const token = localStorage.getItem("jwtToken");
      if (token) {
        // Ya no decodificamos el token, solo necesitamos el id del usuario desde localStorage
        const usuarioId = localStorage.getItem("usuarioId");
        console.log(usuarioId);  // Verifica si contiene el id del usuario
      }
      try {
        const response = await axios.get("http://localhost:9000/api/favoritos-restaurantes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ids = (response.data as FavoritoRestaurante[]).map((fav) => fav.restaurante?.id);
        setFavoritosIds(ids);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      } finally {
        setIsLoading(false); // Finalizar carga
      }
    };

    cargarFavoritos();
  }, []);

  const buscarRestaurantes = async () => {
    if (!termino || !ubicacion) {
      alert("Por favor, introduce tanto la comida como la ubicación");
      return;
    }
    try {
      const response = await axios.get("http://localhost:9000/api/restaurantes/buscar", {
        params: {
          intolerancia: intolerancia,
          ubicacion: ubicacion,
          comida: termino,
        },
      });
      setRestaurantes(response.data); // Actualiza el estado con los restaurantes encontrados
    } catch (error) {
      console.error("Error al buscar restaurantes:", error);
      alert("No se pudieron encontrar restaurantes. Inténtalo de nuevo.");
    }
  };

  const toggleFavorito = async (restauranteId: number) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      alert("Debes iniciar sesión para guardar favoritos.");
      return;
    }

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

        await api.post("/api/favoritos-restaurantes", favorito);
        setFavoritosIds((prev) => [...prev, restauranteId]);
      }

      // Llamar a la función onOpenFavoritos cuando se agregue o elimine un favorito
      onOpenFavoritos();

    } catch (error) {
      console.error("Error al alternar favorito:", error);
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
              <p>Cargando favoritos...</p> // Mensaje de carga mientras se traen los favoritos
            ) : (
              restaurantes.map((restaurante) => (
                <RestauranteCard
                  key={restaurante.id ?? `${restaurante.nombre}-${Math.random()}`}
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
