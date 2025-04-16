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
    useEffect(() =>{
      if(menuOpen){
        document.body.classList.add("menu-open")
      }else{
        document.body.classList.remove("menu-open")
      }
    }, [menuOpen])
    const handleLoginClick = () => {
      setModalOpen(false);
      navigate("/login");
    };
    
    const handleRegisterClick = () => {
      setModalOpen(false);
      navigate("/register");
    };
    return (
        <nav {...props} >
      
           <img src={logo} alt="" className="logo" />
          <div className={`menu ${menuOpen ? "open" : "" }`}
          onClick={() => setMenuOpen(!menuOpen)}>abrir
            <span></span>
            <span></span>
            <span></span>
            <span></span>
         
          </div>
          
          <div className= {`navbar-menu ${menuOpen ? "open" : ""}`}>
         
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/intolerancias">INTOLERANCIAS</NavLink>
            <NavLink to="/restaurantes">RESTAURANTES</NavLink>
            <NavLink to="/recetas">RECETAS</NavLink>
           
            </div>
            <div className="navbar-right">
          
            <button onClick={() => setModalOpen(true)}>ÚNETE</button>
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
