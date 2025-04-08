import { NavLink } from "react-router-dom";
import logo from "../../../public/svg/logo.svg"
import './index.css'
import { useEffect, useState } from "react";
type NavigationProps = React.ComponentProps<"div">;

export default function Navigation(props: NavigationProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() =>{
      if(menuOpen){
        document.body.classList.add("menu-open")
      }else{
        document.body.classList.remove("menu-open")
      }
    }, [menuOpen])
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
           <button>UNETE</button>        
                </div>
        </nav>
    );
}
