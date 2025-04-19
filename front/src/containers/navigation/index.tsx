import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../../public/svg/logo.svg"
import './index.css'
import { useEffect, useState } from "react";
import ModalRoL from "../../components/modalRoL";
type NavigationProps = React.ComponentProps<"div">;

export default function Navigation(props: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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

  return (
    <nav {...props}>
      <img src={logo} alt="Logo" className="logo" />

      <div className={`menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        abrir
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        {isLoggedIn() ? (
          <>
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/intolerancias">INTOLERANCIAS</NavLink>
            <NavLink to="/addReceta">AÑADIR RECETA</NavLink>
            <NavLink to="/favoritos" className="favorito-link">❤️ Favoritos</NavLink>
          </>
        ) : (
          <>
             <NavLink to="/">HOME</NavLink>
            <NavLink to="/intolerancias">INTOLERANCIAS</NavLink>
          
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
    </nav>
  );
}
