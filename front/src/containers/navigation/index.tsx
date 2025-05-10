import { useNavigate, NavLink } from "react-router-dom";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import ModalRoL from "../../components/modalRoL";
import ModalFavoritos from "../../components/modal-favorito";
import api from "../../services/axiosConfig";
import { FaUnlockAlt, FaSignOutAlt, FaHeart } from "react-icons/fa";

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
  const [favoritosRecetas, setFavoritosRecetas] = useState<FavoritoRecetaDTO[]>(
    []
  );
  const [favoritosRestaurantes, setFavoritosRestaurantes] = useState<
    FavoritoRestauranteDTO[]
  >([]);

  const [navRightTop, setNavRightTop] = useState(0);
  const navCenterRef = useRef<HTMLDivElement>(null);
  const navbarMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isLoggedIn = () => !!localStorage.getItem("jwtToken");

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

      const [favoritosRecetasResponse, favoritosRestaurantesResponse] =
        await Promise.all([
          api.get("/api/favoritos-recetas", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          api.get("/api/favoritos-restaurantes", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      setFavoritosRecetas(favoritosRecetasResponse.data);
      setFavoritosRestaurantes(favoritosRestaurantesResponse.data);
      setFavoritosOpen(true);
    } catch (error) {
      console.error("Error al cargar los favoritos", error);
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

        <div
          className={`nav-center ${menuOpen ? "open" : ""}`}
          ref={navCenterRef}
        >
          <div className="navbar-menu" ref={navbarMenuRef}>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              HOME
            </NavLink>
            <NavLink to="/intolerancias" onClick={() => setMenuOpen(false)}>
              INTOLERANCIAS
            </NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              SOBRE MI
            </NavLink>

            {isLoggedIn() && (
              <>
                <NavLink to="/addReceta" onClick={() => setMenuOpen(false)}>
                  AÑADIR RECETA
                </NavLink>
                <NavLink to="/recetasVip" onClick={() => setMenuOpen(false)}>
                  RECETAS VIP
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
                localStorage.removeItem("jwtToken");
                setMenuOpen(false);
                navigate("/");
              }}
              aria-label="Cerrar sesión"
              type="button"
            >
              <FaSignOutAlt />
            </button>
          )}
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
    </nav>
  );
}
