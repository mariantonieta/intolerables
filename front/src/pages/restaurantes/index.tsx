import "./index.css";
import RestauranteCard from "../../components/cardrestaurant";
import Mapa from "../../components/map";
import Navigation from "../../containers/navigation";
import api from "../../services/axiosConfig";
import { useEffect, useState } from "react";
import ModalAlerta from "../../components/modal-alerta";
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

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
  const [coordenadas, setCoordenadas] = useState<[number, number]>([40.4168, -3.7038]);
  const [openModal, setOpenModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [usuarioUbicacion, setUsuarioUbicacion] = useState<string | null>(null); // Ubicación del usuario

  const mostrarAlerta = (mensaje: string) => {
    setMensajeModal(mensaje); 
    setOpenModal(true); 
  };
  
  useEffect(() => {
    const intoleranciaGuardada = localStorage.getItem("intoleranciaSeleccionada");
    if (intoleranciaGuardada) {
      setIntolerancia(intoleranciaGuardada);
    }
  }, []);

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
      } catch {
        //console.error("Error al cargar favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarFavoritos();
  }, []);

  useEffect(() => {
    const obtenerUbicacionUsuario = async () => {
      const token = localStorage.getItem("jwtToken");
      const usuarioId = localStorage.getItem("usuarioId"); 
        if (token && usuarioId) {
        try {
          // Llamamos al endpoint para obtener los datos del usuario
          const response = await api.get(`/api/auth/usuario/${usuarioId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Si la ciudad está disponible, la asignamos al estado de ubicación
          const ciudadUsuario = response.data.ciudadUsuario;
          if (ciudadUsuario) {
            setUsuarioUbicacion(ciudadUsuario);
            setUbicacion(ciudadUsuario); // Pre-poblar el campo de ubicación con la ciudad
          }
        } catch (error) {
          console.error("Error al obtener la ubicación del usuario:", error);
        }
      }
    };
  
    obtenerUbicacionUsuario();
  }, []);

  // Asegúrate de que la ubicación esté actualizada y no se vacíe por accidente
  useEffect(() => {
    if (usuarioUbicacion && !ubicacion) {
      setUbicacion(usuarioUbicacion); // Si ya tienes la ubicación del usuario, pre-poblarla.
    }
  }, [usuarioUbicacion, ubicacion]);

  const obtenerCoordenadasPorDireccion = async (direccion: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setCoordenadas([parseFloat(lat), parseFloat(lon)]);
    } else {
      mostrarAlerta("No se pudo encontrar la ubicación.");
    }
  };

  const handleUbicacionActual = () => {
    if (!navigator.geolocation) {
      mostrarAlerta("La geolocalización no es soportada por tu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordenadas([latitude, longitude]);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const ciudad = data.address.city || data.address.town || data.address.village || "";
          setUbicacion(ciudad);
        } catch (error) {
          console.error("Error al obtener la ciudad:", error);
          mostrarAlerta("No se pudo detectar la ubicación.");
        }
      },
      (error) => {
        console.error("Error de geolocalización:", error);
        mostrarAlerta("No se pudo acceder a tu ubicación.");
      }
    );
  };

  const buscarRestaurantes = async () => {
    if (!termino || !ubicacion) {
      mostrarAlerta("Por favor, introduce tanto la comida como la ubicación.");
      return;
    }

    try {
      await obtenerCoordenadasPorDireccion(ubicacion);

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
      mostrarAlerta("No se pudieron encontrar restaurantes.");
    }
  };

  const toggleFavorito = async (restauranteId: number) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");

      if (!usuarioId) {
        mostrarAlerta("No se encontró el ID del usuario.");
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
    } catch {
      // console.error("Error con los favoritos", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="page">
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
            <button
              className="ubi-btn"
              onClick={handleUbicacionActual}
              title="Usar ubicación actual"
              aria-label="Ubicación actual"
            >
              <FaMapMarkerAlt size={18} />
            </button>

            <button className="buscar-btn" onClick={buscarRestaurantes} aria-label="Buscar">
              <FaSearch size={18} />
            </button>
          </div>
          <div className="mapa-container">
            <div className="contenido">
              {isLoading ? (
                <p>Cargando favoritos...</p>
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
            <Mapa position={coordenadas} />
          </div>
        </div>
      </div>

      <ModalAlerta
        open={openModal}
        onClose={() => setOpenModal(false)}
        mensaje={mensajeModal}
      />
    </>
  );
}
