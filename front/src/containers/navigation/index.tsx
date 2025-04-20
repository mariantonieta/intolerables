import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../../public/svg/logo.svg";
import "./index.css";
import { useEffect, useState } from "react";
import ModalRoL from "../../components/modalRoL";
import ModalFavoritos from "../../components/modal-favorito";
import api from "../../services/axiosConfig";

type NavigationProps = React.ComponentProps<"div">;

interface FavoritoRecetaDTO {
  id: number;
  nombreReceta: string;
  imagenReceta: string;
  fecha: string | null;
}

interface FavoritoRestauranteDTO {
  nombreRestaurante: string;
  fecha: string | null;
}

export default function Navigation(props: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [favoritosOpen, setFavoritosOpen] = useState(false); // Para el modal de favoritos
  const [favoritosRecetas, setFavoritosRecetas] = useState<FavoritoRecetaDTO[]>([]); // Favoritos de recetas
  const [favoritosRestaurantes, setFavoritosRestaurantes] = useState<FavoritoRestauranteDTO[]>([]); // Favoritos de restaurantes
  const navigate = useNavigate();

  const isLoggedIn = () => !!localStorage.getItem("jwtToken");

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

  // Función para manejar la apertura de favoritos
  const handleOpenFavoritos = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.log("Usuario no autenticado");
        return;
      }

      // Realizar las peticiones para obtener favoritos de recetas y favoritos de restaurantes en paralelo
      const [favoritosRecetasResponse, favoritosRestaurantesResponse] = await Promise.all([
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

      // Asignar los resultados a sus respectivos estados
      setFavoritosRecetas(favoritosRecetasResponse.data); // Guardar los favoritos de recetas
      setFavoritosRestaurantes(favoritosRestaurantesResponse.data); // Guardar los favoritos de restaurantes

      setFavoritosOpen(true); // Abrir el modal de favoritos
    } catch (error) {
      console.error("Error al cargar los favoritos", error);
    }
  };

  return (
    <nav {...props}>
      <img src={logo} alt="Logo" className="logo" />

      <div className={`menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        abrir
        <span></span><span></span><span></span><span></span>
      </div>

      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/intolerancias">INTOLERANCIAS</NavLink>
        {isLoggedIn() && (
          <>
            <NavLink to="/addReceta">AÑADIR RECETA</NavLink>
            <NavLink to="/recetasVip">RECETAS VIP</NavLink>
            <button onClick={handleOpenFavoritos} className="favorito-link">
              ❤️ Favoritos
            </button>
          </>
        )}
      </div>

      <div className="navbar-right">
        {!isLoggedIn() ? (
          <button onClick={() => setModalOpen(true)}>ÚNETE</button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("jwtToken");
              navigate("/");
            }}
          >
            CERRAR SESIÓN
          </button>
        )}
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
        favoritosRecetas={favoritosRecetas} // Pasar favoritos de recetas
        favoritosRestaurantes={favoritosRestaurantes} // Pasar favoritos de restaurantes
      />
    </nav>
  );
}
