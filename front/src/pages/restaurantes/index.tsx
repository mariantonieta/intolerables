import "./index.css";
import RestauranteCard from "../../components/cardrestaurant";
import Mapa from "../../components/map";
import api from "../../services/axiosConfig";
import { useEffect, useState } from "react";
import ModalAlerta from "../../components/modal-alerta";
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
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
  const [coordenadas, setCoordenadas] = useState<[number, number]>([
    40.4168, -3.7038,
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [usuarioUbicacion, setUsuarioUbicacion] = useState<string | null>(null); // Ubicación del usuario
  const {t}  = useTranslation()
  const mostrarAlerta = (mensaje: string) => {
    setMensajeModal(mensaje);
    setOpenModal(true);
  };

  useEffect(() => {
    const intoleranciaGuardada = localStorage.getItem(
      "intoleranciaSeleccionada"
    );
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

      
          const ciudadUsuario = response.data.ciudadUsuario;
          if (ciudadUsuario) {
            setUsuarioUbicacion(ciudadUsuario);
            setUbicacion(ciudadUsuario);
          }
        } catch (error) {
          console.error("Error al obtener la ubicación del usuario:", error);
        }
      }
    };

    obtenerUbicacionUsuario();
  }, []);


  useEffect(() => {
    if (usuarioUbicacion && !ubicacion) {
      setUbicacion(usuarioUbicacion); 
    }
  }, [usuarioUbicacion, ubicacion]);

  const obtenerCoordenadasPorDireccion = async (direccion: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        direccion
      )}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setCoordenadas([parseFloat(lat), parseFloat(lon)]);
    } else {
      mostrarAlerta(t("errorLocation"));
    }
  };

  const handleUbicacionActual = () => {
    if (!navigator.geolocation) {
      mostrarAlerta(t("errorGeo"));
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
          const ciudad =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";
          setUbicacion(ciudad);
        } catch (error) {
          console.error("Error al obtener la ciudad:", error);
          mostrarAlerta(t("errorLocation"));
        }
      },
      (error) => {
        console.error("Error de geolocalización:", error);
        mostrarAlerta(t("errorLocation"));
      }
    );
  };

  const buscarRestaurantes = async () => {
    if (!termino || !ubicacion) {
      mostrarAlerta(t("errorSearch"));
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
      mostrarAlerta(t("errorRestaurantes"));
    }
  };

  const toggleFavorito = async (restauranteId: number) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");

      if (!usuarioId) {
        mostrarAlerta(t("errorId"));
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
      <div className="page">
        <div className="container">
          <h1>{t("findRestaurant")}</h1>
          <div className="buscador-container">
            <input
              type="text"
              name="comida"
              id="comida"
              placeholder={t("searchRestaurant")}
              value={termino}
              onChange={(e) => setTermino(e.target.value)}
            />
            <input
              type="text"
              name="ubicacion"
              id="ubicacion"
              placeholder={t("location")}
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
            <div className="botones">
            <button
              className="ubi-btn"
              onClick={handleUbicacionActual}
              title="Usar ubicación actual"
              aria-label="Ubicación actual"
            >
              <FaMapMarkerAlt size={18} />
            </button>

            <button
              className="buscar-btn"
              onClick={buscarRestaurantes}
              aria-label="Buscar"
            >
              <FaSearch size={18} />
            </button>
            </div>
          </div>
          <div className="mapa-container">
            <div className="card-container">
              {isLoading ? (
                <p>{t("cargandoFavoritos")}</p>
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
