import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../../public/svg/logo.svg";
import "./index.css";
import { useEffect, useState } from "react";
import ModalRoL from "../../components/modalRoL";
import ModalFavoritos from "../../components/modal-favorito";
import api from "../../services/axiosConfig";

type NavigationProps = React.ComponentProps<"div">;

interface FavoritoRestauranteDTO {
  nombreRestaurante: string;
  fecha: string | null;
}
export default function Navigation(props: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [favoritosOpen, setFavoritosOpen] = useState(false); // Para el modal de favoritos
  const [favoritos, setFavoritos] = useState<FavoritoRestauranteDTO[]>([]); // Ahora se almacenan los objetos completos
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
  
      // Solicitar favoritos desde la API
      const response = await api.get("/api/favoritos-restaurantes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Aquí asegúrate de que la respuesta sea un arreglo de favoritos
      const favoritosCompletos = response.data; // Si la estructura es diferente, ajusta el mapeo

      setFavoritos(favoritosCompletos); // Guardar los restaurantes completos en el estado
      setFavoritosOpen(true); // Abrir el modal de favoritos
    } catch (error) {
      console.error("Error al cargar favoritos", error);
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
        favoritos={favoritos}
      />
    </nav>
  );
}
