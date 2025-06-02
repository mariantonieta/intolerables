import { useNavigate, NavLink } from "react-router-dom";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import ModalRoL from "../../components/modalRoL";
import ModalFavoritos from "../../components/modal-favorito";
import api from "../../services/axiosConfig";
import { FaUnlockAlt, FaSignOutAlt, FaHeart, FaGlobe } from "react-icons/fa";
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

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };const handleClickIntolerancia = async (e: React.MouseEvent) => {
  e.preventDefault();
  setMenuOpen(false);

  if (!isLoggedIn()) {
    navigate("/intolerancias");
    return;
  }

  const token = localStorage.getItem("jwtToken");
  const usuarioId = localStorage.getItem("usuarioId");

  if (!token || !usuarioId) {
    console.warn("Faltan token o usuarioId");
    return;
  }

  try {
    const response = await api.get(`/api/auth/usuario/${usuarioId}/perfil`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Respuesta del perfil:", response.data);

    const { nombre, intolerancias } = response.data;

    if (intolerancias && intolerancias.length > 0) {
      const intoleranciaSeleccionada = intolerancias[0]; 

      setNombreUsuario(nombre);
      setIntoleranciaGuardada(intoleranciaSeleccionada);
      setModalEleccionIntolerancia(true); 
    } else {
      console.log("No hay intolerancia, abrimos perfil.");
      setPerfilOpen(true);
    }
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    navigate("/intolerancias");
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
        open={modalEleccionIntolerancia}
        nombreUsuario={nombreUsuario}
        intolerancia={intoleranciaGuardada}
        onClose={() => setModalEleccionIntolerancia(false)}
        onCambiar={() => {
          setModalEleccionIntolerancia(false);
          setPerfilOpen(true);
        }}
        onSeguir={() => {
          setModalEleccionIntolerancia(false);
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
  
  navigate("/recetas");
  }}  />
    </nav>
  );
}
