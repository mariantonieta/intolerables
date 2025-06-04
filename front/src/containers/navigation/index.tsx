import { useNavigate, NavLink } from "react-router-dom";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import ModalRoL from "../../components/modalRoL";
import ModalFavoritos from "../../components/modal-favorito";
import api from "../../services/axiosConfig";
import { FaUnlockAlt, FaSignOutAlt, FaHeart, FaGlobe} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ModalPerfil from "../../components/modal-perfil/ModalPerfil";
import { ModalEleccionIntolerancia } from "../../components/modal-usuario";
import ModalElegirRoR from "../../components/modalrecetaorestaurante";
type NavigationProps = React.ComponentProps<"div">;

interface FavoritoRecetaDTO {
  id: number;
  nombreReceta: string;
  fecha: string | null;
}

interface FavoritoRestauranteDTO {
  id: number;
  nombreRestaurante: string;
  fecha: string | null;
}

export default function Navigation(props: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [favoritosOpen, setFavoritosOpen] = useState(false);
  const [favoritosRecetas, setFavoritosRecetas] = useState<FavoritoRecetaDTO[]>([]);
  const [favoritosRestaurantes, setFavoritosRestaurantes] = useState<FavoritoRestauranteDTO[]>([]);
  const [modalEleccionIntolerancia, setModalEleccionIntolerancia] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [intoleranciaGuardada, setIntoleranciaGuardada] = useState("");
  const [navRightTop, setNavRightTop] = useState(0);
  const navCenterRef = useRef<HTMLDivElement>(null);
  const navbarMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
   const [modalElegirRoROpen, setModalElegirRoROpen] = useState(false);
  const { i18n, t } = useTranslation();

  const isLoggedIn = () => !!localStorage.getItem("jwtToken");
  const [perfilOpen, setPerfilOpen] = useState(false);

  useEffect(() => {
    if (menuOpen && navbarMenuRef.current) {
      const menuHeight = navbarMenuRef.current.offsetHeight;
      setNavRightTop(menuHeight + 85);
    }
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  const handleLoginClick = () => {
    setModalOpen(false);
    navigate("/login");
  };

  const handleRegisterClick = () => {
    setModalOpen(false);
    navigate("/register");
  };

  const handleOpenFavoritos = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.log("Usuario no autenticado");
        return;
      }

      const [favoritosRecetasResponse, favoritosRestaurantesResponse] = await Promise.all([
        api.get("/api/favoritos-recetas", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/api/favoritos-restaurantes", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setFavoritosRecetas(favoritosRecetasResponse.data);
      setFavoritosRestaurantes(favoritosRestaurantesResponse.data);
      setFavoritosOpen(true);
    } catch (error) {
      console.error("Error al cargar los favoritos", error);
    }
  };
  const handleEliminarFavoritoRestaurante = async (id: number) => {
  console.log("ID recibido para eliminar:", id); // Verifica que el ID es válido
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    await api.delete(`/api/favoritos-restaurantes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setFavoritosRestaurantes((prev) => prev.filter((r) => r.id !== id));
  } catch (error) {
    console.error("Error eliminando restaurante favorito:", error);
  }
};



  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  }
  const obtenerPerfilUsuario = async () => {
    const token = localStorage.getItem("jwtToken");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) return;

    try {
      const response = await api.get(`/api/auth/usuario/${usuarioId}/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { nombre, intolerancias } = response.data;
      setNombreUsuario(nombre);
if (intolerancias?.length > 0) {
  const ultimaIntolerancia = intolerancias[intolerancias.length - 1];
  localStorage.setItem("intoleranciaNombre", ultimaIntolerancia.nombre);
  setIntoleranciaGuardada(ultimaIntolerancia.nombre);
}


    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      navigate("/intolerancias");
    }
  };

  useEffect(() => {
    if (modalEleccionIntolerancia) {
      obtenerPerfilUsuario();
    }
  }, [modalEleccionIntolerancia]);

  const handleClickIntolerancia = async (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);

    if (!isLoggedIn()) {
      navigate("/intolerancias");
      return;
    }

    await obtenerPerfilUsuario();
     const intolerancia = localStorage.getItem("intoleranciaNombre");
  if (intolerancia) setIntoleranciaGuardada(intolerancia); // <- NUEVO
  setModalEleccionIntolerancia(true);
  };
const handleEliminarFavoritoReceta = async (id: number) => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    await api.delete(`/api/favoritos-recetas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setFavoritosRecetas((prev) => prev.filter((r) => r.id !== id));
  } catch (error) {
    console.error("Error eliminando receta favorita:", error);
  }
};

  return (
    <nav {...props}>
      <div className="nav-container">
        <div className="nav-left">
          <img src="/svg/logo.svg" alt="Logo" className="logo" />
        </div>

        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-center ${menuOpen ? "open" : ""}`} ref={navCenterRef}>
          <div className="navbar-menu" ref={navbarMenuRef}>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              {t("home")}
            </NavLink>
            <NavLink to="#" onClick={handleClickIntolerancia}>
              {t("intolerances")}
            </NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              {t("about")}
            </NavLink>

            {isLoggedIn() && (
              <>
                <NavLink to="/addReceta" onClick={() => setMenuOpen(false)}>
                  {t("add_recipe")}
                </NavLink>
                <NavLink to="/recetasVip" onClick={() => setMenuOpen(false)}>
                  {t("vip_recipes")}
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="nav-right" style={{ top: `${navRightTop + 10}px` }}>
          {isLoggedIn() && (
            <button
              onClick={() => {
                handleOpenFavoritos();
                setMenuOpen(false);
             
              }}
              type="button"
              className="favorito-link"
              aria-label="Favoritos"
            >
              <FaHeart size={20} />
            </button>
          )}

          {!isLoggedIn() ? (
            <button
              onClick={() => {
                setModalOpen(true);
                setMenuOpen(false);
              }}
              aria-label="Abrir login"
              type="button"
            >
              <FaUnlockAlt />
            </button>
          ) : (
            <button
              onClick={() => {
                setPerfilOpen(true);
              }}
              aria-label="Cerrar sesión"
              type="button"
            >
              <FaSignOutAlt />
            </button>
          )}

          <button
            onClick={() => {
              const newLanguage =
                i18n.language === "es"
                  ? "en"
                  : i18n.language === "en"
                  ? "it"
                  : "es";
              changeLanguage(newLanguage);
            }}
            aria-label="Cambiar idioma"
            type="button"
          >
            <FaGlobe size={20} />
          </button>
        </div>
      </div>

      <ModalRoL
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />

      <ModalFavoritos
        open={favoritosOpen}
        onClose={() => setFavoritosOpen(false)}
        favoritosRecetas={favoritosRecetas}
        favoritosRestaurantes={favoritosRestaurantes}
          onEliminarFavoritoReceta={handleEliminarFavoritoReceta}
           onEliminarFavoritoRestaurante={handleEliminarFavoritoRestaurante}

      />

      <ModalPerfil
        open={perfilOpen}
        onClose={() => setPerfilOpen(false)}
        onLogout={() => {
          localStorage.removeItem("jwtToken");
          setPerfilOpen(false);
          navigate("/");
        }}
      />

 <ModalEleccionIntolerancia
  nombreUsuario={nombreUsuario}
  intolerancia={intoleranciaGuardada}
  onClose={() => setModalEleccionIntolerancia(false)}
  onCambiar={async () => {
    setModalEleccionIntolerancia(false);
    await obtenerPerfilUsuario(); 
    navigate("/intolerancias");
  }}
  open={modalEleccionIntolerancia}
  onSeguir={async () => {
    setModalEleccionIntolerancia(false);
    await obtenerPerfilUsuario(); 
    setModalElegirRoROpen(true);
  }}
/>
      <ModalElegirRoR
        open={modalElegirRoROpen}
        onClose={() => setModalElegirRoROpen(false)}
   onRecetasClick={() => {
  setModalElegirRoROpen(false);
  navigate("/recetas");
}}
        onRestaurantesClick={() => {
          setModalElegirRoROpen(false);
  
  navigate("/restaurantes");
  }}  />
    </nav>
  );
}
